import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-wf-module-m4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './r2dbc.html',
  encapsulation: ViewEncapsulation.None
})
export class WfModuleM4Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
