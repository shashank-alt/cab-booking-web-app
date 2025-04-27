import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Clock, MapPin, Car, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Booking } from '../../contexts/BookingContext';

interface BookingCardProps {
  booking: Booking;
  isAdmin?: boolean;
  isDriver?: boolean;
  onStatusChange?: (bookingId: string, status: Booking['status']) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  isAdmin = false,
  isDriver = false,
  onStatusChange 
}) => {
  const navigate = useNavigate();
  
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
  
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'confirmed':
        return 'text-indigo-600 bg-indigo-50';
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };
  
  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'in-progress':
      case 'confirmed':
        return <Clock className="h-4 w-4" />;
      case 'pending':
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  const handleViewDetails = () => {
    navigate(`/booking/${booking.id}`);
  };
  
  const handleStatusUpdate = (status: Booking['status']) => {
    if (onStatusChange) {
      onStatusChange(booking.id, status);
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Bookmark className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="font-semibold text-gray-800">Booking #{booking.id}</span>
          </div>
          
          <div className="flex flex-col space-y-2 mb-4">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Pickup</p>
                <p className="text-sm text-gray-600">{booking.pickup.address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Dropoff</p>
                <p className="text-sm text-gray-600">{booking.dropoff.address}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center">
              <Car className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{booking.cabType.name}</span>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">${booking.fare}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{formatDate(booking.date)}</span>
            </div>
            
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                <span className="ml-1 capitalize">{booking.status}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        
        {isDriver && booking.status === 'confirmed' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleStatusUpdate('in-progress')}
          >
            Start Ride
          </Button>
        )}
        
        {isDriver && booking.status === 'in-progress' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleStatusUpdate('completed')}
          >
            Complete Ride
          </Button>
        )}
        
        {isAdmin && booking.status === 'pending' && (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleStatusUpdate('confirmed')}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleStatusUpdate('cancelled')}
            >
              Cancel
            </Button>
          </>
        )}
        
        {(booking.status === 'pending' && !isAdmin && !isDriver) && (
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleStatusUpdate('cancelled')}
          >
            Cancel
          </Button>
        )}
      </div>
    </Card>
  );
};

export default BookingCard;