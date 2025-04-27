import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface SignupFormProps {
  defaultRole?: UserRole;
  onSuccess?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  defaultRole = 'customer',
  onSuccess 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (role === 'driver' || role === 'customer') {
      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Phone number is invalid';
      }
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await signup(name, email, password, role, phone);
      
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        type="text"
        label="Full Name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        required
      />
      
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
      
      {(role === 'driver' || role === 'customer') && (
        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          required
        />
      )}
      
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />
      
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
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
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;