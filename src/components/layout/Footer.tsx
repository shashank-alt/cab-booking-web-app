import React from 'react';
import { Car, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold">QuickRide</span>
            </div>
            <p className="mt-4 text-gray-300">
              Premium cab services that gets you there safely, quickly, and comfortably.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-500 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-300 hover:text-yellow-500 transition duration-300">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-500 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-yellow-500 transition duration-300">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-yellow-500 transition duration-300">
                <a href="#">City Rides</a>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition duration-300">
                <a href="#">Airport Transfers</a>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition duration-300">
                <a href="#">Outstation Trips</a>
              </li>
              <li className="text-gray-300 hover:text-yellow-500 transition duration-300">
                <a href="#">Corporate Services</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2 text-yellow-500" />
                <a href="mailto:info@quickride.com" className="hover:text-yellow-500">
                  info@quickride.com
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={18} className="mr-2 text-yellow-500" />
                <a href="tel:+18005551234" className="hover:text-yellow-500">
                  +1 (800) 555-1234
                </a>
              </li>
              <li className="text-gray-300 mt-2">
                123 Ride Street, Suite 100<br />
                Transit City, NY 10001
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} QuickRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;