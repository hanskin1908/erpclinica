import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/api/citas`);
  }

  getCitaById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/api/citas/${id}`);
  }

  createCita(cita: Cita): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/citas`, cita);
  }

  updateCita(cita: Cita): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/citas`, cita);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/citas/${id}`);
  }
}
