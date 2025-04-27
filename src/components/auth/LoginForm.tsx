import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface LoginFormProps {
  defaultRole?: UserRole;
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  defaultRole = 'customer',
  onSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await login(email, password, role);
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect based on user role
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'driver':
            navigate('/driver/dashboard');
            break;
          case 'customer':
          default:
            navigate('/dashboard');
            break;
        }
      }
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  // Demo login info
  const demoCredentials = {
    customer: { email: 'user@example.com', password: 'password' },
    driver: { email: 'driver@example.com', password: 'password' },
    admin: { email: 'admin@example.com', password: 'password' }
  };

  const handleDemoLogin = (demoRole: UserRole) => {
    setEmail(demoCredentials[demoRole].email);
    setPassword(demoCredentials[demoRole].password);
    setRole(demoRole);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 px-3 text-sm rounded-md ${
              role === 'customer'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('driver')}
            className={`flex-1 py-2 px-3 text-sm rounded-md ${
              role === 'driver'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Driver
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 px-3 text-sm rounded-md ${
              role === 'admin'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Admin
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isLoading}
        >
          Log in
        </Button>
      </form>
      
      {/* Demo login options */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">For demo purposes, use:</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleDemoLogin('customer')}
            className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded"
          >
            User Demo
          </button>
          <button
            onClick={() => handleDemoLogin('driver')}
            className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded"
          >
            Driver Demo
          </button>
          <button
            onClick={() => handleDemoLogin('admin')}
            className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded"
          >
            Admin Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;