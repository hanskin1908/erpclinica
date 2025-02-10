export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  // correo: string;
  contrasena?: string; // Opcional porque no se envía en respuestas
  // estado: boolean;
  idsRoles: number[];
}

export interface Rol {
  idRol: number;
  
}
