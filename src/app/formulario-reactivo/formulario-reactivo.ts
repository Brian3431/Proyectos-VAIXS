import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-reactivo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-reactivo.html',
  styleUrl: './formulario-reactivo.scss'
})
export class FormularioReactivoComponent {

  formulario: FormGroup;
  pedidos: any[] = [];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombreCliente: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8,9}$')]],
      detalles: ['']
    });

    this.cargarPedidos();
  }

  cargarPedidos() {
    const data = localStorage.getItem('pedidos');
    if (data) {
      this.pedidos = JSON.parse(data);
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.pedidos.push(this.formulario.value);
      localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
      this.formulario.reset({ cantidad: 1 });
    }
  }

  eliminarPedido(index: number) {
    this.pedidos.splice(index, 1);
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
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