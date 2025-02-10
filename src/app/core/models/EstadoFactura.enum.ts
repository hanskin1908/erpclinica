export enum EstadoFactura {
  Pendiente = 'Pendiente',
  Pagada = 'Pagada',
  Vencida = 'Vencida'
}

export interface FacturaDTO {
  idFactura: number;
  idPaciente: number;
  fechaEmision: Date;
  monto: number;
  estado: EstadoFactura;
}
