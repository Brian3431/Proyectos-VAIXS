import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioReactivoComponent } from "./formulario-reactivo/formulario-reactivo";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioReactivoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('temp-project');
}
