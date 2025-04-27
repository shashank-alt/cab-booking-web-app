import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, ChevronRight } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Car className="h-12 w-12 text-yellow-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-yellow-600 hover:text-yellow-500">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ChevronRight className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;