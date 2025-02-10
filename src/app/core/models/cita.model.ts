export interface Cita {
  idCita: number;
  idPaciente: number;
  idMedico: number;
  fechaHora: Date;
  estado: string;
  motivo: string;
}
