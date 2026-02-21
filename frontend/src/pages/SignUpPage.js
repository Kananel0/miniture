import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "", // Matches your Backend User model
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handles updating the state when a user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation: Match passwords
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // 2. The API Call to your Node.js server
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Redirecting to login...");
        navigate("/login"); // Redirect user to login page
      } else {
        // Display error message from backend (e.g., "Email already exists")
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Could not connect to the server. Is your backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Your Account
        </h2>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="Full Name or Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold transition duration-150 rounded-lg ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;