import { readingMinutes, NOTES, segments } from '../data/notes.data';

describe('notas', () => {
  it('separa código en línea y negrita sin interpretar HTML', () => {
    expect(segments('usa `final` y **no** `<b>`')).toEqual([
      { text: 'usa ', kind: 'text' },
      { text: 'final', kind: 'code' },
      { text: ' y ', kind: 'text' },
      { text: 'no', kind: 'strong' },
      { text: ' ', kind: 'text' },
      { text: '<b>', kind: 'code' },
    ]);
  });

  it('calcula minutos de lectura mínimos de 1', () => {
    for (const n of NOTES) expect(readingMinutes(n)).toBeGreaterThanOrEqual(1);
  });
});
