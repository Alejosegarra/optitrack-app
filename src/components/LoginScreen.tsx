import { User } from '../types';

interface LoginScreenProps {
  users: User[];
  onLogin: (user: User) => void;
}

export const EyeIcon = ({ className = "h-16 w-16 text-brand-blue" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>
);


function LoginScreen({ users, onLogin }: LoginScreenProps): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brand-gray-50 to-brand-gray-200 p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-500 hover:shadow-3xl">
        <div className="mb-8 flex justify-center">
            <EyeIcon />
        </div>
        <h1 className="text-3xl font-bold text-brand-gray-800 mb-2">Bienvenido a OptiTrack</h1>
        <p className="text-brand-gray-500 mb-8">Seleccione su usuario para continuar</p>
        <div className="space-y-4">
          {users.map((user) => (
            <button
              key={user.name}
              onClick={() => onLogin(user)}
              className="w-full text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-opacity-50
                         bg-brand-blue text-white
                         hover:bg-brand-blue-light
                         focus:ring-brand-blue"
            >
              {user.isLab ? 'Taller' : user.name}
            </button>
          ))}
        </div>
      </div>
       <footer className="mt-8 text-center text-sm text-brand-gray-400">
        <p>&copy; {new Date().getFullYear()} OptiTrack. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default LoginScreen;