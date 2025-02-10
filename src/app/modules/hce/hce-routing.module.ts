import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HceComponent } from '../hce/hce/hce.component';

const routes: Routes = [
  { path: '', component: HceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HceRoutingModule { }
