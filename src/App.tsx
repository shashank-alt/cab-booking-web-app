import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import UserDashboardPage from './pages/UserDashboardPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/book" element={<BookingPage />} />
                <Route path="/booking/confirmation/:id" element={<BookingConfirmationPage />} />
                <Route path="/booking/:id" element={<BookingDetailsPage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/driver/dashboard" element={<DriverDashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;