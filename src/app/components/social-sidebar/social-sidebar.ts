import { Component } from '@angular/core';
import { SITE } from '../../core/site.config';
import { Icon, IconName } from '../../shared/icon/icon';

interface Item {
  label: string;
  href: string;
  icon: IconName;
  brand: string;
  external: boolean;
}

@Component({
  selector: 'app-social-sidebar',
  imports: [Icon],
  template: `
    <nav class="rail" aria-label="Contacto rápido">
      <ul>
        @for (i of items; track i.label) {
          <li>
            <a [href]="i.href" [attr.target]="i.external ? '_blank' : null" [attr.rel]="i.external ? 'noopener noreferrer' : null" [attr.aria-label]="i.label" [style.--brand]="i.brand">
              <app-icon [name]="i.icon" />
              <span class="tip" aria-hidden="true">{{ i.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .rail { position: fixed; left: 12px; bottom: 0; z-index: 1000; display: none; flex-direction: column; align-items: center; }
    .rail::after { content: ''; width: 1px; height: 90px; background: var(--ink-dim); opacity: 0.5; margin-top: 12px; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
    a {
      position: relative; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 14px;
      color: var(--ink-dim); font-size: 22px; text-decoration: none; -webkit-tap-highlight-color: transparent;
      transition: color 0.25s var(--ease-out), background-color 0.25s var(--ease-out), transform 0.2s var(--ease-out);
    }
    a:active { transform: scale(0.92); }
    a:focus-visible { outline: 2px solid var(--signal); outline-offset: 2px; }
    .tip {
      position: absolute; left: calc(100% + 10px); top: 50%; padding: 7px 12px; border-radius: 10px;
      background: var(--brand); color: #fff; font: 600 14px/1 var(--font-body); white-space: nowrap; pointer-events: none;
      opacity: 0; transform: translate(-6px, -50%);
      transition: opacity 0.2s var(--ease-out), transform 0.3s var(--ease-out);
    }
    a:focus-visible .tip { opacity: 1; transform: translate(0, -50%); }
    @media (hover: hover) and (pointer: fine) {
      a:hover { color: #fff; background: var(--brand); }
      a:hover .tip { opacity: 1; transform: translate(0, -50%); }
    }
    @media (min-width: 1400px) { .rail { display: flex; } }
  `,
})
export class SocialSidebar {
  protected readonly items: Item[] = [
    { label: 'Correo', href: `mailto:${SITE.email}`, icon: 'mail', brand: '#d4533b', external: false },
    { label: 'WhatsApp', href: SITE.whatsapp, icon: 'whatsapp', brand: '#1a9d55', external: true },
    { label: 'LinkedIn', href: SITE.linkedin, icon: 'linkedin', brand: '#0a66c2', external: true },
    { label: 'GitHub', href: SITE.github, icon: 'github', brand: '#24292f', external: true },
  ];
}
