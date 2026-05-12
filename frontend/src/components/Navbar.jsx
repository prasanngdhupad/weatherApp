import React from 'react';
import { Link } from 'react-router-dom';
import { CloudRain, Moon, Sun, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="glass sticky top-0 z-50 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <CloudRain className="h-8 w-8 text-blue-500" />
          <span>WeatherApp</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium hidden sm:inline">Hi, {user.name}</span>
              <button onClick={logout} className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-1 font-medium hover:text-blue-500 transition">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
