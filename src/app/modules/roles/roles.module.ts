import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from '../roles/roles/roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    
    RolesRoutingModule,
    RolesComponent,
    ReactiveFormsModule 
  ]
})
export class RolesModule { }
