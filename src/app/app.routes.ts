import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Projects } from './components/projects/projects';
import { About } from './components/about/about';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'proyectos', component: Projects },
  { path: 'sobre-mi', component: About },

  { path: '**', redirectTo: '' } // ruta 404
];
