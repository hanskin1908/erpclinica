import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { HceService } from '../../../core/services/hce.service';
import { Hce } from '../../../core/models/hce.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-hce',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <h2>Historia Clínica Electrónica</h2>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="hceForm" (ngSubmit)="saveHce()">
          <mat-form-field appearance="outline">
            <mat-label>Diagnóstico</mat-label>
            <input matInput formControlName="diagnostico">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Tratamiento</mat-label>
            <input matInput formControlName="tratamiento">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Observaciones</mat-label>
            <textarea matInput formControlName="observaciones"></textarea>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="hceForm.invalid">
            {{ isEditMode ? 'Actualizar' : 'Crear' }}
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { margin: 20px; }
    form { display: flex; flex-direction: column; gap: 15px; }
  `]
})
export class HceComponent implements OnInit {
  hceForm: FormGroup;
  isEditMode = false;
  idPaciente: number = 0; // Se obtiene de algún servicio o token

  constructor(private fb: FormBuilder, private hceService: HceService, private route: ActivatedRoute) {
    this.hceForm = this.fb.group({
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    // En un escenario real, el idPaciente se obtiene del token o de un servicio de usuario
    this.idPaciente = 1;
    // Opcional: Si se quiere cargar la historia clínica existente
    this.hceService.getHceByPaciente(this.idPaciente).subscribe({
      next: (hce: Hce) => {
        if (hce) {
          this.isEditMode = true;
          this.hceForm.patchValue({
            diagnostico: hce.diagnostico,
            tratamiento: hce.tratamiento,
            observaciones: hce.observaciones
          });
        }
      },
      error: err => console.error(err)
    });
  }

  saveHce(): void {
    if (this.hceForm.invalid) return;
    const formValue = this.hceForm.value;
    const hceData: Hce = {
      idHistoriaClinica: this.isEditMode ? 1 : 0, // En edición, se debería usar el id real
      idPaciente: this.idPaciente,
      fechaRegistro: new Date(),
      diagnostico: formValue.diagnostico,
      tratamiento: formValue.tratamiento,
      observaciones: formValue.observaciones
    };

    if (this.isEditMode) {
      this.hceService.updateHce(hceData).subscribe({
        next: () => alert('Historia actualizada correctamente'),
        error: err => console.error(err)
      });
    } else {
      this.hceService.createHce(hceData).subscribe({
        next: () => alert('Historia creada correctamente'),
        error: err => console.error(err)
      });
    }
  }
}
