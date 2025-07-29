import { useState } from 'react';
import { User } from './types';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { USERS } from './constants';

function App(): React.ReactNode {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-brand-gray-50 text-brand-gray-800">
      {currentUser ? (
        <>
          <Header user={currentUser} onLogout={handleLogout} />
          <main>
            <Dashboard currentUser={currentUser} />
          </main>
        </>
      ) : (
        <LoginScreen users={USERS} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
