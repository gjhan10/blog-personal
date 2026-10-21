import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-ms-module-m6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observabilidad.html',
  encapsulation: ViewEncapsulation.None
})
export class MsModuleM6Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
