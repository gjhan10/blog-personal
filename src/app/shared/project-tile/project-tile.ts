import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../data/projects.data';

@Component({
  selector: 'app-project-tile',
  imports: [RouterLink],
  template: `
    <a class="tile" [routerLink]="['/proyectos', project().slug]">
      <div class="media" [class.diagram]="project().media.endsWith('.svg')" [style.aspect-ratio]="ratio()">
        <img [src]="project().media" [alt]="project().mediaAlt" loading="lazy" decoding="async" />
      </div>
      <div class="cap">
        <h3>{{ project().title }}</h3>
        <span class="pf-status" [attr.data-s]="project().status">{{ project().status }}</span>
      </div>
      <p>{{ project().summary }}</p>
    </a>
  `,
  styles: `
    :host { display: block; }
    .tile { display: block; text-decoration: none; transition: transform 0.3s var(--ease-out); -webkit-tap-highlight-color: transparent; }
    .tile:active { transform: scale(0.985); }
    @media (hover: hover) and (pointer: fine) {
      .tile:hover { transform: translateY(-4px); }
      .tile:hover:active { transform: scale(0.985); }
      .tile:hover h3 { color: var(--signal); }
    }
    .media { overflow: hidden; border-radius: var(--r-media); background: var(--raised); }
    img { width: 100%; height: 100%; object-fit: cover; object-position: top left; }
    .cap { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-top: 20px; }
    h3 { margin: 0; font: 600 clamp(1.3rem, 2vw, 1.65rem)/1.15 var(--font-display); letter-spacing: -0.02em; transition: color 0.2s; text-wrap: balance; }
    .pf-status { flex: none; }
    p { margin: 10px 0 0; color: var(--ink-dim); max-width: 52ch; text-wrap: pretty; }
  `,
})
export class ProjectTile {
  readonly project = input.required<Project>();
  readonly ratio = input('16 / 10');
}
