import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
projects = [
  {
    title: 'Dopefolio',
    description: `Un portafolio personal moderno y completamente responsivo, construido con las mejores prácticas de accesibilidad y rendimiento.`,
    image: 'assets/projects/dopefolio.png',
    tags: ['Angular', 'SCSS', 'Accesibilidad', 'Diseño Responsivo'],
    caseStudyUrl: '#',
    liveDemoUrl: '#',
    repoUrl: 'https://github.com/yourname/dopefolio'
  },
  {
    title: 'Startup UI Kit',
    description: `Un sistema de diseño elegante y biblioteca UI pensada para startups SaaS. Incluye landing pages, dashboards y bloques de marketing reutilizables.`,
    image: 'assets/projects/startup-ui.png',
    tags: ['Figma', 'Sistema de diseño', 'Tailwind', 'TypeScript'],
    caseStudyUrl: '#',
    liveDemoUrl: '#',
    repoUrl: ''
  },
  {
    title: 'Fintrack',
    description: `Una aplicación para llevar el control de tus finanzas personales, con gráficos, objetivos de ahorro y categorización de gastos.`,
    image: 'assets/projects/fintrack.png',
    tags: ['Angular', 'Chart.js', 'Firebase', 'UX Writing'],
    caseStudyUrl: '#',
    liveDemoUrl: '#',
    repoUrl: 'https://github.com/yourname/fintrack'
  }
];

}
