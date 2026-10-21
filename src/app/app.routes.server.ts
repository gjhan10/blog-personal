import { RenderMode, ServerRoute } from '@angular/ssr';
import { NOTES } from './data/notes.data';
import { PROJECTS } from './data/projects.data';

export const serverRoutes: ServerRoute[] = [
  { path: 'proyectos/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => PROJECTS.map((p) => ({ slug: p.slug })) },
  { path: 'notas/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => NOTES.map((n) => ({ slug: n.slug })) },
  { path: 'java-backend', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
