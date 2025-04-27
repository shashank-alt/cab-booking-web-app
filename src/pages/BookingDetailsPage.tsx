import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, Car, MapPin, Calendar, DollarSign, 
  CheckCircle, XCircle, AlertCircle, User, Phone 
} from 'lucide-react';
import { useBooking, Booking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getBookingById, cancelBooking, updateBookingStatus } = useBooking();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (id) {
      const foundBooking = getBookingById(id);
      setBooking(foundBooking || null);
    }
    setIsLoading(false);
  }, [id, getBookingById, currentUser, navigate]);
  
  const handleCancelBooking = async () => {
    if (!booking) return;
    
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(booking.id);
      // Refresh booking data
      const updatedBooking = getBookingById(booking.id);
      setBooking(updatedBooking || null);
    }
  };
  
  const handleUpdateStatus = async (status: Booking['status']) => {
    if (!booking) return;
    
    await updateBookingStatus(
      booking.id, 
      status, 
      currentUser?.role === 'driver' ? currentUser.id : undefined
    );
    
    // Refresh booking data
    const updatedBooking = getBookingById(booking.id);
    setBooking(updatedBooking || null);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-red-600 mb-4">Booking not found</p>
          <Link to="/dashboard">
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get status icon and color
  const getStatusDetails = (status: Booking['status']) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircle className="h-5 w-5" />, 
          color: 'bg-green-50 text-green-700',
          text: 'Completed'
        };
      case 'cancelled':
        return { 
          icon: <XCircle className="h-5 w-5" />, 
          color: 'bg-red-50 text-red-700',
          text: 'Cancelled'
        };
      case 'in-progress':
        return { 
          icon: <Car className="h-5 w-5" />, 
          color: 'bg-blue-50 text-blue-700',
          text: 'In Progress'
        };
      case 'confirmed':
        return { 
          icon: <CheckCircle className="h-5 w-5" />, 
          color: 'bg-indigo-50 text-indigo-700',
          text: 'Confirmed'
        };
      case 'pending':
      default:
        return { 
          icon: <AlertCircle className="h-5 w-5" />, 
          color: 'bg-yellow-50 text-yellow-700',
          text: 'Pending'
        };
    }
  };
  
  const statusDetails = getStatusDetails(booking.status);
  const isAdmin = currentUser?.role === 'admin';
  const isDriver = currentUser?.role === 'driver';
  const isCustomer = currentUser?.role === 'customer';
  const canCancel = isCustomer && booking.status === 'pending';
  const canConfirm = isAdmin && booking.status === 'pending';
  const canStart = isDriver && booking.status === 'confirmed';
  const canComplete = isDriver && booking.status === 'in-progress';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusDetails.color}`}>
          {statusDetails.icon}
          <span className="ml-1 capitalize">{statusDetails.text}</span>
        </span>
      </div>
      
      <Card className="mb-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Ride Information</h2>
          <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex">
            <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Pickup Location</p>
              <p className="font-medium">{booking.pickup.address}</p>
            </div>
          </div>
          
          <div className="flex">
            <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Dropoff Location</p>
              <p className="font-medium">{booking.dropoff.address}</p>
            </div>
          </div>
          
          <div className="flex">
            <Car className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Cab Type</p>
              <p className="font-medium">{booking.cabType.name}</p>
            </div>
          </div>
          
          <div className="flex">
            <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Scheduled Date</p>
              <p className="font-medium">{formatDate(booking.date)}</p>
            </div>
          </div>
          
          <div className="flex">
            <DollarSign className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Fare</p>
              <p className="font-medium">${booking.fare}</p>
            </div>
          </div>
          
          {booking.driverId && (
            <div className="flex">
              <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Driver</p>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Phone className="h-3 w-3 mr-1" /> (555) 123-4567
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Ride Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="font-medium">{booking.distance} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Base Fare</span>
            <span className="font-medium">${booking.cabType.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance Charge</span>
            <span className="font-medium">${booking.cabType.pricePerKm} × {booking.distance} km</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total Fare</span>
            <span className="text-yellow-600">${booking.fare}</span>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-wrap gap-3">
        <Link to="/dashboard">
          <Button variant="outline">
            Back to Dashboard
          </Button>
        </Link>
        
        {canCancel && (
          <Button 
            variant="danger" 
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </Button>
        )}
        
        {canConfirm && (
          <>
            <Button 
              variant="primary" 
              onClick={() => handleUpdateStatus('confirmed')}
            >
              Confirm Booking
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleUpdateStatus('cancelled')}
            >
              Reject Booking
            </Button>
          </>
        )}
        
        {canStart && (
          <Button 
            variant="primary" 
            onClick={() => handleUpdateStatus('in-progress')}
          >
            Start Ride
          </Button>
        )}
        
        {canComplete && (
          <Button 
            variant="primary" 
            onClick={() => handleUpdateStatus('completed')}
          >
            Complete Ride
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;