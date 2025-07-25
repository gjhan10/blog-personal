import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { SocialSidebar } from './components/social-sidebar/social-sidebar';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Footer } from './components/footer/footer';
import { Projects } from './components/projects/projects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,SocialSidebar, Home,About, Footer, Projects],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-personal');
}
