import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Car, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    
    switch (currentUser.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'driver':
        return '/driver/dashboard';
      case 'customer':
      default:
        return '/dashboard';
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">QuickRide</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/book" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">
              Book a Ride
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50">
              About
            </Link>
            
            {currentUser ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                  >
                    <span>{currentUser.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
                
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
              >
                Log in
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-gray-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/book"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Ride
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {currentUser ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;