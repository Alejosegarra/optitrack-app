

import { createClient } from '@supabase/supabase-js';
import { JobStatus } from './types';

// Leer las credenciales de las variables de entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
}

// Definir un tipo para la estructura de tu base de datos
export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string;
          status: JobStatus;
          created_by_branch: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          status: JobStatus;
          created_by_branch: string;
          created_at: string;
        };
        Update: {
          id?: string;
          status?: JobStatus;
          created_by_branch?: string;
          created_at?: string;
          updated_at?: string; // Assume trigger handles this, but include for type safety
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
