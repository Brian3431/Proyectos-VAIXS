import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-dinamico',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-dinamico.html',
  styleUrl: './formulario-dinamico.scss'
})
export class FormularioDinamicoComponent {

  formulario: FormGroup;
  listaTemporal: any[] = [];
  preview: any = {};
  mensajeExito:string = '';

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombreCliente: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ]
      ],
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      direccion: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ#., ]+$')
          ]
        ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8,9}$')]],
      detalles: ['']
    });
  }

  agregarPedido() {
    if (this.formulario.valid) {
      this.listaTemporal.push({ ...this.formulario.value });
      this.formulario.reset({ cantidad: 1 });
      this.preview = {};
      this.mensajeExito = 'Pedido agregado correctamente';
      setTimeout(() => this.mensajeExito = '', 3000);
    }
  }

  eliminarPedido(index: number) {
    this.listaTemporal.splice(index, 1);
  }

  guardarTodo() {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const todosPedidos = [...pedidosGuardados, ...this.listaTemporal];
    localStorage.setItem('pedidos', JSON.stringify(todosPedidos));
    this.listaTemporal = [];
    this.mensajeExito = 'Pedidos guardados correctamente';
    setTimeout(() => this.mensajeExito = '', 3000);
  }


  soloLetras(event: KeyboardEvent) {
    const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!patron.test(event.key)) {
      event.preventDefault();
    }
  }

  soloNumeros(event: KeyboardEvent) {
    const patron = /^[0-9]$/;
    if (!patron.test(event.key)) {
      event.preventDefault();
    }
  }
}