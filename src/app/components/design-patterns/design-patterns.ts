import { Component, ViewEncapsulation } from '@angular/core';
import { DpModuleM1Component } from './modules/creational/creational';
import { DpModuleM2Component } from './modules/structural/structural';
import { DpModuleM3Component } from './modules/behavioral/behavioral';
import { CourseBase, CourseModule } from '../course-base';
import { CourseLayout } from '../course-layout/course-layout';

@Component({
  selector: 'app-design-patterns',
  imports: [CourseLayout, DpModuleM1Component, DpModuleM2Component, DpModuleM3Component],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./design-patterns.scss'],
  templateUrl: './design-patterns.html',
})
export class DesignPatterns extends CourseBase {
  readonly courseId = 'design-patterns';
  readonly route = '/design-patterns';
  readonly title = 'Patrones de diseño: los 23 de GoF';
  readonly intro = 'Los 23 patrones del libro Gang of Four, agrupados en creacionales, estructurales y de comportamiento, con implementación en Java.';
  readonly completeText = 'Recorriste los 23 patrones de diseño GoF: creacionales, estructurales y de comportamiento.';

  modules: CourseModule[] = [
    {
      badge: 'M1', title: 'Creacionales',
      desc: 'Patrones que abstraen el proceso de creación de objetos, desacoplando al cliente de la clase concreta.',
      cert: 'Creational Patterns', offset: 0,
      lessons: ['Singleton', 'Factory Method', 'Abstract Factory', 'Builder', 'Prototype', 'Evaluación'],
    },
    {
      badge: 'M2', title: 'Estructurales',
      desc: 'Patrones que componen clases u objetos para formar estructuras más grandes manteniendo flexibilidad.',
      cert: 'Structural Patterns', offset: 5,
      lessons: ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Flyweight', 'Proxy', 'Evaluación'],
    },
    {
      badge: 'M3', title: 'Comportamiento',
      desc: 'Patrones que definen algoritmos, responsabilidades y la comunicación entre objetos.',
      cert: 'Behavioral Patterns', offset: 12,
      lessons: ['Chain of Responsibility', 'Command', 'Iterator', 'Mediator', 'Memento', 'Observer', 'State', 'Strategy', 'Template Method', 'Visitor', 'Interpreter', 'Evaluación'],
    },
  ];
}
