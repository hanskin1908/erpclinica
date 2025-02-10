import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/api/facturacion`);
  }

  createFactura(factura: Factura): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/facturacion`, factura);
  }

  updateFactura(factura: Factura): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/facturacion`, factura);
  }
}
