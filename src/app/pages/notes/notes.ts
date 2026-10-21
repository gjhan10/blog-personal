import { Component, computed, inject, signal } from '@angular/core';
import { formatDate } from '../../core/format';
import { Seo } from '../../core/seo.service';
import { NOTES } from '../../data/notes.data';
import { NoteList } from '../../shared/note-list/note-list';

@Component({
  selector: 'app-notes',
  imports: [NoteList],
  template: `
    <div class="pf-container pf-page">
      <div class="pf-split">
        <aside class="pf-side" aria-label="Resumen y filtros">
          <h1 class="pf-side-title">Notas técnicas</h1>
          <dl class="pf-facts">
            <div><dt>Publicadas</dt><dd>{{ total }}</dd></div>
            <div><dt>Última</dt><dd>{{ latest }}</dd></div>
          </dl>
          <ul class="pf-filter" role="group" aria-label="Filtrar por categoría">
            @for (c of categories; track c) {
              <li>
                <button type="button" [attr.aria-pressed]="active() === c" (click)="active.set(c)">
                  {{ c }} <span>{{ count(c) }}</span>
                </button>
              </li>
            }
          </ul>
        </aside>

        <div>
          <p class="pf-statement">Apuntes cortos sobre Java, Spring, Angular y despliegue, escritos mientras aprendo.</p>
          <div class="list" aria-live="polite"><app-note-list [notes]="visible()" /></div>
        </div>
      </div>
    </div>
  `,
  styles: `.list { margin-top: clamp(32px, 4vw, 48px); }`,
})
export class Notes {
  protected readonly total = NOTES.length;
  protected readonly latest = NOTES.length ? formatDate(NOTES[0].date, 'long') : '—';
  protected readonly categories = ['Todas', ...new Set(NOTES.map((n) => n.category))];
  protected readonly active = signal('Todas');
  protected readonly visible = computed(() => NOTES.filter((n) => this.active() === 'Todas' || n.category === this.active()));

  constructor() {
    inject(Seo).set({
      title: 'Notas técnicas',
      description: 'Notas técnicas de Jhan Gutierrez sobre Java, Spring Boot, WebFlux, Angular y despliegue en GitHub Pages.',
      path: 'notas',
    });
  }

  protected count(category: string): number {
    return category === 'Todas' ? NOTES.length : NOTES.filter((n) => n.category === category).length;
  }
}
