import React from "react";

const Profile = () => {
  const user = {
    name: "Surya",
    email: "surya@email.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    preferences: ["Halal", "No Peanuts", "Low Sugar"],
    uploads: 8,
    recipes: 21,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500">{user.email}</p>

            <div className="flex gap-4 mt-4 text-sm">
              <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                📸 {user.uploads} uploads
              </div>
              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                🍽️ {user.recipes} recipes
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Food Preferences
          </h2>
          <div className="flex flex-wrap gap-3">
            {user.preferences.map((pref, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition">
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition">
            View Recipe History
          </button>
          <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-xl transition">
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
