import { Component, computed, input } from '@angular/core';
import { segments } from '../../data/notes.data';

@Component({
  selector: 'app-rich-text',
  template: `@for (s of parts(); track $index) {@switch (s.kind) {@case ('code') {<code>{{ s.text }}</code>}@case ('strong') {<strong>{{ s.text }}</strong>}@default {{{ s.text }}}}}`,
})
export class RichText {
  readonly text = input.required<string>();
  protected readonly parts = computed(() => segments(this.text()));
}
