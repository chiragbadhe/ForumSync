import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-100">
      <div className="flex items-center">
        <div className="w-12 h-12 relative">
          <Image src="/logo.png" layout="fill" objectFit="contain" alt="Logo" />
        </div>
        <div className="ml-2 text-xl font-bold">ForumSync</div>
      </div>
      <div className="flex items-center">
        <div className="relative flex-grow mr-2">
          <input
            className="w-full h-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-3 top-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l6-6m0 0l-6-6m6 6h-18" />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Sign In
          </button>
          <button className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
