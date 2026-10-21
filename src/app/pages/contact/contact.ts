import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { Seo } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';
import { SocialTiles } from '../../shared/social-tiles/social-tiles';

@Component({
  selector: 'app-contact',
  imports: [Icon, SocialTiles],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly site = SITE;
  protected readonly copied = signal(false);
  protected readonly localTime = signal('');
  protected readonly mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Contacto desde tu portfolio')}`;

  constructor() {
    inject(Seo).set({
      title: 'Contacto',
      description: 'Contacta a Jhan Gutierrez por correo, LinkedIn, GitHub o WhatsApp.',
      path: 'contacto',
    });
    const destroyRef = inject(DestroyRef);
    const fmt = new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: SITE.timeZone });
    afterNextRender(() => {
      const tick = () => this.localTime.set(fmt.format(new Date()));
      tick();
      const id = window.setInterval(tick, 15_000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(SITE.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.copied.set(false);
    }
  }
}
