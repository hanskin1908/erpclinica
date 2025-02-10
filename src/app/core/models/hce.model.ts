export interface Hce {
  idHistoriaClinica: number;
  idPaciente: number;
  fechaRegistro: Date;
  diagnostico: string;
  tratamiento: string;
  observaciones?: string;
}
