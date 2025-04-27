import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import BookingForm from '../components/booking/BookingForm';
import { useAuth } from '../contexts/AuthContext';

const BookingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Ride</h1>
        <p className="text-lg text-gray-600">
          Enter your details below to book a cab
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-yellow-500 p-4 text-white flex items-center">
          <MapPin className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold">Ride Details</h2>
        </div>
        <div className="p-6">
          <BookingForm />
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-500 font-bold mr-3">
              1
            </div>
            <div>
              <h4 className="font-medium">Enter Your Locations</h4>
              <p className="text-sm text-gray-600">
                Input your pickup and dropoff addresses so we know where to pick you up and where you're going.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-500 font-bold mr-3">
              2
            </div>
            <div>
              <h4 className="font-medium">Choose Your Cab Type</h4>
              <p className="text-sm text-gray-600">
                Select from our range of cab options based on your needs and budget.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-500 font-bold mr-3">
              3
            </div>
            <div>
              <h4 className="font-medium">Get Fare Estimate</h4>
              <p className="text-sm text-gray-600">
                See the estimated fare before booking to avoid any surprises.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-500 font-bold mr-3">
              4
            </div>
            <div>
              <h4 className="font-medium">Confirm Your Booking</h4>
              <p className="text-sm text-gray-600">
                Click "Book Now" to confirm your ride and we'll dispatch a driver to your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;