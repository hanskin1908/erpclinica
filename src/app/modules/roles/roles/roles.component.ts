import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../../core/models/role.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-roles',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="roles-layout">
      <div class="roles-container">
        <mat-card class="main-card">
          <mat-card-header>
            <div class="header-content">
              <div class="title-section">
                <h1>Gestión de Roles</h1>
                <p class="subtitle">Administra los roles del sistema</p>
              </div>
              
              <button 
                mat-raised-button 
                color="primary" 
                (click)="crearNuevo()"
                class="create-button">
                <mat-icon>add</mat-icon>
                Nuevo Rol
              </button>
            </div>
          </mat-card-header>

          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="roles" class="roles-table">
                <!-- ID Column -->
                <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef> ID </th>
                  <td mat-cell *matCellDef="let rol"> {{rol.idRol}} </td>
                </ng-container>

                <!-- Nombre Column -->
                <ng-container matColumnDef="nombreRol">
                  <th mat-header-cell *matHeaderCellDef> Nombre de Rol </th>
                  <td mat-cell *matCellDef="let rol"> {{rol.nombreRol}} </td>
                </ng-container>

                <!-- Acciones Column -->
                <ng-container matColumnDef="acciones">
                  <th mat-header-cell *matHeaderCellDef> Acciones </th>
                  <td mat-cell *matCellDef="let rol">
                    <button 
                      mat-icon-button 
                      color="primary"
                      (click)="editar(rol)"
                      matTooltip="Editar rol">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button 
                      mat-icon-button 
                      color="warn"
                      (click)="eliminar(rol.idRol)"
                      matTooltip="Eliminar rol">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="['id', 'nombreRol', 'acciones']"></tr>
                <tr mat-row *matRowDef="let row; columns: ['id', 'nombreRol', 'acciones'];"></tr>
              </table>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Form Card -->
        <mat-card *ngIf="showForm" class="form-card">
          <mat-card-header>
            <mat-card-title>{{ editMode ? 'Editar Rol' : 'Crear Nuevo Rol' }}</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="roleForm" class="role-form">
              <mat-form-field appearance="outline">
                <mat-label>Nombre del Rol</mat-label>
                <input matInput placeholder="Ingrese el nombre del rol" formControlName="nombreRol">
                <mat-error *ngIf="roleForm.get('nombreRol')?.hasError('required')">
                  El nombre del rol es requerido
                </mat-error>
              </mat-form-field>
            </form>
          </mat-card-content>

          <mat-card-actions align="end">
            <button mat-button (click)="cancel()">
              Cancelar
            </button>
            <button 
              mat-raised-button 
              color="primary"
              (click)="saveRole()"
              [disabled]="roleForm.invalid">
              {{ editMode ? 'Actualizar' : 'Crear' }}
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .roles-layout {
      min-height: calc(100vh - 64px);
      background-color: #f5f5f5;
      margin-top: 84px;
      padding: 1.5rem;
    }

    .roles-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .main-card {
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      margin-bottom: 1.5rem;
    }

    .header-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
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

    .create-button {
      height: 48px;
    }

    .table-container {
      margin-top: 1rem;
      overflow: auto;
    }

    .roles-table {
      width: 100%;
    }

    ::ng-deep .mat-mdc-table {
      background: transparent;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .mat-column-acciones {
      width: 120px;
      text-align: center;
    }

    .form-card {
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      margin-top: 1.5rem;
    }

    .role-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }

    mat-form-field {
      width: 100%;
    }

    mat-card-actions {
      padding: 1rem;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .roles-layout {
        margin-top: 72px;
        padding: 1rem;
      }

      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .title-section h1 {
        font-size: 1.5rem;
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
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  showForm = false;
  editMode = false;
  roleForm: FormGroup;
  currentRole: Role | null = null;

  constructor(private roleService: RoleService, private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      nombreRol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error('Error al cargar roles:', err)
    });
  }

  crearNuevo(): void {
    this.editMode = false;
    this.roleForm.reset();
    this.showForm = true;
  }

  editar(rol: Role): void {
    this.editMode = true;
    this.roleForm.patchValue({ nombreRol: rol.nombreRol });
    this.currentRole = rol; // Guardamos el rol a editar
    this.showForm = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este rol?')) {
      this.roleService.deleteRole(id).subscribe({
        next: () => this.loadRoles(),
        error: (err) => console.error('Error al eliminar rol:', err)
      });
    }
  }

  saveRole(): void {
    if (this.roleForm.invalid) return;
  
    const roleData: Role = {
      idRol: this.editMode && this.currentRole ? this.currentRole.idRol : 0,
      nombreRol: this.roleForm.value.nombreRol
    };
  
    if (this.editMode) {
      this.roleService.updateRole(roleData).subscribe({
        next: () => {
          this.loadRoles();
          this.showForm = false;
          this.currentRole = null; // Limpiar el rol actual después de editar
        },
        error: (err) => console.error('Error al actualizar rol:', err)
      });
    } else {
      this.roleService.createRole(roleData).subscribe({
        next: () => {
          this.loadRoles();
          this.showForm = false;
        },
        error: (err) => console.error('Error al crear rol:', err)
      });
    }
  }

  cancel(): void {
    this.showForm = false;
  }
}
