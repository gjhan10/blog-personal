import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-wf-module-m3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './router-fn.html',
  encapsulation: ViewEncapsulation.None
})
export class WfModuleM3Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
