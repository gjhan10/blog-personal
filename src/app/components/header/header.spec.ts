import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  it('abre y cierra el menú móvil y expone el estado a lectores de pantalla', async () => {
    await TestBed.configureTestingModule({ imports: [Header], providers: [provideZonelessChangeDetection(), provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button.menu-btn') as HTMLButtonElement;
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    btn.click();
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });
});
