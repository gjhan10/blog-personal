import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-ms-module-m5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gateway.html',
  encapsulation: ViewEncapsulation.None
})
export class MsModuleM5Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
