export interface Course {
  badge: string;
  title: string;
  desc: string;
  modules: number;
  lessons: number;
  level: string;
  tags: string[];
  route: string;
}

export const COURSES: Course[] = [
  {
    badge: 'JAVA',
    title: 'Java — De Cero a Experto',
    desc: 'Fundamentos, OOP, colecciones, lambdas, concurrencia y novedades hasta Java 24.',
    modules: 9, lessons: 49, level: 'Fundamentos → Avanzado',
    tags: ['JDK', 'OOP', 'Stream API', 'Concurrencia', 'Java 21'], route: '/curso-java',
  },
  {
    badge: 'SB',
    title: 'Spring Boot — Principiante a Avanzado',
    desc: 'IoC, Spring MVC REST, Spring Data JPA, Spring Security, Testing y despliegue con Docker.',
    modules: 8, lessons: 46, level: 'Principiante → Avanzado',
    tags: ['IoC/DI', 'REST', 'JPA', 'JWT', 'Docker'], route: '/springboot',
  },
  {
    badge: 'WF',
    title: 'WebFlux — Programación Reactiva',
    desc: 'Reactive Streams, Project Reactor, WebFlux, R2DBC, WebClient y seguridad reactiva.',
    modules: 8, lessons: 38, level: 'Principiante → Avanzado',
    tags: ['Mono/Flux', 'R2DBC', 'WebClient', 'Reactor', 'SSE'], route: '/webflux',
  },
  {
    badge: 'DP',
    title: 'Patrones de Diseño de Clases',
    desc: 'Los 23 patrones GoF: creacionales, estructurales y de comportamiento con ejemplos en Java.',
    modules: 3, lessons: 23, level: 'Intermedio → Avanzado',
    tags: ['GoF', 'Creacionales', 'Estructurales', 'Comportamiento', 'UML'], route: '/design-patterns',
  },
  {
    badge: 'MS',
    title: 'Patrones de Microservicios',
    desc: 'Comunicación, resiliencia, gateway, CQRS, observabilidad y fundamentos de arquitectura distribuida.',
    modules: 6, lessons: 36, level: 'Avanzado',
    tags: ['Circuit Breaker', 'CQRS', 'API Gateway', 'Observabilidad'], route: '/microservices',
  },
];

export const COURSE_TOTALS = {
  courses: COURSES.length,
  modules: COURSES.reduce((n, c) => n + c.modules, 0),
  lessons: COURSES.reduce((n, c) => n + c.lessons, 0),
};
