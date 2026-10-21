import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  preserveWhitespaces: true,
  selector: 'app-sb-module-m6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing.html',
  encapsulation: ViewEncapsulation.None
})
export class SbModuleM6Component {
  @Input() globalLesson!: number;
  @Input() isEval: boolean = false;
  @Input() answer!: (el: EventTarget | null, qId: string, correct: boolean) => void;
}
