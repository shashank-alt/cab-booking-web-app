import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Check, Star, Clock, MapPin, Shield, Phone, Mail } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Get to your destination quickly and safely
              </h1>
              <p className="text-xl mb-8 text-yellow-50">
                Book your ride in seconds. Choose from a variety of cab options and enjoy a comfortable journey.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/book">
                  <Button variant="secondary" size="lg">
                    Book a Ride
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Taxi on the street" 
                className="rounded-lg shadow-2xl max-h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose QuickRide?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a seamless experience from booking to arrival at your destination.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">
                Our drivers reach you quickly and get you to your destination on time, every time.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                All our drivers are verified, and our vehicles regularly undergo maintenance checks.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-50 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Anywhere, Anytime</h3>
              <p className="text-gray-600">
                Our service is available 24/7 in all major cities. Book a ride whenever you need.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cab Types section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Ride</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a variety of vehicle types to meet your needs and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Economy" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Economy</h3>
                <p className="text-gray-600 mb-4">
                  Affordable rides for up to 3 passengers. Perfect for daily commutes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600 font-bold">From $50</span>
                  <Link to="/book">
                    <Button variant="outline" size="sm">
                      Book Now <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Premium" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-gray-600 mb-4">
                  Comfortable sedans for up to 4 passengers. Great for business trips.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600 font-bold">From $80</span>
                  <Link to="/book">
                    <Button variant="outline" size="sm">
                      Book Now <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="SUV" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">SUV</h3>
                <p className="text-gray-600 mb-4">
                  Spacious vehicles for up to 6 passengers. Ideal for group travel.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600 font-bold">From $120</span>
                  <Link to="/book">
                    <Button variant="outline" size="sm">
                      Book Now <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-700 mb-4">
                "I use QuickRide every day for my commute to work. The drivers are always on time and professional. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Customer" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Brown</h4>
                  <p className="text-sm text-gray-500">Regular Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-700 mb-4">
                "The premium service is worth every penny. Clean cars, courteous drivers, and a smooth booking experience. My go-to cab service!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Customer" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Jessica Wilson</h4>
                  <p className="text-sm text-gray-500">Premium Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5" />
              </div>
              <p className="text-gray-700 mb-4">
                "I needed a cab for a group trip, and the SUV service was perfect. Easy to book, plenty of space, and the driver was great."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Customer" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">David Johnson</h4>
                  <p className="text-sm text-gray-500">Business Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app or book a ride online now. Experience the QuickRide difference today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/book">
              <Button variant="secondary" size="lg">
                Book Now
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-white text-white">
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is here to help.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-gray-50 p-6 rounded-lg h-full">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+1 (800) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@quickride.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        123 Ride Street, Suite 100<br />
                        Transit City, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;