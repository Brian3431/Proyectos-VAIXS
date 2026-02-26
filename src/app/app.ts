import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioReactivoComponent } from "./formulario-reactivo/formulario-reactivo";
import { FormularioDinamicoComponent } from "./formulario-dinamico/formulario-dinamico";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioReactivoComponent, FormularioDinamicoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Practicas-VAIXS');
}