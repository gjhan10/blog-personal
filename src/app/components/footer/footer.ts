import { afterNextRender, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { SITE } from '../../core/site.config';
import { SocialTiles } from '../../shared/social-tiles/social-tiles';

@Component({
  selector: 'app-footer',
  imports: [SocialTiles],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly compact = input(false);

  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
  protected readonly localTime = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    const fmt = new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: SITE.timeZone });
    afterNextRender(() => {
      const tick = () => this.localTime.set(fmt.format(new Date()));
      tick();
      const id = window.setInterval(tick, 15_000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
