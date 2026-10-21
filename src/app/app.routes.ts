import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home), title: 'Jhan Gutierrez' },
  { path: 'proyectos', loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects) },
  { path: 'proyectos/:slug', loadComponent: () => import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail) },
  { path: 'aprendizaje', loadComponent: () => import('./pages/learning/learning').then((m) => m.Learning) },
  { path: 'notas', loadComponent: () => import('./pages/notes/notes').then((m) => m.Notes) },
  { path: 'notas/:slug', loadComponent: () => import('./pages/note-detail/note-detail').then((m) => m.NoteDetail) },
  { path: 'sobre-mi', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
  { path: 'contacto', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },

  { path: 'java-backend', loadComponent: () => import('./components/java-backend/java-backend').then((m) => m.JavaBackend) },
  { path: 'curso-java', loadComponent: () => import('./components/curso-java/curso-java').then((m) => m.CursoJava) },
  { path: 'springboot', loadComponent: () => import('./components/springboot/springboot').then((m) => m.SpringBoot) },
  { path: 'webflux', loadComponent: () => import('./components/webflux/webflux').then((m) => m.WebFlux) },
  { path: 'design-patterns', loadComponent: () => import('./components/design-patterns/design-patterns').then((m) => m.DesignPatterns) },
  { path: 'microservices', loadComponent: () => import('./components/microservices/microservices').then((m) => m.Microservices) },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
