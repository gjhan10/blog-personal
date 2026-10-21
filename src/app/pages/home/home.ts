import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CursoJavaComponent } from '../../components/projects/curso-java/curso-java.component';
import { Seo } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { NOTES } from '../../data/notes.data';
import { findProject } from '../../data/projects.data';
import { AboutProfile } from '../../shared/about-profile/about-profile';
import { CourseList } from '../../shared/course-list/course-list';
import { NoteList } from '../../shared/note-list/note-list';
import { ProjectTile } from '../../shared/project-tile/project-tile';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CursoJavaComponent, ProjectTile, CourseList, AboutProfile, NoteList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly notes = NOTES.slice(0, 3);
  protected readonly portfolio = findProject('portfolio-angular')!;
  protected readonly orders = findProject('microservicios-pedidos')!;
  protected readonly featured = {
    title: 'Java Backend Profesional',
    description:
      'Plataforma de aprendizaje: Java, Spring Boot, WebFlux, patrones de diseño y microservicios, con ejemplos de código, evaluaciones por módulo y un editor ejecutable en la ruta de Java.',
    repoUrl: SITE.repo,
  };

  constructor() {
    inject(Seo).set({
      title: SITE.name,
      description:
        'Portfolio de Jhan Gutierrez, desarrollador de software en Trujillo, Perú: backend con Java y Spring Boot, interfaces con Angular, proyectos, apuntes y notas técnicas.',
    });
  }
}
