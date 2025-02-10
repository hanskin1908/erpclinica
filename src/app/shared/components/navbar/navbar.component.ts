import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../core/services/menu.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar class="navbar">
      <div class="navbar-brand">
        <button 
          mat-icon-button 
          class="menu-button"
          (click)="sidenav.toggle()"
          aria-label="Toggle menu">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="brand-text">Mi Aplicación</span>
      </div>

      <div class="nav-links">
        <ng-container *ngFor="let item of menuItems">
          <a 
            mat-button 
            [routerLink]="item.url"
            routerLinkActive="active-link"
            class="nav-link">
            <mat-icon class="nav-icon">{{getIconForItem(item.titulo)}}</mat-icon>
            {{ item.titulo }}
          </a>
        </ng-container>
      </div>

      <div class="navbar-actions">
        <button 
          mat-icon-button 
          [matMenuTriggerFor]="userMenu"
          aria-label="User menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Cerrar Sesión</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <div class="sidenav-container">
      <mat-sidenav-container>
        <mat-sidenav #sidenav mode="over" class="sidenav">
          <mat-nav-list>
            <ng-container *ngFor="let item of menuItems">
              <a 
                mat-list-item 
                [routerLink]="item.url"
                routerLinkActive="active-link"
                (click)="sidenav.close()">
                <mat-icon class="nav-icon">{{getIconForItem(item.titulo)}}</mat-icon>
                <span class="nav-text">{{ item.titulo }}</span>
              </a>
            </ng-container>
            <mat-divider></mat-divider>
            <a mat-list-item (click)="logout(); sidenav.close()">
              <mat-icon>exit_to_app</mat-icon>
              <span class="nav-text">Cerrar Sesión</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <ng-content></ng-content>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .navbar {
      height: 64px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      background: #1976d2;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-text {
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: white;
      opacity: 0.9;
      transition: all 0.2s ease;
      border-radius: 4px;
      padding: 4px 12px;

      &:hover {
        opacity: 1;
        background: rgba(255,255,255,0.1);
      }
    }

    .active-link {
      background: rgba(255,255,255,0.15);
      opacity: 1;
    }

    .nav-icon {
      margin-right: 4px;
      font-size: 20px;
      height: 20px;
      width: 20px;
    }

    .nav-text {
      margin-left: 8px;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
    }

    .sidenav-container {
      position: fixed;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }

    mat-sidenav-container {
      width: 100%;
      height: 100%;
      background: transparent !important;
    }

    .sidenav {
      width: 250px;
      background: white;
      box-shadow: 2px 0 8px rgba(0,0,0,0.1);
      pointer-events: auto;
    }

    mat-sidenav-content {
      background: transparent !important;
      pointer-events: none;
    }

    ::ng-deep .mat-drawer-backdrop {
      pointer-events: auto !important;
    }

    ::ng-deep .mat-drawer-backdrop.mat-drawer-shown {
      background-color: rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 768px) {
      .navbar {
        height: 56px;
      }
      
      .sidenav-container {
        z-index: 998; /* Ajuste clave para móviles */
        top: 56px;
      }

      .sidenav {
        z-index: 1000; /* Asegura que el sidenav esté por encima en móviles */
      }

      ::ng-deep .mat-drawer-backdrop {
        z-index: 999; /* Backdrop justo debajo del sidenav */
      }

      .nav-links {
        display: none;
      }

      .menu-button {
        display: block;
      }
    }

    @media (min-width: 769px) {
      .menu-button {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuItems: any[] = [];
  
  constructor(
    private router: Router, 
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.cargarMenuDesdeApi();
  }

  cargarMenuDesdeApi() {
    this.menuService.obtenerMenu().subscribe({
      next: (menu) => this.menuItems = menu,
      error: (err) => console.error('Error al cargar el menú:', err)
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idusuario');
    this.router.navigate(['/auth/login']);
  }

  getIconForItem(titulo: string): string {
    const iconMap: { [key: string]: string } = {
      'Dashboard': 'dashboard',
      'Usuarios': 'people',
      'Pacientes': 'medical_services',
      'Reportes': 'assessment',
      'Configuración': 'settings',
    };
    return iconMap[titulo] || 'circle';
  }
}