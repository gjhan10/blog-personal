import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatDate } from '../../core/format';
import { Note } from '../../data/notes.data';

@Component({
  selector: 'app-note-list',
  imports: [RouterLink],
  template: `
    <ul class="list">
      @for (n of notes(); track n.slug) {
        <li>
          <a [routerLink]="['/notas', n.slug]">
            <span class="title">{{ n.title }}</span>
            <span class="meta">{{ n.category }}<time [attr.datetime]="n.date">{{ date(n.date) }}</time></span>
          </a>
        </li>
      } @empty {
        <li class="empty">Aún no hay notas en esta categoría.</li>
      }
    </ul>
  `,
  styles: `
    .list { list-style: none; margin: 0; padding: 0; display: grid; }
    a { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 40px; align-items: baseline; padding: 28px 0; text-decoration: none; }
    .title { font: 400 clamp(1.4rem, 2.8vw, 2.2rem)/1.15 var(--font-display); letter-spacing: -0.025em; text-wrap: balance; transition: color 0.2s; }
    .meta { display: flex; flex-direction: column; align-items: flex-end; font-size: 14px; color: var(--ink-dim); white-space: nowrap; }
    time { color: var(--ink-dim); }
    .empty { color: var(--ink-dim); padding: 28px 0; }
    @media (hover: hover) and (pointer: fine) { a:hover .title { color: var(--signal); } }
    @media (max-width: 640px) { a { grid-template-columns: 1fr; } .meta { flex-direction: row; gap: 12px; align-items: baseline; } }
  `,
})
export class NoteList {
  readonly notes = input.required<Note[]>();
  protected date = (iso: string) => formatDate(iso);
}
