import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HceRoutingModule } from './hce-routing.module';
import { HceComponent } from '../hce/hce/hce.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HceRoutingModule
  ]
})
export class HceModule { }
