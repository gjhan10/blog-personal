import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo.service';
import { COURSES, COURSE_TOTALS } from '../../data/courses.data';
import { Flow, FlowStep } from '../../shared/flow/flow';

@Component({
  selector: 'app-java-backend',
  imports: [RouterLink, Flow],
  template: `
    <div class="pf-container pf-page">
      <div class="pf-split">
        <aside class="pf-side" aria-label="Resumen de los apuntes">
          <h1 class="pf-side-title">Apuntes interactivos</h1>
          <dl class="pf-facts">
            <div><dt>Rutas</dt><dd>{{ totals.courses }}</dd></div>
            <div><dt>Módulos</dt><dd>{{ totals.modules }}</dd></div>
            <div><dt>Lecciones</dt><dd>{{ totals.lessons }}</dd></div>
            <div><dt>Código ejecutable</dt><dd>En la ruta de Java: salida real de OpenJDK 21 y compilación en línea si modificas el código</dd></div>
          </dl>
          <div class="actions"><a class="pf-btn pf-btn--quiet" routerLink="/proyectos/apuntes-java-backend">Cómo está hecho</a></div>
        </aside>

        <div>
          <p class="pf-statement">Material de estudio de Java backend: del lenguaje a la arquitectura distribuida, con código y evaluaciones.</p>

          <section class="pf-section" aria-labelledby="h-uso">
            <h2 id="h-uso" class="pf-h">Cómo usarlos</h2>
            <p class="pf-lead">Cada módulo sigue el mismo recorrido.</p>
            <app-flow [steps]="howTo" label="Pasos para estudiar un módulo" />
          </section>

          <section class="pf-section" id="cursos" aria-labelledby="h-rutas">
            <h2 id="h-rutas" class="pf-h">Rutas</h2>
            <p class="pf-lead">Ordenadas del lenguaje al framework y de ahí a la arquitectura.</p>
            <app-flow [steps]="routes" label="Rutas de estudio, en orden" />
          </section>
        </div>
      </div>
    </div>
  `,
  styles: `.actions { margin-top: 32px; }`,
})
export class JavaBackend {
  protected readonly totals = COURSE_TOTALS;

  protected readonly howTo: FlowStep[] = [
    { name: 'Elige una ruta', body: 'Si estás comenzando, empieza por Java.' },
    { name: 'Lee las lecciones', body: 'Cada lección trae ejemplos de código. En la ruta de Java puedes editarlos y ejecutarlos con el botón «Ejecutar».' },
    { name: 'Haz la evaluación', body: 'Al final de cada módulo hay preguntas para comprobar lo aprendido.' },
  ];

  protected readonly routes: FlowStep[] = COURSES.map((c) => ({
    name: c.title,
    body: c.desc,
    meta: `${c.modules} módulos, ${c.lessons} lecciones. ${c.level}`,
    href: c.route,
  }));

  constructor() {
    inject(Seo).set({
      title: 'Apuntes interactivos',
      description: 'Apuntes interactivos de Java, Spring Boot, WebFlux, patrones de diseño y microservicios, con código ejecutable y evaluaciones por módulo.',
      path: 'java-backend',
    });
  }
}
