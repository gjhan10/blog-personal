import { afterNextRender, ChangeDetectorRef, DestroyRef, Directive, HostListener, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { loadProgress, saveProgress } from '../core/course-progress';
import { Seo } from '../core/seo.service';

export interface CourseModule {
  badge: string;
  title: string;
  desc: string;
  cert: string;
  offset: number;
  lessons: string[];
}

@Directive({ host: { ngSkipHydration: 'true' } })
export abstract class CourseBase implements OnInit {
  abstract readonly courseId: string;
  abstract readonly route: string;
  abstract readonly title: string;
  abstract readonly intro: string;
  abstract readonly completeText: string;
  abstract modules: CourseModule[];

  view: 'home' | 'lesson' = 'home';
  activeModule = 0;
  activeLessonInModule = 0;
  expandedModule = 0;
  menuOpen = false;
  visited = new Set<string>();
  last: { m: number; l: number } | null = null;

  readonly boundAnswer = (el: EventTarget | null, qId: string, correct: boolean) => this.answer(el, qId, correct);

  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly seo = inject(Seo);
  private readonly destroyRef = inject(DestroyRef);
  private browser = false;

  constructor() {
    afterNextRender(() => {
      this.browser = true;
      const saved = loadProgress(this.courseId);
      this.visited = new Set(saved.visited);
      this.last = saved.last ?? null;
      this.track();
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => this.applyParams(params));
  }

  isEvalTitle(lesson: string): boolean {
    return /Evaluaci[oó]n/.test(lesson);
  }

  labelFor(_mi: number, lesson: string): string {
    return lesson;
  }

  get isCurrentEval(): boolean {
    return this.isEvalTitle(this.modules[this.activeModule]?.lessons[this.activeLessonInModule] ?? '');
  }

  get globalLesson(): number {
    if (this.isCurrentEval) return -1;
    return this.modules[this.activeModule].offset + this.activeLessonInModule;
  }

  get totalLessons(): number {
    return this.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  }

  get lessonCount(): number {
    return this.modules.reduce((sum, m) => sum + m.lessons.filter((l) => !this.isEvalTitle(l)).length, 0);
  }

  get evalCount(): number {
    return this.modules.reduce((sum, m) => sum + m.lessons.filter((l) => this.isEvalTitle(l)).length, 0);
  }

  get position(): number {
    return this.modules.slice(0, this.activeModule).reduce((sum, m) => sum + m.lessons.length, 0) + this.activeLessonInModule + 1;
  }

  get currentTitle(): string {
    return this.modules[this.activeModule]?.lessons[this.activeLessonInModule] ?? '';
  }

  get isFirstLesson(): boolean {
    return this.activeModule === 0 && this.activeLessonInModule === 0;
  }

  get isLastLesson(): boolean {
    return this.activeModule === this.modules.length - 1 && this.activeLessonInModule === this.modules[this.activeModule].lessons.length - 1;
  }

  get prevTarget(): { m: number; l: number } | null {
    if (this.activeLessonInModule > 0) return { m: this.activeModule, l: this.activeLessonInModule - 1 };
    if (this.activeModule > 0) return { m: this.activeModule - 1, l: this.modules[this.activeModule - 1].lessons.length - 1 };
    return null;
  }

  get nextTarget(): { m: number; l: number } | null {
    if (this.activeLessonInModule < this.modules[this.activeModule].lessons.length - 1) return { m: this.activeModule, l: this.activeLessonInModule + 1 };
    if (this.activeModule < this.modules.length - 1) return { m: this.activeModule + 1, l: 0 };
    return null;
  }

  titleAt(target: { m: number; l: number } | null): string {
    return target ? this.modules[target.m].lessons[target.l] : '';
  }

  isDone(mi: number, li: number): boolean {
    return this.visited.has(`${mi}-${li}`) && !(mi === this.activeModule && li === this.activeLessonInModule && this.view === 'lesson');
  }

  visitedIn(mi: number): number {
    return this.modules[mi].lessons.filter((_, li) => this.visited.has(`${mi}-${li}`)).length;
  }

  get visitedCount(): number {
    return this.visited.size;
  }

  goHome(): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} });
  }

  goBack(): void {
    this.router.navigate(['/java-backend'], { fragment: 'cursos' });
  }

  startModule(mi: number): void {
    this.goToLesson(mi, 0);
  }

  resume(): void {
    const t = this.last ?? { m: 0, l: 0 };
    this.goToLesson(t.m, t.l);
  }

  goToLesson(mi: number, li: number): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { m: mi, l: li } });
  }

  toggleModule(mi: number): void {
    this.expandedModule = this.expandedModule === mi ? -1 : mi;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  prevLesson(): void {
    const t = this.prevTarget;
    if (t) this.goToLesson(t.m, t.l);
  }

  nextLesson(): void {
    const t = this.nextTarget;
    if (t) this.goToLesson(t.m, t.l);
  }

  protected onLessonChange(): void {
    return;
  }

  private applyParams(params: ParamMap): void {
    const m = Number(params.get('m'));
    const l = Number(params.get('l'));
    const valid =
      params.has('m') && params.has('l') && Number.isInteger(m) && Number.isInteger(l) && m >= 0 && m < this.modules.length && l >= 0 && l < this.modules[m].lessons.length;
    this.menuOpen = false;
    if (valid) {
      this.activeModule = m;
      this.activeLessonInModule = l;
      this.expandedModule = m;
      this.view = 'lesson';
      this.track();
      this.onLessonChange();
    } else {
      this.view = 'home';
      if (params.has('m') || params.has('l')) {
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {}, replaceUrl: true });
      }
    }
    this.seo.set({
      title: this.view === 'lesson' ? `${this.currentTitle} · ${this.title}` : this.title,
      description: this.intro,
      path: this.route.replace(/^\//, ''),
      type: this.view === 'lesson' ? 'article' : 'website',
    });
    this.cdr.markForCheck();
  }

  private track(): void {
    if (!this.browser || this.view !== 'lesson') return;
    this.visited.add(`${this.activeModule}-${this.activeLessonInModule}`);
    this.last = { m: this.activeModule, l: this.activeLessonInModule };
    saveProgress(this.courseId, { visited: [...this.visited], last: this.last });
  }

  answer(el: EventTarget | null, qId: string, correct: boolean): void {
    const container = document.getElementById(qId);
    if (!container || container.dataset['answered']) return;
    container.dataset['answered'] = '1';
    container.classList.add('answered');
    container.querySelectorAll<HTMLElement>('.quiz-opt').forEach((o) => {
      o.style.pointerEvents = 'none';
      o.setAttribute('aria-disabled', 'true');
    });
    const clicked = el as HTMLElement | null;
    clicked?.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) container.querySelectorAll<HTMLElement>('.quiz-opt[data-correct="true"]').forEach((o) => o.classList.add('correct', 'revealed'));
    const fb = document.getElementById(qId + (correct ? '-ok' : '-fail'));
    if (fb) {
      fb.classList.add('show');
      fb.style.display = 'block';
    }
  }

  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.classList.contains('quiz-opt') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      target.click();
    }
    if (event.key === 'Escape' && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
