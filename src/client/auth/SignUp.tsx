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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log("Signup success:", data);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

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
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

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
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
