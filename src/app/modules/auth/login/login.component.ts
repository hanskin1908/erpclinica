import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>
            <h1>Iniciar Sesión</h1>
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="login()" class="login-form">
            <mat-form-field appearance="outline">
              <mat-label>Usuario</mat-label>
              <input 
                matInput 
                formControlName="nombreUsuario" 
                placeholder="Ingrese su usuario"
                [attr.aria-label]="'Usuario'"
                autocomplete="username">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="loginForm.get('nombreUsuario')?.errors?.['required']">
                El usuario es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Contraseña</mat-label>
              <input 
                matInput 
                [type]="hidePassword() ? 'password' : 'text'"
                formControlName="contrasena"
                placeholder="Ingrese su contraseña"
                [attr.aria-label]="'Contraseña'"
                autocomplete="current-password">
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="togglePasswordVisibility()"
                [attr.aria-label]="'Mostrar contraseña'">
                <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('contrasena')?.errors?.['required']">
                La contraseña es requerida
              </mat-error>
              <mat-error *ngIf="loginForm.get('contrasena')?.errors?.['minlength']">
                La contraseña debe tener al menos 6 caracteres
              </mat-error>
            </mat-form-field>

            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="loginForm.invalid || isLoading()"
              class="login-button">
              <mat-spinner 
                diameter="20" 
                *ngIf="isLoading()"
                class="login-spinner">
              </mat-spinner>
              <span *ngIf="!isLoading()">Ingresar</span>
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    mat-form-field {
      width: 100%;
    }

    .login-button {
      height: 48px;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
    }

    .login-spinner {
      margin: 0 auto;
    }

    mat-card-title h1 {
      margin: 0;
      font-size: 2rem;
      color: #333;
      text-align: center;
    }

    @media (max-width: 600px) {
      .login-card {
        padding: 1rem;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  hidePassword = signal(true);
  isLoading = signal(false);

  loginForm: FormGroup = this.fb.group({
    nombreUsuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePasswordVisibility(): void {
    this.hidePassword.update(value => !value);
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('idusuario', response.idUsuario);
          this.router.navigate(['/dashboard']);
          this.snackBar.open('¡Bienvenido!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          this.isLoading.set(false);
          this.snackBar.open(
            error?.error?.message || 'Error al iniciar sesión',
            'Cerrar',
            {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            }
          );
        },
        complete: () => this.isLoading.set(false)
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
