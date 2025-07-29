import { User } from '../types';
import { EyeIcon } from './LoginScreen';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
)

function Header({ user, onLogout }: HeaderProps): React.ReactNode {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <EyeIcon className="h-8 w-8 text-brand-blue"/>
            <h1 className="text-xl font-bold text-brand-blue">OptiTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <UserIcon />
              <span className="font-semibold text-brand-gray-700">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <LogoutIcon />
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;