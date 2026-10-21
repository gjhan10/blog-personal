import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-module-m4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recursividad.html',
  encapsulation: ViewEncapsulation.None
})
export class ModuleM4Component {
  @Input() globalLesson!: number;
  @Input() playground!: TemplateRef<any>;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}