import { Component } from '@angular/core';
import { SITE } from '../../core/site.config';
import { Icon, IconName } from '../icon/icon';

interface Network {
  name: string;
  detail: string;
  href: string;
  icon: IconName;
  brand: string;
}

@Component({
  selector: 'app-social-tiles',
  imports: [Icon],
  template: `
    <ul class="social" aria-label="Perfiles">
      @for (n of networks; track n.name) {
        <li>
          <a class="net" [href]="n.href" target="_blank" rel="noopener noreferrer" [style.--brand]="n.brand">
            <span class="badge"><app-icon [name]="n.icon" /></span>
            <span class="text">
              <span class="name">{{ n.name }}</span>
              <span class="detail">{{ n.detail }}</span>
            </span>
            <span class="go"><app-icon name="arrow-up-right" /></span>
            <span class="pf-sr">(se abre en una pestaña nueva)</span>
          </a>
        </li>
      }
    </ul>
  `,
  styleUrl: './social-tiles.scss',
})
export class SocialTiles {
  protected readonly networks: Network[] = [
    { name: 'GitHub', detail: 'Mi código y repositorios', href: SITE.github, icon: 'github', brand: '#24292f' },
    { name: 'LinkedIn', detail: 'Perfil profesional', href: SITE.linkedin, icon: 'linkedin', brand: '#0a66c2' },
    { name: 'WhatsApp', detail: 'Mensaje directo', href: SITE.whatsapp, icon: 'whatsapp', brand: '#1a9d55' },
  ];
}
