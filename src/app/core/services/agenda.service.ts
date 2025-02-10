//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { environment } from '../../../environments/environments';
//import { AgendaMedica } from '../models/agenda-medica.model';
//import { delay } from 'rxjs/operators';
//@Injectable({
//  providedIn: 'root'
//})
//export class AgendaService {
//  private apiUrl = environment.apiUrl;

//  constructor(private http: HttpClient) { }

//  //getAgendaByMedico(medicoId: number): Observable<AgendaMedica[]> {
//  //  return this.http.get<AgendaMedica[]>(`${this.apiUrl}/api/agenda/${medicoId}`);
//  //}

//  getAgendaByMedico(medicoId: number): Observable<AgendaMedica[]> {
//    const dummyAgenda: AgendaMedica[] = [
//      { idAgenda: 1, idMedico: medicoId, diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '12:00' },
//      { idAgenda: 2, idMedico: medicoId, diaSemana: 'Martes', horaInicio: '08:00', horaFin: '12:00' },
//      { idAgenda: 3, idMedico: medicoId, diaSemana: 'Miércoles', horaInicio: '08:00', horaFin: '12:00' },
//      // Agrega más turnos según se necesite
//    ];
//    return of(dummyAgenda).pipe(delay(500));
//  }
//}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AgendaMedica } from '../models/agenda-medica.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  constructor() { }

  getAgendaByMedico(medicoId: number): Observable<AgendaMedica[]> {
    const dummyAgenda: AgendaMedica[] = [
      { idAgenda: 1, idMedico: medicoId, diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '12:00' },
      { idAgenda: 2, idMedico: medicoId, diaSemana: 'Martes', horaInicio: '08:00', horaFin: '12:00' },
      { idAgenda: 3, idMedico: medicoId, diaSemana: 'Miércoles', horaInicio: '08:00', horaFin: '12:00' },
      // Agrega más turnos según se necesite
    ];
    return of(dummyAgenda).pipe(delay(500));
  }
}
