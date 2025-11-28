import React, { useState } from "react";
import { Link } from "react-router-dom";

interface UserData {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log("Signup success:", data);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/** Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="username"
              type="text"
              value={userData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/** Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/** Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-xl hover:bg-yellow-700 transition font-medium"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
