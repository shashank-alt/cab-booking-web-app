import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import Button from '../components/common/Button';
import BookingList from '../components/user/BookingList';
import Card from '../components/common/Card';

const UserDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserBookings } = useBooking();
  const navigate = useNavigate();
  
  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (currentUser.role === 'driver') {
      navigate('/driver/dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'customer') {
    return null; // Don't render anything while redirecting
  }
  
  const userBookings = getUserBookings(currentUser.id);
  
  // Calculate some statistics
  const totalBookings = userBookings.length;
  const completedRides = userBookings.filter(b => b.status === 'completed').length;
  const cancelledRides = userBookings.filter(b => b.status === 'cancelled').length;
  const activeRides = userBookings.filter(b => 
    b.status === 'pending' || b.status === 'confirmed' || b.status === 'in-progress'
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() => navigate('/book')}
            variant="primary"
            className="flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            Book a Ride
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
            <Car className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{totalBookings}</h3>
          <p className="text-gray-600">Total Bookings</p>
        </Card>
        
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{completedRides}</h3>
          <p className="text-gray-600">Completed Rides</p>
        </Card>
        
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{activeRides}</h3>
          <p className="text-gray-600">Active Rides</p>
        </Card>
        
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{cancelledRides}</h3>
          <p className="text-gray-600">Cancelled Rides</p>
        </Card>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="bg-yellow-500 p-4 text-white">
          <h2 className="text-xl font-semibold">My Bookings</h2>
        </div>
        <div className="p-6">
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;