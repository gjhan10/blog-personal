import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { About } from './about';

describe('Sobre mí', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [About], providers: [provideZonelessChangeDetection(), provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('conserva la redacción original en un único h1', () => {
    const h1 = el.querySelectorAll('h1');
    expect(h1.length).toBe(1);
    expect(h1[0].textContent).toContain('Desarrollador Backend especializado en Java y Spring Boot');
    expect(h1[0].textContent).toContain('robustas');
    expect(h1[0].textContent).toContain('escalables');
  });

  it('muestra una ficha con datos tomados del perfil real', () => {
    const labels = [...el.querySelectorAll('.facts dt')].map((e) => e.textContent?.trim());
    expect(labels).toEqual(['Especialidad', 'También', 'Me interesa', 'Ubicación', 'Disponibilidad']);
    expect(el.querySelector('.facts')?.textContent).toContain('Trujillo');
  });

  it('presenta el stack como capas conectadas con el servicio como centro', () => {
    const names = [...el.querySelectorAll('app-flow h3')].map((h) => h.textContent?.trim());
    expect(names).toEqual(['Interfaz', 'Servicio', 'Datos', 'Entrega']);
    expect(el.querySelector('.step.core h3')?.textContent).toContain('Servicio');
    expect(el.querySelectorAll('.link').length).toBe(3);
  });

  it('no repite los enlaces de contacto que ya están en el footer', () => {
    expect(el.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(el.querySelector('a[href*="linkedin"]')).toBeNull();
    expect(el.querySelector('a[href*="github.com"]')).toBeNull();
  });

  it('no añade cifras, certificaciones ni clientes', () => {
    const text = el.textContent ?? '';
    expect(text).not.toMatch(/\d+\s*(años|clientes|%)/i);
    expect(text).not.toMatch(/certificad/i);
  });
});
