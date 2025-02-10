import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../../../../app/core/services/paciente.service';
import { Paciente } from '../../../../app/core/models/paciente.model';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  selector: 'app-pacientes',
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="pacientes-layout">
      <div class="pacientes-container">
        <mat-card class="main-card">
          <mat-card-header>
            <div class="header-content">
              <div class="title-section">
                <h1>Gestión de Pacientes</h1>
                <p class="subtitle">Administra la información de tus pacientes</p>
              </div>
              
              <div class="actions-section">
                <mat-form-field class="search-field" appearance="outline">
                  <mat-label>Buscar paciente</mat-label>
                  <input matInput (keyup)="applyFilter($event)" placeholder="Nombre, ID..." #input>
                  <mat-icon matSuffix>search</mat-icon>
                </mat-form-field>

                <button 
                  mat-raised-button 
                  color="primary" 
                  (click)="crearPaciente()"
                  class="create-button">
                  <mat-icon>add</mat-icon>
                  Nuevo Paciente
                </button>
              </div>
            </div>
          </mat-card-header>

          <mat-card-content>
            <div class="loading-shade" *ngIf="isLoading">
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </div>

            <div class="table-container">
              <table mat-table [dataSource]="dataSource" matSort class="patients-table">
                <!-- ID Column -->
                <ng-container matColumnDef="idPaciente">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
                  <td mat-cell *matCellDef="let paciente"> {{paciente.idPaciente}} </td>
                </ng-container>

                <!-- Nombre Column -->
                <ng-container matColumnDef="nombre">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Nombre </th>
                  <td mat-cell *matCellDef="let paciente"> {{paciente.nombre}} </td>
                </ng-container>

                <!-- Fecha Nacimiento Column -->
                <ng-container matColumnDef="fechaNacimiento">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Fecha de Nacimiento </th>
                  <td mat-cell *matCellDef="let paciente"> 
                    {{paciente.fechaNacimiento | date:'dd/MM/yyyy'}} 
                  </td>
                </ng-container>

                <!-- Acciones Column -->
                <ng-container matColumnDef="acciones">
                  <th mat-header-cell *matHeaderCellDef> Acciones </th>
                  <td mat-cell *matCellDef="let paciente">
                    <button 
                      mat-icon-button 
                      color="primary"
                      (click)="editarPaciente(paciente)"
                      matTooltip="Editar paciente">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button 
                      mat-icon-button 
                      color="warn"
                      (click)="confirmarEliminar(paciente)"
                      matTooltip="Eliminar paciente">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

                <!-- Row shown when no matching data -->
                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell" colspan="4">
                    No se encontraron pacientes que coincidan con: "{{input.value}}"
                  </td>
                </tr>
              </table>

              <mat-paginator 
                [pageSizeOptions]="[5, 10, 25, 100]"
                aria-label="Seleccionar página de pacientes">
              </mat-paginator>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .pacientes-layout {
      min-height: calc(100vh - 64px);
      background-color: #f5f5f5;
      margin-top: 84px;
      padding: 1.5rem;
    }

    .pacientes-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .main-card {
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .header-content {
      width: 100%;
      padding: 1rem 0;
    }

    .title-section {
      margin-bottom: 1.5rem;
    }

    .title-section h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 500;
      color: #333;
    }

    .subtitle {
      margin: 0.5rem 0 0;
      color: #666;
    }

    .actions-section {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-field {
      flex: 1;
      min-width: 200px;
    }

    .create-button {
      height: 48px;
    }

    .table-container {
      position: relative;
      min-height: 200px;
      overflow: auto;
    }

    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: rgba(255, 255, 255, 0.8);
    }

    .patients-table {
      width: 100%;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .mat-column-acciones {
      width: 120px;
      text-align: center;
    }

    .mat-mdc-no-data-row {
      padding: 1rem;
      text-align: center;
      color: #666;
    }

    @media (max-width: 768px) {
      .pacientes-layout {
        margin-top: 72px;
        padding: 1rem;
      }

      .title-section h1 {
        font-size: 1.5rem;
      }

      .actions-section {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field {
        width: 100%;
      }

      .create-button {
        width: 100%;
      }

      .mat-column-acciones {
        width: 100px;
      }
    }
  `]
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = ['idPaciente', 'nombre', 'fechaNacimiento', 'acciones'];
  dataSource: any;
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.isLoading = true;
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mostrarMensaje('Error al cargar los pacientes', 'error');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearPaciente() {
    // Implementar lógica para crear paciente
    console.log('Crear paciente');
  }

  editarPaciente(paciente: Paciente) {
    // Implementar lógica para editar paciente
    console.log('Editar paciente', paciente);
  }

  confirmarEliminar(paciente: Paciente) {
    // Aquí podrías mostrar un diálogo de confirmación
    if (confirm(`¿Está seguro de eliminar al paciente ${paciente.nombre}?`)) {
      this.eliminarPaciente(paciente.idPaciente);
    }
  }

  eliminarPaciente(id: number) {
    this.isLoading = true;
    this.pacienteService.deletePaciente(id).subscribe({
      next: () => {
        this.cargarPacientes();
        this.mostrarMensaje('Paciente eliminado correctamente', 'success');
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mostrarMensaje('Error al eliminar el paciente', 'error');
      }
    });
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: tipo === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}