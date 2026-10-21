import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#101113' };

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.read());

  private read(): Theme {
    return this.doc.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  toggle(origin?: HTMLElement): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    const root = this.doc.documentElement;
    const win = this.doc.defaultView;
    const reduce = !!win?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = (this.doc as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } }).startViewTransition;

    if (!origin || !win || reduce || !start) {
      this.apply(next);
      return;
    }

    const rect = origin.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, win.innerWidth - x), Math.max(y, win.innerHeight - y));

    root.classList.add('theme-switching');
    const transition = start.call(this.doc, () => this.apply(next));
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }

  private apply(theme: Theme): void {
    const root = this.doc.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    this.theme.set(theme);
    this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
    try {
      this.doc.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      return;
    }
  }
}
