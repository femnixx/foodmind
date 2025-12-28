import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';
import { useEffect } from 'react';
import { SquareStack } from 'lucide-react';

const Navbar = () => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const name = localStorage.getItem("username");

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
    })
    .then(res => {
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    })
    .then(user => setUsername(user.username))
    .catch(() => setUsername(""));
  }, []);

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

        
        <div className={`${username ? "hidden" : "flex"} gap-x-4 items-center`}>
          <Link to="/sign-in" className="hover:text-orange-500 transition">Login</Link>
          <span className="border-l h-6 border-gray-300"></span>
          <Link to="/sign-up" className="hover:text-orange-500 transition">Signup</Link>
        </div>

        <Link className={`${username ? "flex" : "hidden"}`} to="/profile">Welcome, {username}!</Link>
        
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
