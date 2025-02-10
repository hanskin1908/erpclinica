import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from '../citas/citas/citas.component';
import { CitaDetailComponent } from '../citas/cita-detail/cita-detail.component';

const routes: Routes = [
  { path: '', component: CitasComponent },
  { path: 'detalle/:id', component: CitaDetailComponent } // Para edición; para creación, puede ser 'detalle'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
