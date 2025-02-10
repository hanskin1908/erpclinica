import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../app/core/services/usuarios.service';
import { Usuario } from '../../../../app/core/models/usuario.model';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../../../app/core/services/role.service';
import { Role } from '../../../../app/core/models/role.model';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="usuarios-layout">
      <div class="usuarios-container">
        <mat-card class="main-card">
          <mat-card-header>
            <div class="header-content">
              <div class="title-section">
                <h1>Gestión de Usuarios</h1>
                <p class="subtitle">Administra los usuarios del sistema</p>
              </div>
              <div class="actions-section">
                <mat-form-field class="search-field" appearance="outline">
                  <mat-label>Buscar usuario</mat-label>
                  <input matInput (keyup)="applyFilter($event)" placeholder="Nombre, ID...">
                  <mat-icon matSuffix>search</mat-icon>
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="crearUsuario()" class="create-button">
                  <mat-icon>person_add</mat-icon>
                  Nuevo Usuario
                </button>
              </div>
            </div>
          </mat-card-header>

          <mat-card-content>
            <div class="loading-shade" *ngIf="isLoading">
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </div>

            <div class="table-container mat-elevation-z0">
              <table mat-table [dataSource]="usuarios" class="usuarios-table">
                <!-- ID Column -->
                <ng-container matColumnDef="idUsuario">
                  <th mat-header-cell *matHeaderCellDef> ID </th>
                  <td mat-cell *matCellDef="let usuario"> {{ usuario.idUsuario }} </td>
                </ng-container>

                <!-- Nombre Column -->
                <ng-container matColumnDef="nombreUsuario">
                  <th mat-header-cell *matHeaderCellDef> Nombre de Usuario </th>
                  <td mat-cell *matCellDef="let usuario"> {{ usuario.nombreUsuario }} </td>
                </ng-container>

                <!-- Acciones Column -->
                <ng-container matColumnDef="acciones">
                  <th mat-header-cell *matHeaderCellDef class="actions-column"> Acciones </th>
                  <td mat-cell *matCellDef="let usuario" class="actions-column">
                    <button mat-icon-button color="primary" (click)="editarUsuario(usuario)" matTooltip="Editar usuario">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="confirmarEliminar(usuario)" matTooltip="Eliminar usuario">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell" colspan="3">No se encontraron usuarios</td>
                </tr>
              </table>
            </div>

            <!-- Formulario para Crear/Editar Usuario -->
            <div *ngIf="showForm" class="form-container">
              <h3>{{ isEditMode ? 'Editar Usuario' : 'Crear Usuario' }}</h3>
              <form [formGroup]="userForm" (ngSubmit)="saveUser()">
                <!-- Nombre de Usuario -->
                <mat-form-field appearance="outline">
                  <mat-label>Nombre de Usuario</mat-label>
                  <input matInput placeholder="Ingrese nombre de usuario" formControlName="nombreUsuario">
                </mat-form-field>

                <!-- Contraseña -->
                <mat-form-field appearance="outline">
                  <mat-label>Contraseña</mat-label>
                  <input matInput type="password" placeholder="Ingrese contraseña" formControlName="password">
                </mat-form-field>

                <!-- Selección de Rol -->
                <mat-form-field appearance="outline">
                  <mat-label>Seleccionar Rol</mat-label>
                  <mat-select formControlName="selectedRole">
                    <mat-option *ngFor="let rol of availableRoles" [value]="rol.idRol">
                      {{ rol.nombreRol }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
                <button mat-raised-button color="accent" type="button" (click)="agregarRol()">Agregar Rol</button>

                <!-- Mostrar Roles Seleccionados -->
                <div class="selected-roles" *ngIf="selectedRoleIds.length > 0">
                  <p>Roles seleccionados:</p>
                  <div *ngFor="let roleId of selectedRoleIds" class="role-chip">
                    {{ getRoleName(roleId) }}
                    <button mat-icon-button color="warn" (click)="removeRol(roleId)">
                      <mat-icon>close</mat-icon>
                    </button>
                  </div>
                </div>

                <div class="form-actions">
                  <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid">
                    {{ isEditMode ? 'Actualizar' : 'Crear' }}
                  </button>
                  <button mat-raised-button type="button" (click)="cancelarForm()">Cancelar</button>
                </div>
              </form>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    /* Estilos (como antes) */
    .usuarios-layout {
      min-height: calc(100vh - 64px);
      background-color: #f5f5f5;
      margin-top: 84px;
      padding: 1.5rem;
    }
    .usuarios-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .main-card {
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .header-content {
      width: 100%;
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
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
      padding: 0 1.5rem;
    }
    .table-container {
      position: relative;
      min-height: 200px;
      overflow: auto;
      margin-top: 1rem;
    }
    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: rgba(255, 255, 255, 0.8);
    }
    .usuarios-table {
      width: 100%;
    }
    .actions-column {
      width: 120px;
      text-align: center;
    }
    .form-container {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #fff;
      max-width: 400px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .selected-roles {
      margin-top: 10px;
    }
    .role-chip {
      display: inline-block;
      background: #e0e0e0;
      padding: 5px 10px;
      margin-right: 5px;
      border-radius: 16px;
      vertical-align: middle;
    }
    .role-chip button {
      vertical-align: middle;
    }
  `]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['idUsuario', 'nombreUsuario', 'acciones'];
  usuarios: Usuario[] = [];
  allUsuarios: Usuario[] = [];
  isLoading = false;
  showForm = false;
  isEditMode = false;
  userForm: FormGroup;
  selectedUser: Usuario | null = null;
  availableRoles: Role[] = [];
  selectedRoleIds: number[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required],
      selectedRole: ['']
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.allUsuarios = data;
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mostrarMensaje('Error al cargar usuarios', 'error');
      }
    });
  }

  cargarRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (data) => this.availableRoles = data,
      error: (err) => console.error('Error al cargar roles:', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.usuarios = this.allUsuarios.filter(u =>
      u.nombreUsuario.toLowerCase().includes(filterValue) ||
      u.idUsuario.toString().includes(filterValue)
    );
  }

  crearUsuario(): void {
    this.isEditMode = false;
    this.selectedUser = null;
    this.selectedRoleIds = [];
    this.userForm.reset();
    this.showForm = true;
  }

  editarUsuario(usuario: Usuario): void {
    this.isEditMode = true;
    this.selectedUser = usuario;
    // Suponiendo que el objeto usuario tiene la propiedad "roles" como arreglo de Role
    this.selectedRoleIds = usuario.idsRoles ? usuario.idsRoles : [];
    this.userForm.patchValue({
      nombreUsuario: usuario.nombreUsuario,
      password: '' // Dejamos el campo vacío en edición para no forzar cambio de contraseña
    });
    this.showForm = true;
  }

  agregarRol(): void {
    const selectedRoleId = this.userForm.get('selectedRole')?.value;
    if (selectedRoleId && !this.selectedRoleIds.includes(selectedRoleId)) {
      this.selectedRoleIds.push(selectedRoleId);
    }
    this.userForm.get('selectedRole')?.reset();
  }

  /* removeRol(roleId: number): void {
    this.selectedRoleIds = this.selectedRoleIds.filter(r => r !== selectedRoleId);
    // Alternativamente: this.selectedRoleIds = this.selectedRoleIds.filter(id => id !== roleId);
  }
 */
  // Nota: La función removeRol debe usar el parámetro roleId
  removeRol(roleId: number): void {
    this.selectedRoleIds = this.selectedRoleIds.filter(id => id !== roleId);
  } 

  saveUser(): void {
    if (this.userForm.invalid) return;
    const formValue = this.userForm.value;
    if (this.isEditMode && this.selectedUser) {
      const updatedUser: Usuario = {
        ...this.selectedUser,
        nombreUsuario: formValue.nombreUsuario,
        // Si se ingresa una nueva contraseña, se actualiza; de lo contrario, se deja sin modificar
        contrasena: formValue.password ? formValue.password : undefined,
        idsRoles: this.selectedRoleIds
      };
      this.usuarioService.updateUsuario(updatedUser).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.showForm = false;
          this.mostrarMensaje('Usuario actualizado correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          this.mostrarMensaje('Error al actualizar usuario', 'error');
        }
      });
    } else {
      const newUser: Usuario = {
        idUsuario: 0,
        nombreUsuario: formValue.nombreUsuario,
        contrasena: formValue.password,
        idsRoles: this.selectedRoleIds
      };
      this.usuarioService.createUsuario(newUser).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.showForm = false;
          this.mostrarMensaje('Usuario creado correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          this.mostrarMensaje('Error al crear usuario', 'error');
        }
      });
    }
  }

  cancelarForm(): void {
    this.showForm = false;
  }

  confirmarEliminar(usuario: Usuario): void {
    if (confirm(`¿Está seguro de eliminar al usuario ${usuario.nombreUsuario}?`)) {
      this.eliminarUsuario(usuario.idUsuario);
    }
  }

  eliminarUsuario(id: number): void {
    this.isLoading = true;
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.mostrarMensaje('Usuario eliminado correctamente', 'success');
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mostrarMensaje('Error al eliminar usuario', 'error');
      }
    });
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: tipo === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }

  getRoleName(roleId: number): string {
    const role = this.availableRoles.find(r => r.idRol === roleId);
    return role ? role.nombreRol : '';
  }
}