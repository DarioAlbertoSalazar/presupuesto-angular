import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/service/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css'],
})
export class IngresarGastoComponent {
  nombreGasto: string;
  cantidad: number;
  fomularioIncorrecto: boolean;
  textIncorrecto: string;

  constructor(private presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.fomularioIncorrecto = false;
    this.textIncorrecto = 'Nombre gasto o cantidad incorrecta';
  }

  agregarGasto() {

    if(this.cantidad > this.presupuestoService.restante) {
      this.fomularioIncorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada es mayor al restante'
      return
    }
    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.fomularioIncorrecto = true;
      this.textIncorrecto = 'Nombre gasto o cantidad incorrecta';
    } else {
      // crear el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }
      //enviamos el objeto a los suscriptores
      this.presupuestoService.agregarGasto(GASTO)
      //resetemos formulario
      this.fomularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
