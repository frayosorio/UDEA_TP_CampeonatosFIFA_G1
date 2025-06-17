import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CampeonatosFIFA';
}
