import { Component } from '@angular/core';
import { SITE } from '../../core/site.config';
import { SKILL_GROUPS } from '../../data/skills.data';
import { Flow, FlowStep } from '../flow/flow';

const LAYERS: { group: string; name: string; core?: boolean; via?: string }[] = [
  { group: 'Frontend', name: 'Interfaz', via: 'APIs REST' },
  { group: 'Backend', name: 'Servicio', core: true, via: 'SQL y mensajería' },
  { group: 'Datos y mensajería', name: 'Datos', via: 'Integración y entrega continuas' },
  { group: 'Herramientas y entrega', name: 'Entrega' },
];

@Component({
  selector: 'app-about-profile',
  imports: [Flow],
  templateUrl: './about-profile.html',
  styleUrl: './about-profile.scss',
})
export class AboutProfile {
  protected readonly site = SITE;

  protected readonly layers: FlowStep[] = LAYERS.flatMap(({ group, name, core, via }) => {
    const found = SKILL_GROUPS.find((g) => g.title === group);
    return found ? [{ name, body: found.items.join(', '), core, via }] : [];
  });
}
