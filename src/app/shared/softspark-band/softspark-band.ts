import { Component } from '@angular/core';
import { SITE } from '../../core/site.config';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-softspark-band',
  imports: [Icon],
  template: `
    @if (url) {
      <aside class="band" aria-labelledby="h-softspark">
        <img src="assets/softspark-mark.webp" alt="Logotipo de SoftSpark" width="96" height="96" loading="lazy" decoding="async" />
        <div class="copy">
          <p class="kicker">Mi empresa</p>
          <h2 id="h-softspark">SoftSpark</h2>
          <p class="text">Desarrollo de software para negocios: páginas web, aplicaciones, sistemas de gestión, ERP, CRM y automatización. Tiene su propio sitio con servicios, planes, un asistente para elegir la solución y una demo interactiva.</p>
        </div>
        <a class="pf-btn pf-btn--solid go" [href]="url" target="_blank" rel="noopener">
          Visitar SoftSpark <app-icon name="arrow-up-right" />
          <span class="pf-sr">(se abre en una pestaña nueva)</span>
        </a>
      </aside>
    }
  `,
  styles: `
    :host { display: block; }
    .band {
      display: grid; grid-template-columns: 1fr; gap: clamp(20px, 3vw, 40px); align-items: center;
      padding: clamp(24px, 4vw, 48px); border-radius: var(--r-media); background: var(--raised);
    }
    img { width: clamp(72px, 9vw, 96px); height: auto; aspect-ratio: 1; border-radius: 22px; }
    .copy { display: grid; gap: 8px; max-width: 64ch; }
    .kicker { margin: 0; font: 600 13px/1 var(--font-body); letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-dim); }
    h2 { margin: 0; font: 600 clamp(1.6rem, 3vw, 2.2rem)/1.1 var(--font-display); letter-spacing: -0.02em; }
    .text { margin: 0; color: var(--ink-dim); text-wrap: pretty; }
    .go { justify-self: start; }
    @media (min-width: 600px) {
      .band { grid-template-columns: auto 1fr; }
      .go { grid-column: 1 / -1; }
    }
    @media (min-width: 900px) {
      .band { grid-template-columns: auto 1fr auto; }
      .go { grid-column: auto; }
    }
  `,
})
export class SoftsparkBand {
  protected readonly url = SITE.softsparkUrl;
}
