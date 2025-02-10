import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../../../core/services/cita.service';
import { AgendaService } from '../../../core/services/agenda.service';
import { Cita } from '../../../core/models/cita.model';
import { AgendaMedica } from '../../..//core/models/agenda-medica.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-cita-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <h2>{{ isEditMode ? 'Editar Cita' : 'Programar Cita' }}</h2>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="citaForm" (ngSubmit)="saveCita()">
          <mat-form-field appearance="outline">
            <mat-label>Motivo de Consulta</mat-label>
            <input matInput placeholder="Ingrese motivo de la consulta" formControlName="motivo">
          </mat-form-field>

          <!-- Visualización de Agenda Médica (obligatoria) -->
          <div class="agenda-section" *ngIf="agendaMedica && agendaMedica.length > 0">
            <h3>Agenda del Médico</h3>
            <mat-form-field appearance="outline">
              <mat-label>Seleccionar Turno</mat-label>
              <mat-select formControlName="turnoSeleccionado" required>
                <mat-option *ngFor="let turno of agendaMedica" [value]="turno">
                  {{ turno.diaSemana }} - {{ turno.horaInicio }} a {{ turno.horaFin }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div *ngIf="agendaMedica && agendaMedica.length === 0">
            <p>No hay turnos disponibles para este médico.</p>
          </div>

          <div class="form-actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="citaForm.invalid">
              {{ isEditMode ? 'Actualizar' : 'Programar' }}
            </button>
            <button mat-raised-button type="button" (click)="cancelar()">Cancelar</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { margin: 20px; }
    .form-actions { margin-top: 20px; display: flex; gap: 10px; }
    .agenda-section { margin: 20px 0; }
  `]
})
export class CitaDetailComponent implements OnInit {
  citaForm: FormGroup;
  isEditMode = false;
  citaId: number = 0;
  agendaMedica: AgendaMedica[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private agendaService: AgendaService
  ) {
    this.citaForm = this.fb.group({
      motivo: ['', Validators.required],
      turnoSeleccionado: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la cita desde la URL: si es 0, es creación
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.citaId = idParam ? +idParam : 0;
      this.isEditMode = this.citaId > 0;
      // Cargar agenda médica del médico (en un caso real, se debe conocer el id del médico)
      this.cargarAgendaMedica(1); // Aquí usamos 1 como ejemplo
      if (this.isEditMode) {
        this.cargarCita(this.citaId);
      }
    });
  }

  cargarAgendaMedica(medicoId: number): void {
    this.agendaService.getAgendaByMedico(medicoId).subscribe({
      next: data => this.agendaMedica = data,
      error: err => console.error(err)
    });
  }

  cargarCita(id: number): void {
    this.citaService.getCitaById(id).subscribe({
      next: (cita: Cita) => {
        // Se asume que cita tiene 'motivo' y algún dato para el turno
        this.citaForm.patchValue({
          motivo: cita.motivo,
          turnoSeleccionado: cita.fechaHora // O transformar según corresponda
        });
      },
      error: err => console.error(err)
    });
  }

  saveCita(): void {
    if (this.citaForm.invalid) return;
    const formValue = this.citaForm.value;
    // Extraer turnoSeleccionado: en este ejemplo, se asume que es un objeto AgendaMedica y
    // que de allí se obtiene la fecha/hora o se formatea de la forma necesaria.
    const citaData: Cita = {
      idCita: this.citaId,
      idPaciente: 1, // Se debe conocer el id del paciente (por ejemplo, del token o seleccionado)
      idMedico: 1,   // Se debe conocer el id del médico seleccionado
      fechaHora: formValue.turnoSeleccionado ? new Date(formValue.turnoSeleccionado.horaInicio) : new Date(),
      estado: 'Pendiente',
      motivo: formValue.motivo,
    };

    if (this.isEditMode) {
      this.citaService.updateCita(citaData).subscribe({
        next: () => this.router.navigate(['/citas']),
        error: err => console.error(err)
      });
    } else {
      this.citaService.createCita(citaData).subscribe({
        next: () => this.router.navigate(['/citas']),
        error: err => console.error(err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/citas']);
  }
}
