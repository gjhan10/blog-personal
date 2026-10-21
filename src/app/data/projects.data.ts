import { SITE } from '../core/site.config';

export type ProjectStatus = 'Publicado' | 'En progreso' | 'Planificado';
export type ProjectKind = 'Personal' | 'Educativo' | 'Experimental';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Service {
  name: string;
  role: string;
  stack: string;
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  status: ProjectStatus;
  year: string;
  summary: string;
  media: string;
  mediaAlt: string;
  stack: string[];
  problem: string;
  solution: string;
  works: string[];
  pending: string[];
  links: ProjectLink[];
  services?: Service[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'apuntes-java-backend',
    title: 'Apuntes interactivos de Java backend',
    kind: 'Educativo',
    status: 'Publicado',
    year: '2025–2026',
    summary:
      'Cinco rutas de estudio dentro de este sitio: Java, Spring Boot, WebFlux, patrones de diseño y microservicios, con ejemplos de código y evaluaciones.',
    media: 'assets/projects/apuntes-leccion.webp',
    mediaAlt: 'Lección de Introducción a Java con un editor de código y el botón Ejecutar',
    stack: ['Angular', 'TypeScript', 'SCSS', 'Java', 'Spring Boot'],
    problem:
      'Estudiar backend con Java implica saltar entre documentación, videos y ejemplos sueltos, y es difícil saber qué ya cubrí.',
    solution:
      'Un solo lugar con rutas ordenadas por módulo, ejemplos de código que se pueden ejecutar y una evaluación al final de cada módulo.',
    works: [
      'Cinco rutas con índice de lecciones, enlaces directos a cada lección y una evaluación por módulo que muestra la respuesta correcta al fallar.',
      'El progreso se guarda en el navegador y permite continuar donde lo dejaste.',
      'En la ruta de Java, editor con botón «Ejecutar»: los ejemplos muestran su salida real de OpenJDK 21 y el código modificado se compila y ejecuta en línea.',
      'Resaltado de sintaxis y bloques de salida de ejemplo.',
      'Carga diferida por ruta para no penalizar el resto del sitio.',
    ],
    pending: [
      'El progreso no se sincroniza entre dispositivos: vive solo en el navegador.',
      'Ejecutar código modificado depende de Wandbox, un compilador público en línea: necesita conexión y limita las ejecuciones muy seguidas.',
      'Revisión técnica pendiente de algunas lecciones.',
    ],
    links: [
      { label: 'Abrir los apuntes', href: '/java-backend' },
      { label: 'Código en GitHub', href: SITE.repo },
    ],
  },
  {
    slug: 'portfolio-angular',
    title: 'Este portfolio',
    kind: 'Personal',
    status: 'Publicado',
    year: '2026',
    summary: 'Sitio estático en Angular 20 con prerender, notas técnicas y despliegue gratuito en GitHub Pages.',
    media: 'assets/projects/portfolio-inicio.webp',
    mediaAlt: 'Página de inicio de este portfolio',
    stack: ['Angular 20', 'TypeScript', 'SCSS', 'Prerender estático', 'GitHub Actions'],
    problem: 'Quería un lugar propio que cuente con honestidad qué sé, qué construyo y qué estoy aprendiendo, sin pagar infraestructura.',
    solution:
      'Un sitio 100 % estático: rutas prerenderizadas, contenido versionado en el repositorio y un despliegue automático a GitHub Pages.',
    works: [
      'Rutas prerenderizadas con metadatos Open Graph por página.',
      'Notas técnicas versionadas en el repositorio.',
      'Diseño responsive, navegación por teclado y soporte de prefers-reduced-motion.',
      'Despliegue automático a GitHub Pages con GitHub Actions.',
    ],
    pending: [
      'Imagen Open Graph propia (hoy no hay una).',
      'Publicar el CV en PDF (el botón se activa al definir la ruta en la configuración).',
    ],
    links: [{ label: 'Código en GitHub', href: SITE.repo }],
  },
  {
    slug: 'microservicios-pedidos',
    title: 'Plataforma de pedidos con microservicios',
    kind: 'Experimental',
    status: 'Planificado',
    year: 'Próximo',
    summary:
      'Proyecto práctico para aplicar lo estudiado: servicios Spring Boot con responsabilidades separadas, autenticación JWT, Docker y pruebas, con un frontend Angular.',
    media: 'assets/projects/microservicios-arquitectura.svg',
    mediaAlt: 'Diagrama de la arquitectura prevista: gateway, servicio de autenticación, catálogo y pedidos',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT', 'Angular'],
    problem: 'Lo estudiado sobre microservicios sigue siendo teoría hasta que se aplica en un caso con varios servicios que se hablan entre sí.',
    solution:
      'Empezar con un monolito modular bien probado y separar servicios solo donde aporte valor. Esta página documenta el diseño propuesto; todavía no hay código.',
    works: ['Arquitectura y alcance definidos en esta página.'],
    pending: [
      'Implementar los servicios y sus pruebas.',
      'Autenticación y autorización con JWT.',
      'Comunicación entre servicios y manejo de fallos.',
      'Docker Compose para levantar todo en local.',
      'Frontend Angular conectado al backend real.',
      'Hosting del backend (requiere un servicio externo).',
    ],
    links: [{ label: 'Ver la ruta de microservicios', href: '/microservices' }],
    services: [
      { name: 'api-gateway', role: 'Punto de entrada, enrutamiento y validación del token.', stack: 'Spring Cloud Gateway' },
      { name: 'auth-service', role: 'Registro, login y emisión de JWT.', stack: 'Spring Security' },
      { name: 'catalog-service', role: 'Productos y stock.', stack: 'Spring Data JPA · PostgreSQL' },
      { name: 'orders-service', role: 'Creación y estado de pedidos; consulta stock al catálogo.', stack: 'Spring Web · WebClient' },
    ],
  },
];

export const findProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
