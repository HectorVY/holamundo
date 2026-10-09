import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
