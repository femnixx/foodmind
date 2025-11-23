import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <Navbar />
      {/* Add main content here */}
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center">Welcome to FoodMind</h1>
      </main>
    </div>
  );
};

export default HomePage;
