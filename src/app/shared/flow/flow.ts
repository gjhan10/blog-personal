import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

export interface FlowStep {
  name: string;
  body: string;
  meta?: string;
  href?: string;
  query?: Record<string, string | number>;
  badge?: string;
  core?: boolean;
  via?: string;
  status?: string;
}

@Component({
  selector: 'app-flow',
  imports: [NgTemplateOutlet, RouterLink, Icon],
  template: `
    <ng-template #inner let-s>
      <div class="top">
        <h3>
          @if (s.badge) {
            <span class="badge">{{ s.badge }}</span>
          }
          {{ s.name }}
        </h3>
        @if (s.status) {
          <span class="pf-status" [attr.data-s]="s.status">{{ s.status }}</span>
        }
      </div>
      <p class="body">{{ s.body }}</p>
      @if (s.meta) {
        <p class="meta">{{ s.meta }}</p>
      }
    </ng-template>

    <ol class="flow" [class.go]="go()" [class.loose]="!connected()" [attr.aria-label]="label()">
      @for (s of steps(); track s.name; let i = $index; let last = $last) {
        <li>
          @if (s.href) {
            <a class="step linked" [class.core]="s.core" [routerLink]="s.href" [queryParams]="s.query ?? null">
              <ng-container *ngTemplateOutlet="inner; context: { $implicit: s }" />
              <app-icon class="arrow" name="arrow-right" />
            </a>
          } @else {
            <div class="step" [class.core]="s.core">
              <ng-container *ngTemplateOutlet="inner; context: { $implicit: s }" />
            </div>
          }
          @if (!last && connected()) {
            <div class="link" aria-hidden="true" [style.--i]="i">
              <span class="rail"><i class="dot"></i></span>
              @if (s.via) {
                <span class="via">{{ s.via }}</span>
              }
            </div>
          }
        </li>
      }
    </ol>
  `,
  styleUrl: './flow.scss',
})
export class Flow {
  readonly steps = input.required<FlowStep[]>();
  readonly label = input.required<string>();
  readonly connected = input(true);
  protected readonly go = signal(false);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.go.set(true);
            io.disconnect();
          }
        },
        { rootMargin: '0px 0px -30% 0px', threshold: 0 },
      );
      io.observe(host);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
