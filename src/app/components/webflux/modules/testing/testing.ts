import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-wf-module-m7',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing.html',
  encapsulation: ViewEncapsulation.None
})
export class WfModuleM7Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
