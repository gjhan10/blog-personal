import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COURSES } from '../../data/courses.data';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, Icon],
  template: `
    <ul class="list">
      @for (c of courses; track c.route) {
        <li>
          <a [routerLink]="c.route">
            <span class="title">{{ c.title }}</span>
            <span class="desc">{{ c.desc }}</span>
            <span class="meta">{{ c.modules }} módulos, {{ c.lessons }} lecciones <app-icon name="arrow-right" /></span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    .list { list-style: none; margin: 0; padding: 0; display: grid; }
    a { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) auto; gap: 8px 40px; align-items: baseline; padding: 26px 0; text-decoration: none; }
    .title { font: 400 clamp(1.4rem, 2.6vw, 2rem)/1.15 var(--font-display); letter-spacing: -0.025em; transition: color 0.2s; text-wrap: balance; }
    .desc { color: var(--ink-dim); font-size: 0.98rem; max-width: 52ch; text-wrap: pretty; }
    .meta { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-dim); white-space: nowrap; }
    .meta app-icon { transition: transform 0.25s var(--ease-out); }
    @media (hover: hover) and (pointer: fine) {
      a:hover .title { color: var(--signal); }
      a:hover .meta app-icon { transform: translateX(4px); }
    }
    @media (max-width: 860px) { a { grid-template-columns: 1fr; gap: 6px; } }
  `,
})
export class CourseList {
  protected readonly courses = COURSES;
}
