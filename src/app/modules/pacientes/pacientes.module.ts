import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacientesRoutingModule } from './pacientes-routing.module'; // ✅ Asegúrate de importar correctamente

@NgModule({
  declarations: [], // ✅ Declara el componente
  imports: [
    CommonModule,
    PacientesRoutingModule ,
    PacientesComponent// ✅ Importa el módulo de enrutamiento
  ]
})
export class PacientesModule {} // ✅ Debe exportarse con el nombre correcto

