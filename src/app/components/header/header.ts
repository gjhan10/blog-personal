import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';
import { ThemeToggle } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly site = SITE;
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/aprendizaje', label: 'Aprendizaje' },
    { path: '/notas', label: 'Notas' },
    { path: '/sobre-mi', label: 'Sobre mí' },
    { path: '/contacto', label: 'Contacto' },
  ];

  constructor() {
    inject(Router).events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));

    effect(() => {
      if (typeof document !== 'undefined') document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  protected toggle(): void {
    this.menuOpen.update((v) => !v);
  }

  @HostListener('document:keydown.escape')
  protected close(): void {
    this.menuOpen.set(false);
  }
}
