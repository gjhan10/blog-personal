import { Component, computed, input } from '@angular/core';

export type IconName = 'arrow-right' | 'arrow-up-right' | 'arrow-down' | 'arrow-left' | 'mail' | 'github' | 'linkedin' | 'whatsapp' | 'menu' | 'close' | 'copy' | 'check';

const PATHS: Record<IconName, string> = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'arrow-down': 'M12 4v16M6 14l6 6 6-6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7',
  github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  whatsapp: 'M3 21l1.7-5.1A8.5 8.5 0 1 1 8 19.3L3 21zM9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a3.6 3.6 0 0 1-1.6-1.6l.7-.9-1-2L9 9.500z',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6 6 18',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  check: 'M5 12.5l4.5 4.5L19 7.500',
};

@Component({
  selector: 'app-icon',
  template: `<svg class="pf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path [attr.d]="d()" /></svg>`,
  styles: `:host { display: inline-flex; line-height: 0; }`,
})
export class Icon {
  readonly name = input.required<IconName>();
  protected readonly d = computed(() => PATHS[this.name()]);
}
