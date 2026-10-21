import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeToggle } from '../shared/theme-toggle/theme-toggle';
import { ThemeService } from './theme.service';

describe('tema', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  });

  afterEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('usa el tema claro por defecto', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(document.documentElement.hasAttribute('data-theme')).toBeFalse();
  });

  it('cambia a oscuro, lo persiste y vuelve a claro', () => {
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    service.toggle();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.hasAttribute('data-theme')).toBeFalse();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('el interruptor expone role switch y su estado a lectores de pantalla', () => {
    const fixture = TestBed.createComponent(ThemeToggle);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('role')).toBe('switch');
    expect(button.getAttribute('aria-checked')).toBe('false');
    TestBed.inject(ThemeService).toggle();
    fixture.detectChanges();
    expect(button.getAttribute('aria-checked')).toBe('true');
  });
});
