
import { Job, JobStatus, User } from '../types';
import { supabase } from '../supabaseClient';

// Las funciones ahora interactúan con Supabase en lugar de un array mock.

export const getJobs = async (user: User): Promise<Job[]> => {
  console.log(`Fetching jobs for ${user.name} from Supabase`);
  
  let query = supabase.from('jobs').select();

  // Si el usuario no es el taller, filtrar por la sucursal que creó el trabajo.
  if (!user.isLab) {
    query = query.eq('created_by_branch', user.name);
  }

  // Ordenar por la fecha de actualización más reciente.
  const { data, error } = await query.order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Could not fetch jobs from Supabase.');
  }

  return data || [];
};

export const createJob = async (
  jobId: string,
  jobDate: string,
  branchName: string
): Promise<Job> => {
  console.log(`Creating job ${jobId} from ${branchName} in Supabase`);
  
  const { data, error } = await supabase
    .from('jobs')
    .insert([
      {
        id: jobId,
        status: JobStatus.CREADO,
        created_by_branch: branchName,
        // Interpret date as local by providing a time part to prevent timezone shifts.
        created_at: new Date(`${jobDate}T12:00:00`).toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating job:', error);
    throw new Error('Could not create the job in Supabase.');
  }

  if (!data) {
    throw new Error('Job creation did not return data.');
  }

  return data;
};

export const updateJobStatus = async (jobId: string, newStatus: JobStatus): Promise<Job> => {
  console.log(`Updating job ${jobId} to status ${newStatus} in Supabase`);
  
  const { data, error } = await supabase
    .from('jobs')
    .update({ status: newStatus })
    .eq('id', jobId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating job status:', error);
    throw new Error('Could not update job status in Supabase.');
  }
  
  if (!data) {
    throw new Error('Job update did not return data.');
  }

  return data;
};
