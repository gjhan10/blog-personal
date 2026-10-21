import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="pf-container pf-page nf">
      <h1 class="pf-display">Esta página no existe</h1>
      <p class="pf-lead">El enlace puede estar roto o la página se movió. Vuelve al inicio o revisa los proyectos.</p>
      <div class="actions">
        <a class="pf-btn pf-btn--solid" routerLink="/">Ir al inicio</a>
        <a class="pf-btn pf-btn--quiet" routerLink="/proyectos">Ver proyectos</a>
      </div>
    </section>
  `,
  styles: `
    .nf { min-height: 70vh; }
    h1 { font-size: clamp(2.4rem, 7vw, 5rem); max-width: 14ch; margin-bottom: 28px; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
  `,
})
export class NotFound {
  constructor() {
    inject(Seo).set({ title: 'Página no encontrada', description: 'La página que buscas no existe.' });
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
  }
}
