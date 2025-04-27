import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth, User } from './AuthContext';

export interface Location {
  address: string;
  coordinates?: { lat: number; lng: number };
}

export interface CabType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  image: string;
}

export interface Booking {
  id: string;
  userId: string;
  driverId?: string;
  pickup: Location;
  dropoff: Location;
  cabType: CabType;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  fare: number;
  distance: number;
  date: string;
  createdAt: string;
}

interface BookingContextType {
  cabTypes: CabType[];
  bookings: Booking[];
  createBooking: (pickupLocation: Location, dropoffLocation: Location, cabTypeId: string) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: Booking['status'], driverId?: string) => Promise<void>;
  calculateFare: (distance: number, cabTypeId: string) => number;
  estimateDistance: (pickup: Location, dropoff: Location) => number;
  getUserBookings: (userId: string) => Booking[];
  getDriverBookings: (driverId: string) => Booking[];
  getBookingById: (bookingId: string) => Booking | undefined;
  getAllBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Sample cab types
const sampleCabTypes: CabType[] = [
  {
    id: '1',
    name: 'Economy',
    description: 'Affordable, compact rides for up to 3 passengers',
    basePrice: 50,
    pricePerKm: 8,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Comfortable sedans for up to 4 passengers',
    basePrice: 80,
    pricePerKm: 12,
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    name: 'SUV',
    description: 'Spacious rides for up to 6 passengers',
    basePrice: 120,
    pricePerKm: 15,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

// Generate some sample bookings
const generateSampleBookings = (): Booking[] => {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  return [
    {
      id: '1',
      userId: '1',
      driverId: '2',
      pickup: { address: '123 Main St, New York, NY' },
      dropoff: { address: '456 Broadway, New York, NY' },
      cabType: sampleCabTypes[0],
      status: 'completed',
      fare: 130,
      distance: 10,
      date: new Date(now.getTime() - oneDay * 2).toISOString(),
      createdAt: new Date(now.getTime() - oneDay * 2).toISOString()
    },
    {
      id: '2',
      userId: '1',
      pickup: { address: '789 Park Ave, New York, NY' },
      dropoff: { address: '101 5th Ave, New York, NY' },
      cabType: sampleCabTypes[1],
      status: 'pending',
      fare: 220,
      distance: 12,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      userId: '1',
      driverId: '2',
      pickup: { address: '300 Madison Ave, New York, NY' },
      dropoff: { address: '350 Park Ave, New York, NY' },
      cabType: sampleCabTypes[2],
      status: 'in-progress',
      fare: 180,
      distance: 5,
      date: new Date().toISOString(),
      createdAt: new Date(now.getTime() - oneDay).toISOString()
    }
  ];
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cabTypes] = useState<CabType[]>(sampleCabTypes);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on init
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      const initialBookings = generateSampleBookings();
      setBookings(initialBookings);
      localStorage.setItem('bookings', JSON.stringify(initialBookings));
    }
  }, []);

  // Save bookings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Simulate distance calculation
  const estimateDistance = (pickup: Location, dropoff: Location): number => {
    // In a real app, we'd use a mapping API
    // For demo, return a random distance between 2-30 km
    return Math.floor(Math.random() * 28) + 2;
  };

  // Calculate fare based on cab type and distance
  const calculateFare = (distance: number, cabTypeId: string): number => {
    const cabType = cabTypes.find(cab => cab.id === cabTypeId);
    if (!cabType) return 0;
    
    return Math.round(cabType.basePrice + (cabType.pricePerKm * distance));
  };

  // Create a new booking
  const createBooking = async (pickupLocation: Location, dropoffLocation: Location, cabTypeId: string): Promise<Booking> => {
    if (!currentUser) {
      throw new Error('User must be logged in to create a booking');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cabType = cabTypes.find(cab => cab.id === cabTypeId);
    if (!cabType) {
      throw new Error('Invalid cab type');
    }
    
    const distance = estimateDistance(pickupLocation, dropoffLocation);
    const fare = calculateFare(distance, cabTypeId);
    
    const newBooking: Booking = {
      id: `${bookings.length + 1}`,
      userId: currentUser.id,
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      cabType,
      status: 'pending',
      fare,
      distance,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  // Cancel a booking
  const cancelBooking = async (bookingId: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
  };

  // Update booking status
  const updateBookingStatus = async (bookingId: string, status: Booking['status'], driverId?: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status, ...(driverId ? { driverId } : {}) } 
          : booking
      )
    );
  };

  // Get bookings for specific user
  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter(booking => booking.userId === userId);
  };

  // Get bookings for specific driver
  const getDriverBookings = (driverId: string): Booking[] => {
    return bookings.filter(booking => booking.driverId === driverId);
  };

  // Get booking by ID
  const getBookingById = (bookingId: string): Booking | undefined => {
    return bookings.find(booking => booking.id === bookingId);
  };

  // Get all bookings (for admin)
  const getAllBookings = (): Booking[] => {
    return bookings;
  };

  const value = {
    cabTypes,
    bookings,
    createBooking,
    cancelBooking,
    updateBookingStatus,
    calculateFare,
    estimateDistance,
    getUserBookings,
    getDriverBookings,
    getBookingById,
    getAllBookings
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};