
import React from "react";
import { Calendar, Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-[#F9FAFB] py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6" />
              <span className="text-xl font-bold">Vignan's Event Spark</span>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Vignan's Event Spark is the official event management platform for Vignan's Institute of Information Technology. 
              We connect students with campus events, workshops, seminars, and cultural activities.
              Your one-stop platform for campus events and activities.
              Stay connected, stay informed.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-[#06B6D4] hover:text-[#F97316] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#06B6D4] hover:text-[#F97316] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#06B6D4] hover:text-[#F97316] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-[#F97316] transition-colors">Home</a>
              </li>
              <li>
                <a href="/events" className="hover:text-[#F97316] transition-colors">All Events</a>
              </li>
              <li>
                <a href="/login" className="hover:text-[#F97316] transition-colors">Login</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F97316] transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#06B6D4]" />
                <span>Vignan's Institute Of Information Technology, Near Vsez Duvvada</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#06B6D4]" />
                <span>7013300517</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#06B6D4]" />
                <span>eventsphere7@gmail.com</span>
              </li>
            </ul>
            
            <div className="mt-4 rounded-lg overflow-hidden border-2 border-[#06B6D4]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.322977758189!2d83.16636987387694!3d17.747069893199133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9c20773c86b01!2sVignan&#39;s%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1713136781208!5m2!1sen!2sin" 
                width="100%" 
                height="150" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Vignan's Event Spark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
