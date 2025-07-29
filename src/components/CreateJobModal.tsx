import { useState } from 'react';

interface CreateJobModalProps {
  onClose: () => void;
  onCreate: (jobId: string, jobDate: string) => Promise<void>;
}

function CreateJobModal({ onClose, onCreate }: CreateJobModalProps): React.ReactNode {
  const [jobId, setJobId] = useState('');
  // Use toLocaleDateString('en-CA') to get a reliable YYYY-MM-DD format for the current local date.
  const [jobDate, setJobDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId.trim() || !jobDate) {
      setError('Ambos campos son obligatorios.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await onCreate(jobId, jobDate);
    } catch (err) {
      setError('No se pudo crear el trabajo. Intente de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-gray-800">Crear Nuevo Trabajo</h2>
          <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="jobId" className="block text-sm font-medium text-brand-gray-700 mb-1">Número de Trabajo</label>
            <input
              id="jobId"
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
              placeholder="Ej: T-23005"
              required
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label htmlFor="jobDate" className="block text-sm font-medium text-brand-gray-700 mb-1">Fecha del Pedido</label>
            <input
              id="jobDate"
              type="date"
              value={jobDate}
              onChange={(e) => setJobDate(e.target.value)}
              className="w-full px-3 py-2 border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
              required
            />
          </div>
           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-brand-gray-700 bg-white border border-brand-gray-300 rounded-md hover:bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-md shadow-sm hover:bg-brand-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-brand-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creando...' : 'Crear Trabajo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobModal;