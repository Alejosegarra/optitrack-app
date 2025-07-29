import { User, JobStatus } from './types';

export const USERS: User[] = [
  { name: 'Taller', isLab: true },
  { name: 'Sucursal Centro', isLab: false },
  { name: 'Sucursal Norte', isLab: false },
  { name: 'Sucursal Sur', isLab: false },
];

export const STATUS_COLORS: { [key in JobStatus]: string } = {
  [JobStatus.CREADO]: 'bg-blue-100 text-blue-800',
  [JobStatus.RECIBIDO_EN_TALLER]: 'bg-yellow-100 text-yellow-800',
  [JobStatus.ENVIADO_A_SUCURSAL]: 'bg-purple-100 text-purple-800',
  [JobStatus.RECIBIDO_EN_SUCURSAL]: 'bg-green-100 text-green-800',
};

export const STATUS_BORDER_COLORS: { [key in JobStatus]: string } = {
    [JobStatus.CREADO]: 'border-blue-500',
    [JobStatus.RECIBIDO_EN_TALLER]: 'border-yellow-500',
    [JobStatus.ENVIADO_A_SUCURSAL]: 'border-purple-500',
    [JobStatus.RECIBIDO_EN_SUCURSAL]: 'border-green-500',
};
