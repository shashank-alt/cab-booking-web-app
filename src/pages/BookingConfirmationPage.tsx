import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Car, MapPin, Calendar } from 'lucide-react';
import { useBooking, Booking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const BookingConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getBookingById } = useBooking();
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
          <Link to="/book">
            <Button variant="primary">Book a New Ride</Button>
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Your ride has been successfully booked
        </p>
      </div>
      
      <Card className="mb-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
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
            <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="inline-flex items-center bg-yellow-50 text-yellow-700 px-2.5 py-0.5 rounded-full text-sm font-medium">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Fare Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Fare</span>
            <span className="font-medium">${booking.cabType.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance ({booking.distance} km)</span>
            <span className="font-medium">${booking.cabType.pricePerKm * booking.distance}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total Fare</span>
            <span className="text-yellow-600">${booking.fare}</span>
          </div>
        </div>
      </Card>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">What's Next?</h3>
        <ul className="space-y-2">
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">
              1
            </span>
            <span className="text-blue-700">Your booking is being processed and a driver will be assigned shortly.</span>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">
              2
            </span>
            <span className="text-blue-700">You'll receive a notification when a driver accepts your ride.</span>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">
              3
            </span>
            <span className="text-blue-700">The driver will contact you when they arrive at your pickup location.</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <Link to="/dashboard" className="flex-1">
          <Button variant="primary" fullWidth>
            View My Bookings
          </Button>
        </Link>
        <Link to="/book" className="flex-1">
          <Button variant="outline" fullWidth>
            Book Another Ride
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;