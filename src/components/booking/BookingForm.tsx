import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking, Location, CabType } from '../../contexts/BookingContext';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Card from '../common/Card';

const BookingForm: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedCabType, setSelectedCabType] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isBooking, setIsBooking] = useState(false);
  
  const { cabTypes, createBooking, estimateDistance, calculateFare } = useBooking();
  const navigate = useNavigate();

  // Ensure a default cab type is selected
  useEffect(() => {
    if (cabTypes.length > 0 && !selectedCabType) {
      setSelectedCabType(cabTypes[0].id);
    }
  }, [cabTypes, selectedCabType]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!pickupLocation) {
      newErrors.pickup = 'Pickup location is required';
    }
    
    if (!dropoffLocation) {
      newErrors.dropoff = 'Dropoff location is required';
    }
    
    if (!selectedCabType) {
      newErrors.cabType = 'Please select a cab type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEstimateFare = () => {
    if (!validate()) return;
    
    setIsEstimating(true);
    
    // Create location objects
    const pickup: Location = { address: pickupLocation };
    const dropoff: Location = { address: dropoffLocation };
    
    // Calculate distance
    const distance = estimateDistance(pickup, dropoff);
    setEstimatedDistance(distance);
    
    // Calculate fare
    const fare = calculateFare(distance, selectedCabType);
    setEstimatedFare(fare);
    
    setIsEstimating(false);
  };

  const handleBookRide = async () => {
    if (!validate() || !estimatedFare || !estimatedDistance) return;
    
    setIsBooking(true);
    
    try {
      // Create location objects
      const pickup: Location = { address: pickupLocation };
      const dropoff: Location = { address: dropoffLocation };
      
      // Create booking
      const booking = await createBooking(pickup, dropoff, selectedCabType);
      
      // Navigate to booking confirmation
      navigate(`/booking/confirmation/${booking.id}`);
    } catch (err) {
      // Handle booking error
      console.error('Booking failed', err);
      setErrors({ 
        submit: err instanceof Error ? err.message : 'Failed to create booking' 
      });
    } finally {
      setIsBooking(false);
    }
  };

  const selectedCab = cabTypes.find(cab => cab.id === selectedCabType);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="pickup"
          label="Pickup Location"
          placeholder="Enter pickup address"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          error={errors.pickup}
          required
        />
        
        <Input
          id="dropoff"
          label="Dropoff Location"
          placeholder="Enter destination address"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          error={errors.dropoff}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Cab Type
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cabTypes.map((cab) => (
            <Card 
              key={cab.id}
              className={`transition-all cursor-pointer ${
                selectedCabType === cab.id 
                  ? 'ring-2 ring-yellow-500' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCabType(cab.id)}
            >
              <div className="flex flex-col items-center">
                <img 
                  src={cab.image} 
                  alt={cab.name} 
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-gray-800">{cab.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">{cab.description}</p>
                <div className="mt-2 text-yellow-600 font-medium">
                  Base fare: ${cab.basePrice}
                </div>
              </div>
            </Card>
          ))}
        </div>
        {errors.cabType && (
          <p className="mt-1 text-sm text-red-600">{errors.cabType}</p>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={handleEstimateFare}
          variant="outline"
          isLoading={isEstimating}
          className="flex-1"
        >
          Estimate Fare
        </Button>
        
        <Button
          onClick={handleBookRide}
          variant="primary"
          isLoading={isBooking}
          disabled={!estimatedFare}
          className="flex-1"
        >
          Book Now
        </Button>
      </div>
      
      {estimatedFare !== null && estimatedDistance !== null && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Fare Estimate</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-xl font-semibold text-gray-800">{estimatedDistance} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Fare</p>
              <p className="text-xl font-semibold text-yellow-600">${estimatedFare}</p>
            </div>
            {selectedCab && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Cab Type</p>
                  <p className="font-medium text-gray-800">{selectedCab.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Per Kilometer</p>
                  <p className="font-medium text-gray-800">${selectedCab.pricePerKm}/km</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {errors.submit && (
        <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
      )}
    </div>
  );
};

export default BookingForm;