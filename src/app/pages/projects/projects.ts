import { Component, computed, inject, signal } from '@angular/core';
import { Seo } from '../../core/seo.service';
import { PROJECTS, ProjectKind, ProjectStatus } from '../../data/projects.data';
import { ProjectEntry } from '../../shared/project-entry/project-entry';

type Filter = 'Todos' | ProjectKind;

@Component({
  selector: 'app-projects',
  imports: [ProjectEntry],
  template: `
    <div class="pf-container pf-page">
      <div class="pf-split">
        <aside class="pf-side" aria-label="Resumen y filtros">
          <h1 class="pf-side-title">Proyectos</h1>
          <dl class="pf-facts">
            <div><dt>Publicados</dt><dd>{{ byStatus('Publicado') }}</dd></div>
            <div><dt>Planificados</dt><dd>{{ byStatus('Planificado') }}</dd></div>
          </dl>
          <ul class="pf-filter" role="group" aria-label="Filtrar por tipo">
            @for (f of filters; track f) {
              <li>
                <button type="button" [attr.aria-pressed]="active() === f" (click)="active.set(f)">
                  {{ f }} <span>{{ byKind(f) }}</span>
                </button>
              </li>
            }
          </ul>
        </aside>

        <div>
          <p class="pf-statement">Lo que construyo, con su estado real: qué funciona hoy y qué falta.</p>
          <div class="entries" aria-live="polite">
            @for (p of visible(); track p.slug) {
              <app-project-entry [project]="p" />
            } @empty {
              <p class="empty">No hay proyectos de este tipo todavía.</p>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .entries { display: grid; gap: clamp(64px, 8vw, 104px); margin-top: clamp(40px, 5vw, 64px); }
    .empty { color: var(--ink-dim); }
  `,
})
export class Projects {
  protected readonly filters: Filter[] = ['Todos', 'Personal', 'Educativo', 'Experimental'];
  protected readonly active = signal<Filter>('Todos');
  protected readonly visible = computed(() => PROJECTS.filter((p) => this.active() === 'Todos' || p.kind === this.active()));

  constructor() {
    inject(Seo).set({
      title: 'Proyectos',
      description: 'Proyectos de Jhan Gutierrez: apuntes interactivos de Java backend, este portfolio en Angular y una plataforma de microservicios en planificación.',
      path: 'proyectos',
    });
  }

  protected byStatus(status: ProjectStatus): number {
    return PROJECTS.filter((p) => p.status === status).length;
  }

  protected byKind(kind: Filter): number {
    return kind === 'Todos' ? PROJECTS.length : PROJECTS.filter((p) => p.kind === kind).length;
  }
}
