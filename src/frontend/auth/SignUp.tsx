import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const payload = { 
    username,
    email,
    password
  }

  const handleSubmit = async () => {
    try { 
      const response = await fetch("http://localhost:5000/api/auth/sign-up", {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      console.log("Full response object: ", response);
      alert("Sign up successful!")
    } catch (err) { 
      console.log("Submit Error: ", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

          <div className="flex flex-col gap-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="username"
                type="text"
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
                placeholder="Enter a strong password"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-xl hover:bg-yellow-700 transition font-medium"
            >
              Sign Up
            </button>
          </div>

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
