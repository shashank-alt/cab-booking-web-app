import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, MapPin, Star, Users, Award, TrendingUp } from 'lucide-react';
import Button from '../components/common/Button';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">About QuickRide</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to transform urban transportation with reliable, 
            affordable, and efficient cab services across the nation.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2020, QuickRide began with a simple idea: make transportation accessible, 
                affordable, and reliable for everyone. What started as a small operation in a single 
                city has grown into a nationwide service trusted by thousands of customers.
              </p>
              <p className="text-lg text-gray-600">
                Our team of dedicated professionals works tirelessly to ensure that every ride meets 
                our high standards of safety, comfort, and punctuality. We believe in creating value 
                not just for our customers, but also for our drivers and the communities we serve.
              </p>
              <div className="mt-8">
                <Link to="/book">
                  <Button variant="primary">Experience Our Service</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/1426516/pexels-photo-1426516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="QuickRide team" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission and Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At QuickRide, we're driven by core values that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">
                We prioritize the safety of our customers and drivers above all else, with rigorous 
                screening processes and regular vehicle inspections.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">
                When you book a QuickRide, you can count on us to be there on time, every time, 
                with no compromises on quality or service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-50 rounded-full mb-4">
                <Users className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in building strong relationships with the communities we serve, 
                creating job opportunities and supporting local initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-yellow-100">Cities Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-yellow-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p className="text-yellow-100">Drivers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <p className="text-yellow-100">Rides Completed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate team behind QuickRide's success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="CEO" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Robert Johnson</h3>
                <p className="text-yellow-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600">
                  With over 15 years in transportation and technology, Robert founded QuickRide with a vision to revolutionize urban mobility.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="COO" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Williams</h3>
                <p className="text-yellow-600 mb-3">Chief Operations Officer</p>
                <p className="text-gray-600">
                  Sarah oversees the day-to-day operations, ensuring that every ride meets our high standards of quality and efficiency.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="CTO" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">David Chen</h3>
                <p className="text-yellow-600 mb-3">Chief Technology Officer</p>
                <p className="text-gray-600">
                  David leads our tech team, developing innovative solutions that make the QuickRide experience seamless for both customers and drivers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say About Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from some of our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I've been using QuickRide for over a year now, and I'm consistently impressed by the 
                quality of service. The drivers are professional, the cars are clean, and the app is 
                so easy to use. It's my go-to for transportation in the city!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Customer" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                "As a business traveler, I need reliable transportation that I can count on. 
                QuickRide has never let me down. The premium service is worth every penny, 
                and the drivers are always prompt and courteous. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Customer" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">James Wilson</h4>
                  <p className="text-sm text-gray-500">Sales Executive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience QuickRide?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who rely on QuickRide for their daily transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0">
            <Link to="/book">
              <Button variant="secondary" size="lg">
                Book Your First Ride
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white text-white">
                Sign Up Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;