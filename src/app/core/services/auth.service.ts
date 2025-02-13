import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://erpbackendhospital-production.up.railway.app//api/Autenticacion';

  constructor(private http: HttpClient) { }

  login(credentials: { nombreUsuario: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar-sesion`, credentials);
  }

  guardarUsuario(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('idUsuario', JSON.stringify(response.idUsuario));
  }
}
