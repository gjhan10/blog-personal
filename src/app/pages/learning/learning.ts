import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo.service';
import { COURSES, COURSE_TOTALS } from '../../data/courses.data';
import { PROJECTS } from '../../data/projects.data';
import { Flow, FlowStep } from '../../shared/flow/flow';

@Component({
  selector: 'app-learning',
  imports: [RouterLink, Flow],
  template: `
    <div class="pf-container pf-page">
      <div class="pf-split">
        <aside class="pf-side" aria-label="Resumen del aprendizaje">
          <h1 class="pf-side-title">Aprendizaje</h1>
          <dl class="pf-facts">
            <div><dt>Rutas</dt><dd>{{ totals.courses }}</dd></div>
            <div><dt>Módulos</dt><dd>{{ totals.modules }}</dd></div>
            <div><dt>Lecciones</dt><dd>{{ totals.lessons }}</dd></div>
            <div><dt>Cada módulo incluye</dt><dd>Lecciones con ejemplos de código y una evaluación</dd></div>
          </dl>
          <div class="actions"><a class="pf-btn pf-btn--solid" routerLink="/java-backend">Abrir los apuntes</a></div>
        </aside>

        <div>
          <p class="pf-statement">Java, Spring y arquitectura: lo que estudio, dónde lo aplico y lo que viene.</p>
          <p class="pf-lead intro">No hay certificaciones ni porcentajes de dominio: solo material publicado y proyectos con su estado real.</p>

          <section class="pf-section" aria-labelledby="h-ruta">
            <h2 id="h-ruta" class="pf-h">Ruta de estudio</h2>
            <p class="pf-lead">Ordenadas del lenguaje al framework y de ahí a la arquitectura.</p>
            <app-flow [steps]="route" label="Ruta de estudio, en orden" />
          </section>

          <section class="pf-section" aria-labelledby="h-aplicado">
            <h2 id="h-aplicado" class="pf-h">Aplicado</h2>
            <p class="pf-lead">Proyectos donde uso lo estudiado.</p>
            <app-flow [steps]="applied" [connected]="false" label="Proyectos relacionados" />
          </section>

          <section class="pf-section" aria-labelledby="h-sig">
            <h2 id="h-sig" class="pf-h">En desarrollo</h2>
            <p class="pf-lead">Habilidades que quiero demostrar con código y no solo con teoría. Aún no están completadas.</p>
            <app-flow [steps]="next" [connected]="false" label="Siguientes pasos" />
          </section>
        </div>
      </div>
    </div>
  `,
  styles: `
    .actions { margin-top: 32px; }
    .intro { margin-top: 20px; }
  `,
})
export class Learning {
  protected readonly totals = COURSE_TOTALS;

  protected readonly route: FlowStep[] = COURSES.map((c) => ({
    name: c.title,
    body: c.desc,
    meta: `${c.modules} módulos, ${c.lessons} lecciones. ${c.level}`,
    href: c.route,
  }));

  protected readonly applied: FlowStep[] = PROJECTS.map((p) => ({
    name: p.title,
    body: p.summary,
    href: `/proyectos/${p.slug}`,
    status: p.status,
  }));

  protected readonly next: FlowStep[] = [
    { name: 'Proyecto práctico de microservicios', body: 'Aplicar gateway, autenticación y comunicación entre servicios en un caso concreto.' },
    { name: 'Docker y Docker Compose', body: 'Levantar el backend y la base de datos de forma reproducible.' },
    { name: 'Pruebas automatizadas del backend', body: 'Pruebas unitarias y de integración sobre los servicios.' },
    { name: 'Integración Angular y API propia', body: 'Conectar el frontend con un backend real en lugar de datos de ejemplo.' },
  ];

  constructor() {
    inject(Seo).set({
      title: 'Aprendizaje',
      description: 'Ruta de aprendizaje de Jhan Gutierrez en Java, Spring Boot, WebFlux, patrones de diseño y microservicios: lo estudiado, los proyectos y lo que sigue.',
      path: 'aprendizaje',
    });
  }
}
