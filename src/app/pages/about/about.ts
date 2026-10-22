import { Component, inject } from '@angular/core';
import { Seo } from '../../core/seo.service';
import { AboutProfile } from '../../shared/about-profile/about-profile';

@Component({
  selector: 'app-about',
  imports: [AboutProfile],
  template: `
    <div class="pf-container pf-page">
      <app-about-profile />
    </div>
  `,
})
export class About {
  constructor() {
    inject(Seo).set({
      title: 'Sobre mí',
      description:
        'Jhan Gutierrez, desarrollador backend especializado en Java y Spring Boot en Trujillo, Perú. También desarrolla interfaces con Angular y comparte lo que aprende sobre microservicios y arquitectura limpia.',
      path: 'sobre-mi',
    });
  }
}
