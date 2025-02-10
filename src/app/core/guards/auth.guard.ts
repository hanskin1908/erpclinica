import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      // Sin token, solo se permite el acceso a las rutas de autenticación (login, register)
      if (state.url === '/auth/login' || state.url.startsWith('/auth/register')) {
        return true;
      }
      // En cualquier otra ruta, redirigir a login
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Con token, si el usuario intenta ir a /auth/login o /auth/register, se le redirige al dashboard.
    if (state.url === '/auth/login' || state.url.startsWith('/auth/register')) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Si hay token y la ruta es protegida, se permite el acceso
    return true;
  }
}
