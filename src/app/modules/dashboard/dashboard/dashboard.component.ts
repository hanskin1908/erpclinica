import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

interface DashboardCard {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  value: number;
  route: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  template: `
    <app-navbar></app-navbar>
    <main class="dashboard-layout">
      <div class="dashboard-container">
        <header class="dashboard-header">
          <div class="welcome-section">
            <h1>Bienvenido, {{userName()}}</h1>
            <p class="subtitle">{{getCurrentDate() | date:'EEEE, d MMMM yyyy'}}</p>
          </div>
          
          <div class="actions-section">
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              Nueva Acción
            </button>
          </div>
        </header>

        <div class="dashboard-grid">
          <mat-card *ngFor="let card of dashboardCards(); trackBy: trackByTitle" 
                    class="dashboard-card" 
                    [ngClass]="card.color">
            <mat-card-header>
              <mat-card-title>{{card.title}}</mat-card-title>
              <mat-card-subtitle>{{card.subtitle}}</mat-card-subtitle>
              <button mat-icon-button [matMenuTriggerFor]="menu" class="more-button">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item>
                  <mat-icon>trending_up</mat-icon>
                  <span>Ver detalles</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>get_app</mat-icon>
                  <span>Descargar reporte</span>
                </button>
              </mat-menu>
            </mat-card-header>
            
            <mat-card-content>
              <div class="card-content">
                <mat-icon class="card-icon">{{card.icon}}</mat-icon>
                <div class="card-value">{{card.value}}</div>
              </div>
              <mat-progress-bar 
                mode="determinate" 
                [value]="card.value"
                class="progress-bar">
              </mat-progress-bar>
            </mat-card-content>
            
            <mat-card-actions>
              <button 
                mat-button 
                [routerLink]="[card.route]" 
                class="card-action-button">
                Ver más
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </main>
  `,
  styles: [`
 .dashboard-layout {
    min-height: calc(100vh - 64px);
    background-color: #f5f5f5;
    margin-top: 84px; // Cambiamos padding-top por margin-top
    position: relative; // Añadimos posición relativa
    z-index: 2; // Mayor que el z-index del sidenav-container
  }

    .dashboard-container {
      padding: 0 1.5rem; // Aumentamos el padding horizontal
      margin: 0 auto;
      max-width: 1400px;
    }

    .dashboard-header {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

    .welcome-section h1 {
      margin: 0;
      font-size: 2rem;
      color: #333;
      font-weight: 500;
    }

    .subtitle {
      color: #666;
      margin: 0.5rem 0 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .dashboard-card {
      border-radius: 12px;
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
      overflow: hidden;
      margin: 0;
    }

    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .dashboard-card.primary {
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
    }

    .dashboard-card.warning {
      background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
      color: white;
    }

    .dashboard-card.info {
      background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
      color: white;
    }

    .dashboard-card.success {
      background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
      color: white;
    }

    .card-content {
      display: flex;
      align-items: center;
      padding: 1.25rem;
    }

    .card-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 1rem;
    }

    .card-value {
      font-size: 2rem;
      font-weight: 500;
    }

    .progress-bar {
      margin: 0 1rem 1rem;
      height: 6px;
      border-radius: 3px;
    }

    .more-button {
      position: absolute;
      right: 8px;
      top: 8px;
      color: white;
    }

    .card-action-button {
      width: 100%;
      justify-content: space-between;
      padding: 0.75rem;
      color: inherit;
      opacity: 0.9;
      
      &:hover {
        opacity: 1;
        background: rgba(255,255,255,0.1);
      }
    }

    mat-card-header {
      padding: 1rem 1rem 0;
    }

    mat-card-title {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: white;
    }

    mat-card-subtitle {
      color: rgba(255,255,255,0.8);
    }

    @media (max-width: 768px) {
      .dashboard-layout {
        margin-top: 72px; // Ajustamos para móviles
      }

      .dashboard-container {
        padding: 0 1rem;
      }

      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
      }

      .welcome-section h1 {
        font-size: 1.5rem;
      }

      .actions-section {
        width: 100%;
      }
    }
  `]
})
export class DashboardComponent {
  userName = signal('Dr. Juan Pérez');
  
  dashboardCards = signal<DashboardCard[]>([
    {
      title: 'Citas Programadas',
      subtitle: 'Última semana',
      icon: 'event',
      color: 'primary',
      value: 30,
      route: '/citas'
    },
    {
      title: 'Pacientes Atendidos',
      subtitle: 'Este mes',
      icon: 'person',
      color: 'info',
      value: 120,
      route: '/pacientes'
    },
    {
      title: 'Consultas Pendientes',
      subtitle: 'Hoy',
      icon: 'assignment_late',
      color: 'warning',
      value: 8,
      route: '/citas'
    },
    {
      title: 'Ingresos Totales',
      subtitle: 'Este mes',
      icon: 'attach_money',
      color: 'success',
      value: 4500,
      route: '/facturacion'
    }
  ]);

  getCurrentDate(): Date {
    return new Date();
  }

  trackByTitle(index: number, card: DashboardCard): string {
    return card.title;
  }
}