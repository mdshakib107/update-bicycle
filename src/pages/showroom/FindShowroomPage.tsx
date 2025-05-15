import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import { MapPin } from "lucide-react";
import React from "react";

const FindShowroomPage: React.FC = () => {
  return (
    <div className="w-full space-y-16">
      {/* Navbar */}
      <ResponsiveNavbar />
      <div className="min-h-screen container mx-auto space-y-6 sm:space-y-8 lg:space-y-12 sm:px-6 px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E0E7FF] text-[#4F46E5] px-4 py-2 rounded-full font-semibold mb-4 animate-pulse">
            <MapPin className="w-5 h-5" />
            Visit Us Nearby
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent mb-4">
            Find Our Nearest Showroom
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Discover RideVibe showrooms near you. Drop by to test ride, explore
            models, or get expert support.
          </p>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-100 via-blue-400 to-purple-300 text-white py-16 rounded-4xl">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Find Our Nearest Showroom
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
              Discover our showrooms near you and experience our bicycles
              firsthand.
            </p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter your city or zip code"
                className="w-full px-4 py-3 rounded-full text-gray-700 shadow-md focus:outline-none"
              />
              <button className="absolute right-2 top-1 px-4 py-2 bg-[#4F46E5] text-white rounded-full">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Map & Showroom List */}
        <section className="container mx-auto py-16 w-full">
          <div className="!rounded-4xl ">
            {/* Map */}
            <div className="relative">
              <div className="w-full h-80 bg-gray-300 rounded-lg shadow-lg">
                {/* Embed your map here */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
              <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg">
                <button className="text-green-600">Use My Location</button>
              </div>
            </div>
          </div>
        </section>

        {/* Showroom Locations */}
        <div className="space-y-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white border shadow-purple-300 border-purple-300 p-6 rounded-lg hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-[#4F46E5] mb-1">
                {location.city}
              </h2>
              <p className="text-gray-700">{location.address}</p>
              <p className="text-gray-500">Open: Mon–Sat, 9 AM – 6 PM</p>
              <p className="text-gray-500 text-sm">{location.phone}</p>
              <a
                href="tel:+1234567890"
                className="text-[#4F46E5] hover:underline"
              >
                Call Now
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 text-sm text-gray-500">
          Last updated: <strong>{new Date().toLocaleDateString()}</strong>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};

const locations = [
  {
    city: "RideVibe Downtown",
    address: "123 Main St, Downtown City",
    phone: "(212) 555-1234",
  },
  {
    city: "New York City",
    address: "123 Broadway Ave, Manhattan, NY 10001",
    phone: "(212) 555-1234",
  },
  {
    city: "Los Angeles",
    address: "456 Sunset Blvd, Los Angeles, CA 90026",
    phone: "(323) 555-5678",
  },
  {
    city: "Chicago",
    address: "789 Michigan Ave, Chicago, IL 60611",
    phone: "(312) 555-9012",
  },
];

export default FindShowroomPage;
