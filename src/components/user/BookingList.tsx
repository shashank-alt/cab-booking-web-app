import React, { useState, useEffect } from 'react';
import { useBooking, Booking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import BookingCard from '../booking/BookingCard';
import Select from '../common/Select';

interface BookingListProps {
  isAdmin?: boolean;
  isDriver?: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ isAdmin = false, isDriver = false }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { currentUser } = useAuth();
  const { 
    getUserBookings, 
    getDriverBookings, 
    getAllBookings, 
    updateBookingStatus, 
    cancelBooking 
  } = useBooking();

  // Load bookings based on user role
  useEffect(() => {
    if (!currentUser) return;
    
    let userBookings: Booking[] = [];
    
    if (isAdmin) {
      userBookings = getAllBookings();
    } else if (isDriver) {
      userBookings = getDriverBookings(currentUser.id);
    } else {
      userBookings = getUserBookings(currentUser.id);
    }
    
    setBookings(userBookings);
  }, [currentUser, isAdmin, isDriver, getUserBookings, getDriverBookings, getAllBookings]);

  // Handle status change
  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      if (newStatus === 'cancelled') {
        await cancelBooking(bookingId);
      } else {
        await updateBookingStatus(bookingId, newStatus, isDriver ? currentUser?.id : undefined);
      }
      
      // Refresh bookings
      if (isAdmin) {
        setBookings(getAllBookings());
      } else if (isDriver && currentUser) {
        setBookings(getDriverBookings(currentUser.id));
      } else if (currentUser) {
        setBookings(getUserBookings(currentUser.id));
      }
    } catch (err) {
      console.error('Failed to update booking status', err);
    }
  };

  // Filter bookings by status
  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Bookings' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div>
      <div className="mb-6">
        <Select
          id="statusFilter"
          label="Filter by Status"
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isAdmin={isAdmin}
              isDriver={isDriver}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;