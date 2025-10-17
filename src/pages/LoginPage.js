import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 💡 Add your login logic here (e.g., API call, Redux dispatch)
    console.log("Login Data:", formData);
    alert(`Attempting login for: ${formData.email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Welcome Back!
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white transition duration-150 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Link to Sign Up */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup" // Adjust this path based on your React Router setup
            className="font-medium text-red-600 hover:text-red-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;