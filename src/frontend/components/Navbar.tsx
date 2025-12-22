import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';
import { useEffect } from 'react';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [username, setUsername] = useState("User");
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">

      {isPopupOpen && <Popup onClose={togglePopup} />}

      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        <div className="text-xl font-bold">FoodMind</div>

        
        <div className="hidden sm:flex gap-x-6">
          <Link to="/home" className="hover:text-orange-500 transition">Home</Link>
          <Link to="/products" className="hover:text-orange-500 transition">Products</Link>
          <Link to="/about-us" className="hover:text-orange-500 transition">About Us</Link>
        </div>

        
        <div className={`${ localStorage.getItem("user") ? "hidden" : "flex"} hidden gap-x-4 items-center`}>
          <Link to="/sign-in" className="hover:text-orange-500 transition">Login</Link>
          <span className="border-l h-6 border-gray-300"></span>
          <Link to="/sign-up" className="hover:text-orange-500 transition">Signup</Link>
        </div>
        <button className={`${localStorage.getItem("user") ? "flex" : "hidden"} hover:cursor-pointer`}>Welcome, {username}!</button>
        
        <button
          className="sm:hidden p-2 border rounded-full hover:bg-gray-100 hover:border-yellow-500 hover:text-yellow-500 hover:cursor-pointer transition"
          onClick={togglePopup}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
