import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb1 } from './ptb1/ptb1';
import { FormsModule } from '@angular/forms';
import { Ptb2 } from './ptb2/ptb2';
import { Ex10 } from './ex10/ex10';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, About, Contact, Learnbinding, Ptb1, FormsModule, Ptb2, Ex10],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
