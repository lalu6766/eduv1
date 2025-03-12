import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-extrabold">
            <span className="block">Welcome to</span>
            <span className="block text-green-500 mt-2">Eduverse</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-sm md:text-base text-gray-400 md:mt-5 md:max-w-3xl">
            Your ultimate hub for IIT Madras BS in Data Science and Applications. Join our community
            of learners, access resources, and excel in your academic journey.
          </p>
          <div className="mt-8">
            <a
              href="https://chat.whatsapp.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-500 hover:bg-green-600 transition-colors duration-300"
            >
              Join Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}