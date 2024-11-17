import React from 'react';
import { FaBullseye, FaRegSmile } from 'react-icons/fa';

export default function About() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto h-full bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-6 hover:text-red-500 transition duration-300">
          About <span className="text-black"><span className="text-red-500">Campus</span>Nest</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Discover a new way to find, rent, and manage properties tailored to your needs. Transparency and convenience are our priorities.
        </p>
      </div>


      <div className="grid gap-8 md:grid-cols-2">
    
        <div className="space-y-6 p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-3">
            <FaBullseye className="text-red-500 text-3xl" />
            <h2 className="text-2xl font-semibold text-slate-800 hover:text-blue-600 transition duration-300">
              Our Mission
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Our mission is to help clients achieve their real estate goals by providing the best properties and new-gen features like map-based search, virtual tours, and more.
            Whether buying, selling, or renting, we're here to guide you.
          </p>
        </div>

  
        <div className="space-y-6 p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-3">
            <FaRegSmile className="text-blue-500 text-3xl" />
            <h2 className="text-2xl font-semibold text-slate-800 hover:text-blue-600 transition duration-300">
              Why Choose Us
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">
            With years of experience and a customer-first approach, we strive to make every transaction seamless and rewarding.
            From initial inquiries to final agreements, we’re committed to your satisfaction.
          </p>
        </div>
      </div>

  
      <div className="mt-16 flex flex-col items-center">
        <p className="text-lg text-slate-700 text-center max-w-2xl leading-relaxed">
          Let us help you find your next home. Explore the most desirable neighborhoods, compare properties,
          and enjoy unparalleled customer service.
        </p>
        <button
          onClick={() => alert('We are working on it! Thank you')}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
