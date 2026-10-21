import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../data/projects.data';

@Component({
  selector: 'app-project-entry',
  imports: [RouterLink],
  template: `
    <a class="entry" [routerLink]="['/proyectos', project().slug]">
      <div class="media">
        <img [src]="project().media" [alt]="project().mediaAlt" loading="lazy" decoding="async" />
      </div>
      <div class="info">
        <div>
          <h2>{{ project().title }}</h2>
          <p class="summary">{{ project().summary }}</p>
        </div>
        <dl>
          <div><dt>Estado</dt><dd><span class="pf-status" [attr.data-s]="project().status">{{ project().status }}</span></dd></div>
          <div><dt>Tipo</dt><dd>{{ project().kind }}</dd></div>
          <div><dt>Año</dt><dd>{{ project().year }}</dd></div>
          <div><dt>Stack</dt><dd>{{ project().stack.join(', ') }}</dd></div>
        </dl>
      </div>
    </a>
  `,
  styles: `
    :host { display: block; }
    .entry { display: block; color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
    .media { aspect-ratio: 16 / 10; border-radius: 24px; overflow: hidden; background: var(--raised); }
    img { width: 100%; height: 100%; object-fit: cover; object-position: top left; transition: transform 0.6s var(--ease-out); }
    .info { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 24px 48px; margin-top: 24px; }
    h2 { margin: 0; font: 600 clamp(1.5rem, 2.4vw, 2rem)/1.15 var(--font-display); letter-spacing: -0.015em; transition: color 0.2s; text-wrap: balance; }
    .summary { margin: 10px 0 0; color: var(--ink-dim); font-size: 1.0625rem; line-height: 1.6; max-width: 52ch; text-wrap: pretty; }
    dl { margin: 4px 0 0; display: grid; gap: 14px; }
    dt { font-size: 13px; font-weight: 600; color: var(--ink-dim); }
    dd { margin: 2px 0 0; font-size: 1rem; line-height: 1.45; }
    .entry:active .media { transform: scale(0.995); }
    @media (hover: hover) and (pointer: fine) {
      .entry:hover img { transform: scale(1.025); }
      .entry:hover h2 { color: var(--signal); }
    }
    @media (max-width: 760px) { .info { grid-template-columns: 1fr; } dl { grid-template-columns: 1fr 1fr; } }
  `,
})
export class ProjectEntry {
  readonly project = input.required<Project>();
}
