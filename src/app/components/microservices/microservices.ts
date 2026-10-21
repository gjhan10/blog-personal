import { Component, ViewEncapsulation } from '@angular/core';
import { MsModuleM1Component } from './modules/fundamentos/fundamentos';
import { MsModuleM2Component } from './modules/comunicacion/comunicacion';
import { MsModuleM3Component } from './modules/resiliencia/resiliencia';
import { MsModuleM4Component } from './modules/cqrs/cqrs';
import { MsModuleM5Component } from './modules/gateway/gateway';
import { MsModuleM6Component } from './modules/observabilidad/observabilidad';
import { CourseBase, CourseModule } from '../course-base';
import { CourseLayout } from '../course-layout/course-layout';

@Component({
  selector: 'app-microservices',
  imports: [CourseLayout, MsModuleM1Component, MsModuleM2Component, MsModuleM3Component, MsModuleM4Component, MsModuleM5Component, MsModuleM6Component],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./microservices.scss'],
  templateUrl: './microservices.html',
})
export class Microservices extends CourseBase {
  readonly courseId = 'microservices';
  readonly route = '/microservices';
  readonly title = 'Patrones de microservicios';
  readonly intro = 'Patrones de arquitectura de microservicios con Java y Spring Cloud: comunicación, resiliencia, CQRS, gateway, seguridad y observabilidad.';
  readonly completeText = 'Recorriste los patrones de microservicios: comunicación, resiliencia, CQRS, gateway y observabilidad.';

  modules: CourseModule[] = [
    {
      badge: 'M1', title: 'Fundamentos y Descomposición',
      desc: 'Qué son los microservicios, Bounded Context, DDD, patrones de descomposición y comunicación.',
      cert: 'Microservices Basics', offset: 0,
      lessons: ['¿Qué son los Microservicios?', 'Bounded Context & DDD', 'Patrones de Descomposición', 'Comunicación síncrona vs asíncrona', 'API Design First', 'Challenges & Anti-patrones', 'Evaluación'],
    },
    {
      badge: 'M2', title: 'Comunicación entre Servicios',
      desc: 'REST, gRPC, Kafka, Event-Driven Architecture, Service Discovery y Load Balancing.',
      cert: 'Service Communication', offset: 6,
      lessons: ['REST entre microservicios', 'gRPC & Protocol Buffers', 'Apache Kafka & Mensajería', 'Event-Driven Architecture', 'Service Discovery (Eureka)', 'Load Balancing (Spring Cloud)', 'Evaluación'],
    },
    {
      badge: 'M3', title: 'Resiliencia y Tolerancia a Fallos',
      desc: 'Circuit Breaker, Bulkhead, Retry, Timeout, Rate Limiting y Chaos Engineering.',
      cert: 'Resilience Patterns', offset: 12,
      lessons: ['Circuit Breaker con Resilience4j', 'Bulkhead Pattern', 'Retry & Fallback', 'Timeout Patterns', 'Rate Limiting', 'Chaos Engineering', 'Evaluación'],
    },
    {
      badge: 'M4', title: 'CQRS & Event Sourcing',
      desc: 'Command Query Responsibility Segregation, Event Sourcing, Sagas y Axon Framework.',
      cert: 'CQRS & ES', offset: 18,
      lessons: ['CQRS Fundamentos', 'Command Side con Spring', 'Query Side y Proyecciones', 'Event Sourcing', 'Saga Pattern', 'Axon Framework', 'Evaluación'],
    },
    {
      badge: 'M5', title: 'API Gateway y Seguridad',
      desc: 'Spring Cloud Gateway, JWT centralizado, OAuth2, mTLS y Service Mesh.',
      cert: 'Gateway & Security', offset: 24,
      lessons: ['API Gateway con Spring Cloud', 'JWT Centralizado', 'OAuth2 & OpenID Connect', 'mTLS entre servicios', 'Rate Limiting en Gateway', 'Service Mesh con Istio', 'Evaluación'],
    },
    {
      badge: 'M6', title: 'Observabilidad y Despliegue',
      desc: 'Distributed Tracing, ELK Stack, Prometheus, Grafana, Docker y Kubernetes.',
      cert: 'Observability & Ops', offset: 30,
      lessons: ['Distributed Tracing (OpenTelemetry)', 'Logging centralizado (ELK)', 'Métricas con Prometheus & Grafana', 'Health Checks & Readiness', 'Docker Compose para microservicios', 'Kubernetes para microservicios', 'Evaluación'],
    },
  ];
}
