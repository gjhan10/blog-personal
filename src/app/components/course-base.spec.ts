import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { loadProgress, saveProgress } from '../core/course-progress';
import { Microservices } from './microservices/microservices';

describe('CourseBase', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    localStorage.removeItem('apuntes:microservices');
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([{ path: 'microservices', component: Microservices }])],
    });
    harness = await RouterTestingHarness.create();
  });

  afterEach(() => localStorage.removeItem('apuntes:microservices'));

  it('abre la lección indicada en la URL y calcula la posición incluyendo evaluaciones', async () => {
    const course = await harness.navigateByUrl('/microservices?m=1&l=2', Microservices);
    expect(course.view).toBe('lesson');
    expect(course.activeModule).toBe(1);
    expect(course.position).toBe(course.modules[0].lessons.length + 3);
    expect(course.totalLessons).toBe(course.modules.reduce((n, m) => n + m.lessons.length, 0));
  });

  it('vuelve al inicio del curso ante un enlace con módulo inexistente, sin romperse', async () => {
    const course = await harness.navigateByUrl('/microservices?m=99&l=0', Microservices);
    await harness.fixture.whenStable();
    expect(course.view).toBe('home');
    expect(TestBed.inject(Router).url).toBe('/microservices');
  });

  it('reconoce las evaluaciones sin depender de emoji', async () => {
    const course = await harness.navigateByUrl('/microservices', Microservices);
    expect(course.isEvalTitle('Evaluación')).toBeTrue();
    expect(course.isEvalTitle('Bounded Context & DDD')).toBeFalse();
    expect(course.modules.every((m) => m.lessons.some((l) => course.isEvalTitle(l)))).toBeTrue();
  });

  it('al fallar marca la opción elegida y revela la correcta', async () => {
    const course = await harness.navigateByUrl('/microservices', Microservices);
    const box = document.createElement('div');
    box.id = 'qtest';
    box.innerHTML = '<div class="quiz-opt" id="a"></div><div class="quiz-opt" data-correct="true" id="b"></div>';
    document.body.appendChild(box);
    course.answer(box.querySelector('#a'), 'qtest', false);
    expect(box.querySelector('#a')!.classList.contains('wrong')).toBeTrue();
    expect(box.querySelector('#b')!.classList.contains('correct')).toBeTrue();
    course.answer(box.querySelector('#b'), 'qtest', true);
    expect(box.querySelector('#b')!.classList.contains('revealed')).toBeTrue();
    box.remove();
  });

  it('guarda y recupera el progreso de forma segura', () => {
    saveProgress('microservices', { visited: ['0-1', '0-2'], last: { m: 0, l: 2 } });
    expect(loadProgress('microservices')).toEqual({ visited: ['0-1', '0-2'], last: { m: 0, l: 2 } });
    localStorage.setItem('apuntes:microservices', '{roto');
    expect(loadProgress('microservices')).toEqual({ visited: [] });
  });
});
