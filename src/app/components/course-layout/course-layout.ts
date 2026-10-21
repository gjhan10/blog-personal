import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flow, FlowStep } from '../../shared/flow/flow';
import { Icon } from '../../shared/icon/icon';
import { CourseBase } from '../course-base';

@Component({
  selector: 'app-course-layout',
  imports: [RouterLink, Flow, Icon],
  templateUrl: './course-layout.html',
  styleUrl: './course-layout.scss',
})
export class CourseLayout {
  readonly c = input.required<CourseBase>();

  protected readonly moduleSteps = computed<FlowStep[]>(() => {
    const c = this.c();
    return c.modules.map((m, mi) => {
      const lessons = m.lessons.filter((l) => !c.isEvalTitle(l)).length;
      const hasEval = m.lessons.some((l) => c.isEvalTitle(l));
      return {
        name: m.title,
        body: m.desc,
        meta: `${lessons} ${lessons === 1 ? 'lección' : 'lecciones'}${hasEval ? ' y evaluación' : ''}`,
        href: c.route,
        query: { m: mi, l: 0 },
        badge: m.badge,
      };
    });
  });

  protected progressPct(): number {
    const c = this.c();
    return Math.round((c.position / c.totalLessons) * 100);
  }
}
