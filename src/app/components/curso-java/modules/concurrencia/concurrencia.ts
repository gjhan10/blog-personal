import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-module-m8',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concurrencia.html',
  encapsulation: ViewEncapsulation.None
})
export class ModuleM8Component {
  @Input() globalLesson!: number;
  @Input() playground!: TemplateRef<any>;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}