import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export type UserRole = 'customer' | 'driver' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole, phone?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Sample users for demo purposes
const sampleUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'user@example.com', role: 'customer', phone: '555-1234' },
  { id: '2', name: 'Jane Smith', email: 'driver@example.com', role: 'driver', phone: '555-5678' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved user from localStorage on init
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Simulated login functionality
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email and role
      const user = sampleUsers.find(u => u.email === email && u.role === role);
      
      if (user) {
        setCurrentUser(user);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated signup functionality
  const signup = async (name: string, email: string, password: string, role: UserRole, phone?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (sampleUsers.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: `${sampleUsers.length + 1}`,
        name,
        email,
        role,
        phone
      };
      
      // In a real app, we'd send this to an API
      // For demo, we just set the current user
      setCurrentUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};