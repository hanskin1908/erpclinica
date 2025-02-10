export interface Suscripcion {
  idSuscripcion: number;
  idClinica: number;
  estado: 'Activo' | 'Suspendido' | 'Expirado';
  fechaInicio: string; // Formato ISO8601 (YYYY-MM-DD)
  fechaFin: string;
  ultimoPago: string;
  planSuscripcion: 'Básico' | 'Premium' | 'Enterprise';
}
