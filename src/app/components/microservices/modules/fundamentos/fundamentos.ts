import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-ms-module-m1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fundamentos.html',
  encapsulation: ViewEncapsulation.None
})
export class MsModuleM1Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
