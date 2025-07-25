import { CommonModule, isPlatformBrowser  } from '@angular/common';
import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, PLATFORM_ID  } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit{
skills: string[] = [
  // 🔧 Backend & DevOps
  'GitFlow', 'Apache Kafka', 'Microsoft SQL Server', 'JAVA 11', 'RxJava',
  'Azure DevOps', 'Fortify', 'Spring Boot', 'Docker', 'JMeter',
  'Microsoft Azure', 'Redis', 'Mongo DB', 'SonarQube', 'Microservicios',
  'Scrum', 'Bitbucket', 'Jenkins', 'SQL de Azure', 'Oracle Database',
  'Git', 'API de Swagger', 'GitHub',

  // 🎨 Frontend
  'Angular', 'Angular Material', 'TypeScript', 'HTML5', 'CSS3', 'SCSS',
  'Responsive Design', 'RxJS', 'Material Icons', 'RESTful Frontend Integration'
];

 @ViewChildren('skillItem') skillItems!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // ✅ Solo ejecutar si estamos en el navegador (cliente)
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('fade-in-up');
          } else {
            el.classList.remove('fade-in-up'); // para reactivar animación
          }
        });
      }, { threshold: 0.1 });

      this.skillItems.forEach(skill => {
        observer.observe(skill.nativeElement);
      });
    }
  }
}
