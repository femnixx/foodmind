import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      {/* Popup for small screens */}
      {isPopupOpen && <Popup onClose={togglePopup} />}

      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        <div className="text-xl font-bold">FoodMind</div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-x-6">
          <Link to="/home" className="hover:text-orange-500 transition">Home</Link>
          <Link to="/products" className="hover:text-orange-500 transition">Products</Link>
          <Link to="/about-us" className="hover:text-orange-500 transition">About Us</Link>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden sm:flex gap-x-4 items-center">
          <Link to="/sign-in" className="hover:text-orange-500 transition">Login</Link>
          <span className="border-l h-6 border-gray-300"></span>
          <Link to="/sign-up" className="hover:text-orange-500 transition">Signup</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 border rounded-full hover:bg-gray-100 transition"
          onClick={togglePopup}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
