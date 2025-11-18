import React from "react";
import { Link } from "react-router-dom";
import { Menu, LogOut, Image as ImageIcon, Home, Utensils } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 classname="text-2xl font-semibold text-gray-800">FoodMind</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-gray-700">
          <Link 
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Home size={18} />
            Overview
          </Link>

          <Link 
            to="/upload"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <ImageIcon size={18} />
            Upload Ingredient / Image
          </Link>

          <Link 
            to="/recipes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Utensils size={18} />
            My Recipes
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="bg-white h-16 border-b border-gray-200 px-6 flex items-center justify-between">
          <button className="md:hidden">
            <Menu size={24} />
          </button>

          <h2 className="text-xl font-medium text-gray-800">Dashboard</h2>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Total Recipes</h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">24</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Images Uploaded</h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">13</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Last Active</h3>
              <p className="text-lg font-medium mt-2 text-gray-800">
                Today, 11:30 AM
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>

            <ul className="space-y-3 text-gray-700">
              <li className="border-b pb-3">Uploaded an ingredient image</li>
              <li className="border-b pb-3">Generated recipe suggestions</li>
              <li className="border-b pb-3">Edited profile information</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
