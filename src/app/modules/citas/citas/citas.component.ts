import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../core/services/cita.service';
import { Cita } from '../../../core/models/cita.model';
import { Router } from '@angular/router';
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
  selector: 'app-citas',
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
        <h2>Listado de Citas</h2>
        <button mat-raised-button color="primary" (click)="crearCita()">Nueva Cita</button>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="citas">
          <!-- ID Column -->
          <ng-container matColumnDef="idCita">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let cita"> {{ cita.idCita }} </td>
          </ng-container>
          <!-- Fecha Column -->
          <ng-container matColumnDef="fechaHora">
            <th mat-header-cell *matHeaderCellDef> Fecha y Hora </th>
            <td mat-cell *matCellDef="let cita"> {{ cita.fechaHora | date:'short' }} </td>
          </ng-container>
          <!-- Estado Column -->
          <ng-container matColumnDef="estado">
            <th mat-header-cell *matHeaderCellDef> Estado </th>
            <td mat-cell *matCellDef="let cita"> {{ cita.estado }} </td>
          </ng-container>
          <!-- Acciones Column -->
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let cita">
              <button mat-button color="primary" (click)="editarCita(cita)">Editar</button>
              <button mat-button color="warn" (click)="cancelarCita(cita.idCita)">Cancelar</button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { margin: 20px; }
    mat-card-header { display: flex; justify-content: space-between; align-items: center; }
    table { width: 100%; }
  `]
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  displayedColumns: string[] = ['idCita', 'fechaHora', 'estado', 'acciones'];

  constructor(private citaService: CitaService, private router: Router) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error(err)
    });
  }

  crearCita(): void {
    this.router.navigate(['/citas/detalle', 0]); // 0 para indicar creación
  }

  editarCita(cita: Cita): void {
    this.router.navigate(['/citas/detalle', cita.idCita]);
  }

  cancelarCita(id: number): void {
    if (confirm('¿Está seguro de cancelar esta cita?')) {
      this.citaService.deleteCita(id).subscribe({
        next: () => this.cargarCitas(),
        error: (err) => console.error(err)
      });
    }
  }
}
