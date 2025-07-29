export enum JobStatus {
  CREADO = 'Creado por Sucursal',
  RECIBIDO_EN_TALLER = 'Recibido en Taller',
  ENVIADO_A_SUCURSAL = 'Enviado a Sucursal',
  RECIBIDO_EN_SUCURSAL = 'Recibido en Sucursal',
}

export interface Job {
  id: string; // "Número de Trabajo"
  status: JobStatus;
  created_by_branch: string;
  created_at: string; // "Fecha"
  updated_at: string;
}

export interface User {
  name: string;
  isLab: boolean;
}
