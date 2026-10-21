import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Seo } from '../../core/seo.service';
import { findProject } from '../../data/projects.data';
import { Icon } from '../../shared/icon/icon';
import { NotFound } from '../not-found/not-found';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, NotFound, Icon],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly seo = inject(Seo);
  private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug') ?? '')), { initialValue: '' });

  protected readonly project = computed(() => findProject(this.slug()));
  protected readonly gateway = computed(() => this.project()?.services?.find((s) => s.name === 'api-gateway'));
  protected readonly services = computed(() => this.project()?.services?.filter((s) => s.name !== 'api-gateway') ?? []);

  constructor() {
    effect(() => {
      const p = this.project();
      if (p) this.seo.set({ title: p.title, description: p.summary, path: `proyectos/${p.slug}` });
    });
  }

  protected isExternal(href: string): boolean {
    return href.startsWith('http');
  }
}
