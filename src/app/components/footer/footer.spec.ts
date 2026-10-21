import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SITE } from '../../core/site.config';
import { Footer } from './footer';

describe('Footer', () => {
  it('enlaza el correo real, expone el ancla de contacto y no deja placeholders', async () => {
    await TestBed.configureTestingModule({ imports: [Footer], providers: [provideZonelessChangeDetection()] }).compileComponents();
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.innerHTML).toContain(`mailto:${SITE.email}`);
    expect(el.innerHTML).not.toContain('ejemplo.com');
    expect(el.querySelector('footer#contacto')).toBeTruthy();
  });
});
