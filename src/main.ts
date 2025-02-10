import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './../src/app/core/interceptors/auth.interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './app/core/guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./app/modules/auth/auth.module').then(m => m.AuthModule)


  },
  {
    path: 'dashboard',
    loadComponent: () => import('./app/modules/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),canActivate: [AuthGuard] }
  ,
  {
    path: 'usuarios',
    loadChildren: () => import('./app/modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  { path: 'roles', loadChildren: () => import('./app//modules/roles/roles.module').then(m => m.RolesModule) },
  
  
    {path: 'pacientes', loadChildren: () => import('./app/modules/pacientes/pacientes.module').then(m => m.PacientesModule) }
  , {
    path: 'citas',
    loadChildren: () =>
      import('./app/modules/citas/citas.module').then(m => m.CitasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'hce',
    loadChildren: () =>
      import('./app/modules/hce/hce.module').then(m => m.HceModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'facturacion',
    loadChildren: () =>
      import('./app/modules/facturacion/facturacion.module').then(m => m.FacturacionModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ✅ Se pasa un array de Routes[]
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserAnimationsModule, ReactiveFormsModule),

    provideHttpClient(withInterceptors([AuthInterceptor])), provideAnimationsAsync() // ✅ Agregar interceptor
  ]
}).catch(err => console.error(err));
