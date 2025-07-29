import { useState, useEffect, useCallback } from 'react';
import { Job, User } from '../types';
import { getJobs, createJob } from '../services/jobService';
import { supabase } from '../supabaseClient';
import JobCard from './JobCard';
import CreateJobModal from './CreateJobModal';

interface DashboardProps {
  currentUser: User;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const Spinner = () => (
    <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
    </div>
);

function Dashboard({ currentUser }: DashboardProps): React.ReactNode {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchJobs = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const fetchedJobs = await getJobs(currentUser);
      setJobs(fetchedJobs);
    } catch (e) {
      setError('Error al cargar los trabajos. Por favor, intente de nuevo.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchJobs();

    const channel = supabase
      .channel('realtime-jobs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        (payload) => {
          console.log('Change received!', payload);
          // Re-fetch all jobs to get the most current state for simplicity
          // More advanced logic could be to update, insert or delete specific jobs
          fetchJobs();
        }
      )
      .subscribe();
    
    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };

  }, [fetchJobs]);

  const handleCreateJob = async (jobId: string, jobDate: string) => {
    try {
       // The real-time listener will handle updating the UI, so no need to re-fetch here.
      await createJob(jobId, jobDate, currentUser.name);
      setIsModalOpen(false);
    } catch (e) {
      setError('Error al crear el trabajo.');
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-gray-800">
          {currentUser.isLab ? 'Panel del Taller' : `Panel de ${currentUser.name}`}
        </h2>
        {!currentUser.isLab && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-brand-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors shadow-sm"
          >
            <PlusIcon />
            Crear Trabajo
          </button>
        )}
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-brand-gray-700">No hay trabajos para mostrar</h3>
            <p className="mt-2 text-brand-gray-500">
                {currentUser.isLab ? "No hay trabajos activos en ninguna sucursal." : "No ha creado ningún trabajo todavía."}
            </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} currentUser={currentUser} />
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateJobModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateJob}
        />
      )}
    </div>
  );
}

export default Dashboard;
