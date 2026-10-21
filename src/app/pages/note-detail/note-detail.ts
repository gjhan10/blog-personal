import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { formatDate } from '../../core/format';
import { Seo } from '../../core/seo.service';
import { findNote, NOTES, readingMinutes } from '../../data/notes.data';
import { Icon } from '../../shared/icon/icon';
import { RichText } from '../../shared/rich-text/rich-text';
import { NotFound } from '../not-found/not-found';

export function anchor(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

@Component({
  selector: 'app-note-detail',
  imports: [RouterLink, NotFound, RichText, Icon],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.scss',
})
export class NoteDetail {
  private readonly seo = inject(Seo);
  private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug') ?? '')), { initialValue: '' });

  protected readonly anchor = anchor;
  protected readonly note = computed(() => findNote(this.slug()));
  protected readonly minutes = computed(() => {
    const n = this.note();
    return n ? readingMinutes(n) : 0;
  });
  protected readonly date = computed(() => formatDate(this.note()?.date ?? '', 'long'));
  protected readonly toc = computed(() =>
    (this.note()?.body ?? []).flatMap((b) => (b.type === 'h2' ? [{ id: anchor(b.text), text: b.text }] : [])),
  );
  protected readonly neighbours = computed(() => {
    const i = NOTES.findIndex((n) => n.slug === this.slug());
    return { newer: NOTES[i - 1], older: NOTES[i + 1] };
  });

  constructor() {
    effect(() => {
      const n = this.note();
      if (n) this.seo.set({ title: n.title, description: n.summary, path: `notas/${n.slug}`, type: 'article' });
    });
  }
}
