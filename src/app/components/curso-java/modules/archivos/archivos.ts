import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-module-m7',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archivos.html',
  encapsulation: ViewEncapsulation.None
})
export class ModuleM7Component {
  @Input() globalLesson!: number;
  @Input() playground!: TemplateRef<any>;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}