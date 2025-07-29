import { useState } from 'react';
import { Job, JobStatus, User } from '../types';
import { STATUS_COLORS, STATUS_BORDER_COLORS } from '../constants';
import { updateJobStatus } from '../services/jobService';

interface JobCardProps {
  job: Job;
  currentUser: User;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-brand-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const UserIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-brand-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

function ActionButton({ onClick, children, disabled, className }: { onClick: () => void; children: React.ReactNode, disabled: boolean, className: string }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full mt-4 py-2 px-4 rounded-md font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className} ${disabled ? 'bg-brand-gray-300 text-brand-gray-500 cursor-not-allowed' : 'shadow-sm'}`}
        >
            {children}
        </button>
    )
}

function JobCard({ job, currentUser }: JobCardProps): React.ReactNode {
  const [isUpdating, setIsUpdating] = useState(false);
  const { id, status, created_by_branch, created_at, updated_at } = job;

  const handleUpdateStatus = async (newStatus: JobStatus) => {
    setIsUpdating(true);
    try {
      // No need to call a callback, Supabase real-time will update the list
      await updateJobStatus(id, newStatus);
    } catch (error) {
      console.error("Failed to update job status", error);
      alert('Error al actualizar el estado del trabajo.');
    } finally {
      // The UI will update automatically, but we still want to re-enable the button
      // in case of an error or if the real-time update is slow.
      setIsUpdating(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric'
    });
  };
  
  const renderAction = () => {
    if (currentUser.isLab) {
      if (status === JobStatus.CREADO) {
        return <ActionButton onClick={() => handleUpdateStatus(JobStatus.RECIBIDO_EN_TALLER)} disabled={isUpdating} className="bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400">Marcar como Recibido en Taller</ActionButton>;
      }
      if (status === JobStatus.RECIBIDO_EN_TALLER) {
        return <ActionButton onClick={() => handleUpdateStatus(JobStatus.ENVIADO_A_SUCURSAL)} disabled={isUpdating} className="bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-400">Marcar como Enviado a Sucursal</ActionButton>;
      }
    } else if (currentUser.name === created_by_branch) {
      if (status === JobStatus.ENVIADO_A_SUCURSAL) {
        return <ActionButton onClick={() => handleUpdateStatus(JobStatus.RECIBIDO_EN_SUCURSAL)} disabled={isUpdating} className="bg-green-500 text-white hover:bg-green-600 focus:ring-green-400">Marcar como Recibido en Sucursal</ActionButton>;
      }
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border-l-4 ${STATUS_BORDER_COLORS[status]}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <p className="font-bold text-lg text-brand-gray-800">{id}</p>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${STATUS_COLORS[status]}`}>
            {status}
          </span>
        </div>
        <div className="mt-6 mb-2 flex items-center text-sm text-brand-gray-600">
            <CalendarIcon />
            <span>Fecha Pedido: {formatDate(created_at)}</span>
        </div>
      </div>
      <div className="bg-brand-gray-50 px-5 py-3 border-t border-brand-gray-200">
        <div className="flex justify-between text-xs text-brand-gray-500">
            <div className="flex items-center"><UserIcon /> {created_by_branch}</div>
            <div className="flex items-center"><CalendarIcon /> Últ. act: {formatDate(updated_at)}</div>
        </div>
        {renderAction()}
      </div>
    </div>
  );
}

export default JobCard;