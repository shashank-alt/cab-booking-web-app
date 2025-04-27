import React, { useState } from 'react';
import { useBooking, Booking } from '../../contexts/BookingContext';
import Card from '../common/Card';
import { Users, Car, DollarSign, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Stats card component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  bgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  bgColor = 'bg-white'
}) => {
  return (
    <Card className={`${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-xs ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              <span className="mr-1">
                {trend === 'up' ? '↑' : '↓'}
              </span>
              {trendValue}
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-gray-100">
          {icon}
        </div>
      </div>
    </Card>
  );
};

// Dashboard status component
const AdminDashboard: React.FC = () => {
  const { getAllBookings } = useBooking();
  const bookings = getAllBookings();
  
  // Calculate stats
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const inProgressBookings = bookings.filter(b => b.status === 'in-progress').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  
  // Calculate total revenue from completed bookings
  const totalRevenue = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, booking) => sum + booking.fare, 0);
  
  // Simplified stats with simulated trends
  const stats = [
    { 
      title: 'Total Users', 
      value: '24', 
      icon: <Users className="h-6 w-6 text-blue-500" />,
      trend: 'up' as const,
      trendValue: '12% from last month'
    },
    { 
      title: 'Total Rides', 
      value: totalBookings, 
      icon: <Car className="h-6 w-6 text-yellow-500" />,
      trend: 'up' as const,
      trendValue: '8% from last month'
    },
    { 
      title: 'Revenue', 
      value: `$${totalRevenue}`, 
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      trend: 'up' as const,
      trendValue: '23% from last month'
    },
    { 
      title: 'Pending Rides', 
      value: pendingBookings, 
      icon: <Clock className="h-6 w-6 text-orange-500" /> 
    }
  ];
  
  // Recent bookings (just first 5)
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">ID</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">Pickup</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">Dropoff</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">Fare</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-2 px-3 text-sm">{booking.id}</td>
                    <td className="py-2 px-3 text-sm truncate max-w-[120px]">{booking.pickup.address}</td>
                    <td className="py-2 px-3 text-sm truncate max-w-[120px]">{booking.dropoff.address}</td>
                    <td className="py-2 px-3">
                      <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${
                        booking.status === 'completed' ? 'bg-green-50 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                        booking.status === 'in-progress' ? 'bg-blue-50 text-blue-600' :
                        'bg-yellow-50 text-yellow-600'
                      }`}>
                        {booking.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {booking.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                        {booking.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {booking.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                        <span className="capitalize">{booking.status}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 text-sm">${booking.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((completedBookings / totalBookings) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(completedBookings / totalBookings) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((inProgressBookings / totalBookings) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(inProgressBookings / totalBookings) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((pendingBookings / totalBookings) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(pendingBookings / totalBookings) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;