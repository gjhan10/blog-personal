import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { SocialSidebar } from './components/social-sidebar/social-sidebar';

const COURSE_ROUTES = ['/curso-java', '/springboot', '/webflux', '/design-patterns', '/microservices'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, SocialSidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);

  protected readonly loading = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError),
      map((e) => e instanceof NavigationStart),
    ),
    { initialValue: false },
  );

  protected readonly isContact = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.split(/[?#]/)[0] === '/contacto'),
    ),
    { initialValue: false },
  );

  protected readonly isCourse = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => COURSE_ROUTES.some((r) => (e as NavigationEnd).urlAfterRedirects.startsWith(r))),
    ),
    { initialValue: false },
  );
}
