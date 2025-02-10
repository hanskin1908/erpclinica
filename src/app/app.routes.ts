import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
export const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }, // 🔥 No usar redirectTo
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'usuarios', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [AuthGuard] },
  { path: 'pacientes', loadChildren: () => import('./modules/pacientes/pacientes.module').then(m => m.PacientesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/login' } // 🔥 Asegurar que **redirige correctamente**
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, ReactiveFormsModule]
})
export class AppRoutingModule { }



