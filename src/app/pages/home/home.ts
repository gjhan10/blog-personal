import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { SoftsparkBand } from '../../shared/softspark-band/softspark-band';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SoftsparkBand],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;

  constructor() {
    inject(Seo).set({
      title: SITE.name,
      description:
        'Portfolio de Jhan Gutierrez, desarrollador de software en Trujillo, Perú: backend con Java y Spring Boot, interfaces con Angular, proyectos, apuntes y notas técnicas.',
    });
  }
}
