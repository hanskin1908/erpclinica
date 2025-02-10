import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Hce } from '../models/hce.model';

@Injectable({
  providedIn: 'root'
})
export class HceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHceByPaciente(idPaciente: number): Observable<Hce> {
    return this.http.get<Hce>(`${this.apiUrl}/api/hce/${idPaciente}`);
  }

  createHce(hce: Hce): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/hce`, hce);
  }

  updateHce(hce: Hce): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/hce`, hce);
  }
}
