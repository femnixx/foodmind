import React from 'react';
import { Link } from 'react-router-dom';

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-5 gap-y-8">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">FoodMind</div>
        <button className="text-xl font-bold p-2 border rounded-full" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Menu Links */}
      <div className="flex flex-col gap-y-4 text-center text-lg">
        <Link to="/home" onClick={onClose} className="hover:text-orange-500 transition">Home</Link>
        <Link to="/products" onClick={onClose} className="hover:text-orange-500 transition">Products</Link>
        <Link to="/about-us" onClick={onClose} className="hover:text-orange-500 transition">About Us</Link>
      </div>

      {/* Auth Links */}
      <div className="flex flex-col gap-y-4 items-center">
        <Link to="/sign-in" onClick={onClose} className="px-6 py-2 border rounded hover:bg-gray-100 transition">Sign In</Link>
        <Link to="/sign-up" onClick={onClose} className="px-6 py-2 border rounded hover:bg-gray-100 transition">Sign Up</Link>
      </div>
    </div>
  );
};

export default Popup;
