import { AfterViewInit, Component, DOCUMENT, ElementRef, inject, input, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { COURSE_TOTALS } from '../../../data/courses.data';

export interface FeaturedProject {
  title: string;
  description: string;
  liveDemoUrl?: string;
  repoUrl?: string;
}

@Component({
  selector: 'app-curso-java',
  imports: [NgIf, RouterModule],
  templateUrl: './curso-java.component.html',
  styleUrl: './curso-java.component.scss',
})
export class CursoJavaComponent implements AfterViewInit, OnDestroy {
  readonly projectInput = input.required<FeaturedProject>({ alias: 'project' });
  readonly indexInput = input(0, { alias: 'index' });

  protected readonly totals = COURSE_TOTALS;

  @ViewChild('bitsBg', { static: false }) bitsBgRef!: ElementRef<HTMLElement>;
  @ViewChild('cupBits', { static: false }) cupBitsRef!: ElementRef<HTMLElement>;
  @ViewChild('cardOutput', { static: false }) cardOutputRef!: ElementRef<HTMLElement>;

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private externalStyleEl?: HTMLStyleElement;
  private intervals: number[] = [];

  protected get project(): FeaturedProject {
    return this.projectInput();
  }

  protected get index(): number {
    return this.indexInput();
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.spawnBits();
    this.startCupBitsRotation();
  }

  ngOnDestroy(): void {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
    this.removeExternalBits();
  }

  private startCupBitsRotation(): void {
    const bitStrings = ['01101010', '10010101', '11001010', '00110101', '10101100', '01010011'];
    let bi = 0;
    const id = window.setInterval(() => {
      const el = this.cupBitsRef?.nativeElement;
      if (el) {
        bi = (bi + 1) % bitStrings.length;
        this.renderer.setProperty(el, 'textContent', bitStrings[bi]);
      }
    }, 1200);
    this.intervals.push(id);
  }

  private spawnBits(): void {
    const chars = ['0', '1', '0', '1', '01', '10', '001', '110', '101', '0101', '1010'];
    const colors = ['rgba(130,170,255,0.54)', 'rgba(40,120,255,0.51)', 'rgba(5,180,120,0.51)', 'rgba(195,232,141,0.53)', 'rgba(100,160,255,0.48)'];
    const container = this.bitsBgRef?.nativeElement;
    if (!container) return;
    this.renderer.setProperty(container, 'innerHTML', '');
    const containerClass = `curso-java-bits-${this.index}`;
    this.renderer.addClass(container, containerClass);
    const styleEl: HTMLStyleElement = this.renderer.createElement('style');
    const keyframesName = `floatBit-${this.index}`;
    const css = `
      .${containerClass} .bit { position:absolute; will-change: transform, opacity; }
      @keyframes ${keyframesName} {
        0%   { opacity: 0;    transform: translateY(0) rotate(0deg); }
        10%  { opacity: 0.75; }
        90%  { opacity: 0.45; }
        100% { opacity: 0;    transform: translateY(-600px) rotate(20deg); }
      }
    `;
    this.renderer.appendChild(styleEl, this.renderer.createText(css));
    this.renderer.appendChild(this.document.head, styleEl);
    for (let i = 0; i < 80; i++) {
      const bitEl = this.renderer.createElement('div');
      this.renderer.addClass(bitEl, 'bit');
      this.renderer.setProperty(bitEl, 'textContent', chars[Math.floor(Math.random() * chars.length)]);
      this.renderer.setStyle(bitEl, 'left', Math.random() * 100 + '%');
      this.renderer.setStyle(bitEl, 'top', Math.random() * 100 + '%');
      this.renderer.setStyle(bitEl, 'animation', `${keyframesName} ${12 + Math.random() * 20}s linear infinite`);
      this.renderer.setStyle(bitEl, 'animationDelay', Math.random() * 10 + 's');
      this.renderer.setStyle(bitEl, 'fontSize', 9 + Math.random() * 8 + 'px');
      this.renderer.setStyle(bitEl, 'fontWeight', '600');
      this.renderer.setStyle(bitEl, 'color', colors[Math.floor(Math.random() * colors.length)]);
      this.renderer.appendChild(container, bitEl);
    }
    this.externalStyleEl = styleEl;
  }

  private removeExternalBits(): void {
    if (this.externalStyleEl) {
      this.renderer.removeChild(this.document.head, this.externalStyleEl);
      this.externalStyleEl = undefined;
    }
  }

  protected onOutputClick(): void {
    const container = this.cardOutputRef.nativeElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.flash(container);
    if (reduce) return;
    const rect = container.getBoundingClientRect();
    const parent = (container.offsetParent as HTMLElement | null) ?? container.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const bits = ['0', '1', '01', '10', '001', '11', '0101', '1'];
    const colors = ['rgba(130,170,255,0.95)', 'rgba(40,120,255,0.9)', 'rgba(5,180,120,0.95)', 'rgba(195,232,141,0.9)', 'rgba(100,160,255,0.85)'];
    const originX = rect.left - parentRect.left + rect.width / 2;
    const originY = rect.top - parentRect.top + rect.height / 2;
    for (let i = 0; i < 22; i++) {
      const bit = this.renderer.createElement('div');
      this.renderer.setStyle(bit, 'position', 'absolute');
      this.renderer.setStyle(bit, 'left', originX + 'px');
      this.renderer.setStyle(bit, 'top', originY + 'px');
      this.renderer.setStyle(bit, 'fontFamily', "'IBM Plex Mono', monospace");
      this.renderer.setStyle(bit, 'fontSize', 9 + Math.random() * 9 + 'px');
      this.renderer.setStyle(bit, 'fontWeight', '700');
      this.renderer.setStyle(bit, 'color', colors[Math.floor(Math.random() * colors.length)]);
      this.renderer.setStyle(bit, 'pointerEvents', 'none');
      this.renderer.setStyle(bit, 'zIndex', '999');
      this.renderer.setStyle(bit, 'userSelect', 'none');
      this.renderer.setProperty(bit, 'textContent', bits[Math.floor(Math.random() * bits.length)]);
      const angle = Math.random() * 2 * Math.PI;
      const distance = 60 + Math.random() * 100;
      const duration = 500 + Math.random() * 400;
      this.renderer.setStyle(bit, 'transition', `transform ${duration}ms cubic-bezier(.2,.8,.4,1), opacity ${duration}ms ease`);
      this.renderer.setStyle(bit, 'transform', 'translate(0,0) rotate(0deg) scale(1)');
      this.renderer.setStyle(bit, 'opacity', '1');
      this.renderer.appendChild(parent, bit);
      void bit.offsetWidth;
      this.renderer.setStyle(bit, 'transform', `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${(Math.random() - 0.5) * 720}deg) scale(0.3)`);
      this.renderer.setStyle(bit, 'opacity', '0');
      setTimeout(() => this.renderer.removeChild(parent, bit), duration + 50);
    }
  }

  private flash(container: HTMLElement): void {
    this.renderer.setStyle(container, 'transition', 'background 0.1s ease');
    this.renderer.setStyle(container, 'background', 'rgba(0,212,160,0.18)');
    setTimeout(() => {
      this.renderer.setStyle(container, 'background', '');
      setTimeout(() => this.renderer.removeStyle(container, 'transition'), 300);
    }, 150);
  }
}
