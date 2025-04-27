import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Users, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/admin/Dashboard';
import BookingList from '../components/user/BookingList';
import UserList from '../components/admin/UserList';

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'users'>('dashboard');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if user is not authenticated or not an admin
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'admin') {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin menu */}
      <div className="bg-white shadow-md rounded-lg mb-8">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'dashboard'
                ? 'text-yellow-600 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Layers className="mr-2 h-5 w-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'bookings'
                ? 'text-yellow-600 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="mr-2 h-5 w-5" />
            Manage Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'users'
                ? 'text-yellow-600 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="mr-2 h-5 w-5" />
            Manage Users
          </button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {activeTab === 'dashboard' && <AdminDashboard />}
        
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Manage Bookings</h2>
            <BookingList isAdmin={true} />
          </div>
        )}
        
        {activeTab === 'users' && <UserList />}
      </div>
    </div>
  );
};

export default AdminDashboardPage;