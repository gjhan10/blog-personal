import { Component, ViewEncapsulation } from '@angular/core';
import { SbModuleM1Component } from './modules/intro/intro';
import { SbModuleM2Component } from './modules/ioc/ioc';
import { SbModuleM3Component } from './modules/rest/rest';
import { SbModuleM4Component } from './modules/jpa/jpa';
import { SbModuleM5Component } from './modules/security/security';
import { SbModuleM6Component } from './modules/testing/testing';
import { SbModuleM7Component } from './modules/actuator/actuator';
import { SbModuleM8Component } from './modules/deploy/deploy';
import { CourseBase, CourseModule } from '../course-base';
import { CourseLayout } from '../course-layout/course-layout';

@Component({
  selector: 'app-springboot',
  imports: [CourseLayout, SbModuleM1Component, SbModuleM2Component, SbModuleM3Component, SbModuleM4Component, SbModuleM5Component, SbModuleM6Component, SbModuleM7Component, SbModuleM8Component],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./springboot.scss'],
  templateUrl: './springboot.html',
})
export class SpringBoot extends CourseBase {
  readonly courseId = 'springboot';
  readonly route = '/springboot';
  readonly title = 'Spring Boot: principiante a avanzado';
  readonly intro = 'Spring Boot desde el primer proyecto hasta el despliegue con Docker: IoC, APIs REST, JPA, seguridad, testing y observabilidad.';
  readonly completeText = 'Recorriste Spring Boot desde el primer proyecto hasta el despliegue con Docker y CI/CD.';

  modules: CourseModule[] = [
    {
      badge: 'M1', title: 'Introducción & Setup',
      desc: 'Spring Initializr, starters, autoconfiguration y tu primera API REST.',
      cert: 'Spring Boot Basics', offset: 0,
      lessons: ['¿Qué es Spring Boot?', 'Spring Initializr', 'Starters & Autoconfiguration', 'application.properties', '@SpringBootApplication', 'Primera API REST', 'Evaluación'],
    },
    {
      badge: 'M2', title: 'IoC & Dependency Injection',
      desc: 'Contenedor IoC, beans, estereotipos, @Autowired y scopes.',
      cert: 'Spring Core', offset: 6,
      lessons: ['Contenedor IoC', 'Beans & Estereotipos', '@Autowired & DI', 'Constructor Injection', 'Bean Scopes', '@Profile & @Configuration', 'Evaluación'],
    },
    {
      badge: 'M3', title: 'Spring MVC REST',
      desc: '@RestController, endpoints, DTOs, validación y manejo de errores.',
      cert: 'Spring Web', offset: 12,
      lessons: ['REST & HTTP', '@RestController', '@PathVariable & @RequestParam', '@RequestBody & DTOs', 'Validación con @Valid', '@ExceptionHandler & @ControllerAdvice', 'ResponseEntity', 'Evaluación'],
    },
    {
      badge: 'M4', title: 'Spring Data JPA',
      desc: 'Entities, repositorios, JPQL, relaciones, paginación y transacciones.',
      cert: 'Spring Data', offset: 19,
      lessons: ['JPA & Hibernate', '@Entity & @Table', 'CrudRepository & JpaRepository', 'JPQL & @Query', 'Relaciones @OneToMany & @ManyToMany', 'Pagination & Sorting', '@Transactional', 'Evaluación'],
    },
    {
      badge: 'M5', title: 'Spring Security',
      desc: 'Autenticación, JWT, SecurityFilterChain y seguridad a nivel de método.',
      cert: 'Spring Security', offset: 26,
      lessons: ['Spring Security Intro', 'Configuración básica', 'JWT Authentication', 'SecurityFilterChain', 'Method Security (@PreAuthorize)', 'OAuth2 Basics', 'Evaluación'],
    },
    {
      badge: 'M6', title: 'Testing',
      desc: 'JUnit 5, Mockito, MockMvc, @SpringBootTest y @DataJpaTest.',
      cert: 'Spring Testing', offset: 32,
      lessons: ['JUnit 5 con Spring', 'Mockito', 'MockMvc', '@SpringBootTest', '@DataJpaTest', 'Evaluación'],
    },
    {
      badge: 'M7', title: 'Actuator & Métricas',
      desc: 'Spring Actuator, health checks, métricas con Micrometer y Prometheus.',
      cert: 'Spring Ops', offset: 37,
      lessons: ['Spring Boot Actuator', 'Micrometer', 'Prometheus & Grafana', 'Distributed Tracing', 'Evaluación'],
    },
    {
      badge: 'M8', title: 'Despliegue',
      desc: 'Profiles, logging, Dockerfile, docker-compose y CI/CD básico.',
      cert: 'Spring DevOps', offset: 41,
      lessons: ['Profiles', 'Docker', 'docker-compose', 'Kubernetes Basics', 'CI/CD con GitHub Actions', 'Evaluación'],
    },
  ];
}
