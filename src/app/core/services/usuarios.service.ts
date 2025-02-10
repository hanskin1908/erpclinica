import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // La URL base se obtiene desde el environment, por ejemplo: 'https://localhost:5001'
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de usuarios desde el backend.
   */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/api/usuarios`);
  }

  /**
   * Crea un nuevo usuario enviando los datos al backend.
   * Se espera que el backend genere el ID del usuario.
   */
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/api/usuarios`, usuario);
  }

  /**
   * Actualiza la información de un usuario existente.
   * El backend debe recibir el objeto con el ID y actualizar el registro correspondiente.
   */
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/api/usuarios`, usuario);
  }

  /**
   * Elimina un usuario identificado por su ID.
   */
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/usuarios/${id}`);
  }
}