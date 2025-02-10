import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu.model';
@Injectable({
  providedIn: 'root' // Hace que esté disponible en toda la app
})
export class MenuService {
  
  private apiUrl = 'https://localhost:44349/api/menu'; // Ajusta la URL según el backend

  constructor(private http: HttpClient) { }

  obtenerMenu(): Observable<MenuItem[]> {

   
     
    
    return this.http.get<any[]>(this.apiUrl+'/'+localStorage.getItem("idusuario")); // Llamado a la API
  }
}
