import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button type="button" class="toggle" role="switch" aria-label="Modo oscuro" [attr.aria-checked]="dark()" (click)="onClick($event)">
      <span class="track" aria-hidden="true">
        <svg class="stars" viewBox="0 0 40 28" fill="currentColor">
          <circle cx="8" cy="8" r="1.6" />
          <circle cx="17" cy="19" r="1.1" />
          <circle cx="24" cy="7" r="1.3" />
          <circle cx="12" cy="14" r="0.9" />
        </svg>
        <span class="thumb">
          <span class="puck"></span>
          <svg class="glyph" viewBox="0 0 24 24" fill="none">
            <mask id="theme-moon-cut">
              <rect width="24" height="24" fill="#fff" />
              <circle class="cut" cx="17" cy="7" r="7.5" fill="#000" />
            </mask>
            <circle class="core" cx="12" cy="12" r="9" mask="url(#theme-moon-cut)" fill="currentColor" />
            <g class="rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
            </g>
          </svg>
        </span>
      </span>
    </button>
  `,
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);
  protected readonly dark = computed(() => this.themeService.theme() === 'dark');

  protected onClick(event: MouseEvent): void {
    this.themeService.toggle(event.currentTarget as HTMLElement);
  }
}
