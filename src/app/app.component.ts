import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true, // Standalone component
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet/>
    </main>
   
  `,
  styles: [
    `
    main{
      padding-inline:16 px;
    }
    `
  ],
})
export class AppComponent {
  title = 'first-ng-app';
}
