import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/site.config';
import { COURSES } from '../../data/courses.data';
import { NOTES } from '../../data/notes.data';
import { PROJECTS } from '../../data/projects.data';
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
  imports: [NgTemplateOutlet, RouterLink, Flow],
  templateUrl: './about-profile.html',
  styleUrl: './about-profile.scss',
})
export class AboutProfile {
  readonly page = input(false);

  protected readonly site = SITE;
  protected readonly courses = COURSES;
  protected readonly projects = PROJECTS;
  protected readonly notes = NOTES;

  protected readonly layers: FlowStep[] = LAYERS.flatMap(({ group, name, core, via }) => {
    const found = SKILL_GROUPS.find((g) => g.title === group);
    return found ? [{ name, body: found.items.join(', '), core, via }] : [];
  });
}
