import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import Button from '../components/common/Button';
import BookingList from '../components/user/BookingList';
import Card from '../components/common/Card';

const DriverDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getDriverBookings } = useBooking();
  const navigate = useNavigate();
  
  // Redirect if user is not authenticated or not a driver
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'driver') {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'driver') {
    return null; // Don't render anything while redirecting
  }
  
  const driverBookings = currentUser ? getDriverBookings(currentUser.id) : [];
  
  // Calculate some statistics
  const totalBookings = driverBookings.length;
  const completedRides = driverBookings.filter(b => b.status === 'completed').length;
  const inProgressRides = driverBookings.filter(b => b.status === 'in-progress').length;
  const confirmedRides = driverBookings.filter(b => b.status === 'confirmed').length;
  
  // Calculate earnings (from completed rides)
  const totalEarnings = driverBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, booking) => sum + booking.fare, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Driver Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() => {}} // This would be used for toggling availability
            variant={true ? "primary" : "outline"}
            className="flex items-center"
          >
            <UserCheck className="mr-1 h-4 w-4" />
            Available for Rides
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4">
            <Car className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{confirmedRides}</h3>
          <p className="text-gray-600">Assigned Rides</p>
        </Card>
        
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{inProgressRides}</h3>
          <p className="text-gray-600">In Progress</p>
        </Card>
        
        <Card className="text-center p-6">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{completedRides}</h3>
          <p className="text-gray-600">Completed</p>
        </Card>
        
        <Card className="text-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h3 className="text-3xl font-bold mb-1">${totalEarnings}</h3>
          <p>Total Earnings</p>
        </Card>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="bg-yellow-500 p-4 text-white">
          <h2 className="text-xl font-semibold">My Assigned Rides</h2>
        </div>
        <div className="p-6">
          <BookingList isDriver={true} />
        </div>
      </div>
    </div>
  );
};

export default DriverDashboardPage;