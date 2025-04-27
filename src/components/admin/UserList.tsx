import React, { useState, useEffect } from 'react';
import { User, useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { UserCircle, Users, Mail, Phone, AlertCircle } from 'lucide-react';

// In a real app, this would come from an API
const getSampleUsers = (): User[] => {
  return [
    { id: '1', name: 'John Doe', email: 'user@example.com', role: 'customer', phone: '555-1234' },
    { id: '2', name: 'Jane Smith', email: 'driver@example.com', role: 'driver', phone: '555-5678' },
    { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: '4', name: 'Sam Wilson', email: 'sam@example.com', role: 'customer', phone: '555-2468' },
    { id: '5', name: 'Mike Johnson', email: 'mike@example.com', role: 'driver', phone: '555-9876' },
    { id: '6', name: 'Sarah Lee', email: 'sarah@example.com', role: 'customer', phone: '555-3456' },
  ];
};

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <Card>
      <div className="flex items-start">
        <div className="bg-gray-100 p-2 rounded-full mr-4">
          <UserCircle className="h-8 w-8 text-gray-500" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
            
            {user.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{user.phone}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm capitalize bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(user)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users (simulated)
  useEffect(() => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        const loadedUsers = getSampleUsers();
        setUsers(loadedUsers);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load users');
      setIsLoading(false);
    }
  }, []);

  // Edit user (simulated)
  const handleEditUser = (user: User) => {
    // In a real app, this would navigate to an edit form
    alert(`Edit user: ${user.name}`);
  };

  // Delete user (simulated)
  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button variant="primary" size="sm">
          Add New User
        </Button>
      </div>
      
      {users.length === 0 ? (
        <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200">
          <p className="text-gray-500">No users found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;