import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-dp-module-m3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './behavioral.html',
  encapsulation: ViewEncapsulation.None
})
export class DpModuleM3Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
