import { Component, ViewEncapsulation } from '@angular/core';
import { WfModuleM1Component } from './modules/intro/intro';
import { WfModuleM2Component } from './modules/flux-mono/flux-mono';
import { WfModuleM3Component } from './modules/router-fn/router-fn';
import { WfModuleM4Component } from './modules/r2dbc/r2dbc';
import { WfModuleM5Component } from './modules/security/security';
import { WfModuleM6Component } from './modules/webclient/webclient';
import { WfModuleM7Component } from './modules/testing/testing';
import { WfModuleM8Component } from './modules/deploy/deploy';
import { CourseBase, CourseModule } from '../course-base';
import { CourseLayout } from '../course-layout/course-layout';

@Component({
  selector: 'app-webflux',
  imports: [CourseLayout, WfModuleM1Component, WfModuleM2Component, WfModuleM3Component, WfModuleM4Component, WfModuleM5Component, WfModuleM6Component, WfModuleM7Component, WfModuleM8Component],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./webflux.scss'],
  templateUrl: './webflux.html',
})
export class WebFlux extends CourseBase {
  readonly courseId = 'webflux';
  readonly route = '/webflux';
  readonly title = 'Spring WebFlux: programación reactiva';
  readonly intro = 'Programación reactiva con Project Reactor y Spring WebFlux: Mono y Flux, controladores, R2DBC, seguridad, WebClient y testing.';
  readonly completeText = 'Recorriste la programación reactiva con Project Reactor y Spring WebFlux, de los fundamentos al despliegue.';

  modules: CourseModule[] = [
    {
      badge: 'M1', title: 'Programación Reactiva',
      desc: 'Paradigma reactivo, Reactive Streams, backpressure y el patrón Observer.',
      cert: 'Reactive Basics', offset: 0,
      lessons: ['¿Qué es reactivo?', 'Reactive Streams spec', 'Project Reactor', 'Backpressure', 'Cold vs Hot Publishers', 'Schedulers', 'Operadores de composición', 'Evaluación'],
    },
    {
      badge: 'M2', title: 'Flux & Mono',
      desc: 'Operadores esenciales de Project Reactor para transformar y combinar flujos.',
      cert: 'Reactor Core', offset: 7,
      lessons: ['Mono: creación y suscripción', 'Flux: creación y suscripción', 'map & flatMap', 'filter, take & skip', 'zip, merge & concat', 'onError & retry', 'Testing con StepVerifier', 'Evaluación'],
    },
    {
      badge: 'M3', title: 'WebFlux Controllers',
      desc: '@RestController reactivo, Router Functions y manejo de errores no bloqueante.',
      cert: 'Reactive Web', offset: 15,
      lessons: ['Spring WebFlux setup', '@RestController reactivo', 'Router Functions', 'Manejo de errores global', 'SSE (Server-Sent Events)', 'Evaluación'],
    },
    {
      badge: 'M4', title: 'R2DBC & Reactive Data',
      desc: 'Acceso reactivo a bases de datos con R2DBC y Spring Data R2DBC.',
      cert: 'Reactive Data', offset: 21,
      lessons: ['R2DBC vs JDBC', 'ReactiveCrudRepository', 'Queries y @Query reactivas', 'Transacciones reactivas', 'Redis reactivo con Lettuce', 'Evaluación'],
    },
    {
      badge: 'M5', title: 'Security Reactivo',
      desc: 'Spring Security WebFlux, JWT reactivo y SecurityWebFilterChain.',
      cert: 'Reactive Security', offset: 27,
      lessons: ['SecurityWebFilterChain', 'ReactiveAuthenticationManager', 'JWT con WebFlux', '@PreAuthorize reactivo y CORS', 'Evaluación'],
    },
    {
      badge: 'M6', title: 'WebClient',
      desc: 'Cliente HTTP reactivo no bloqueante para consumir APIs externas.',
      cert: 'WebClient', offset: 32,
      lessons: ['WebClient setup', 'GET & POST reactivos', 'Manejo de errores HTTP', 'Timeouts, retry y ExchangeFilterFunction', 'Evaluación'],
    },
    {
      badge: 'M7', title: 'Testing Reactivo',
      desc: 'StepVerifier, WebTestClient y testing de flujos asíncronos.',
      cert: 'Reactive Testing', offset: 37,
      lessons: ['StepVerifier avanzado', 'WebTestClient', '@WebFluxTest y mocking', 'Evaluación'],
    },
    {
      badge: 'M8', title: 'Deploy & Performance',
      desc: 'Netty vs Tomcat, threading model, profiling y deploy en contenedores.',
      cert: 'Reactive Ops', offset: 41,
      lessons: ['Modelo de hilos de Netty', 'BlockHound', 'Docker y Kubernetes para WebFlux', 'Evaluación'],
    },
  ];
}
