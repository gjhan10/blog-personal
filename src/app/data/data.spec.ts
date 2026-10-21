import { COURSES, COURSE_TOTALS } from './courses.data';
import { NOTES } from './notes.data';
import { PROJECTS } from './projects.data';

describe('contenido', () => {
  it('los slugs de proyectos y notas son únicos', () => {
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(PROJECTS.length);
    expect(new Set(NOTES.map((n) => n.slug)).size).toBe(NOTES.length);
  });

  it('los proyectos planificados no declaran funcionalidades terminadas más allá de la documentación', () => {
    for (const p of PROJECTS.filter((x) => x.status === 'Planificado')) {
      expect(p.works.length).toBe(1);
      expect(p.pending.length).toBeGreaterThan(0);
    }
  });

  it('no quedan enlaces de plantilla', () => {
    const all = JSON.stringify(PROJECTS);
    expect(all).not.toContain('yourname');
    expect(all).not.toContain('#"');
  });

  it('las notas tienen fecha, resumen y contenido, y vienen ordenadas de más reciente a más antigua', () => {
    for (const n of NOTES) {
      expect(n.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(n.summary.length).toBeGreaterThan(10);
      expect(n.body.length).toBeGreaterThan(0);
    }
    const dates = NOTES.map((n) => n.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it('los totales de cursos salen de los datos', () => {
    expect(COURSE_TOTALS.courses).toBe(COURSES.length);
    expect(COURSE_TOTALS.lessons).toBe(COURSES.reduce((n, c) => n + c.lessons, 0));
  });
});
