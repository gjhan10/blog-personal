import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SITE } from '../../core/site.config';
import { SoftsparkBand } from './softspark-band';

describe('SoftsparkBand', () => {
  it('enlaza a la URL configurada de SoftSpark en una pestaña nueva', () => {
    TestBed.configureTestingModule({ imports: [SoftsparkBand], providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(SoftsparkBand);
    fixture.detectChanges();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a')!;
    expect(link.getAttribute('href')).toBe(SITE.softsparkUrl);
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener');
  });
});
