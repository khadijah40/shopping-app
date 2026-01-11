import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // NEW: For navigation after signup

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // NEW: Loading state
  const [error, setError] = useState(""); // NEW: Error message
  const navigate = useNavigate(); // NEW: Navigation hook

  const handleEmailSubmit = async () => {
    // Clear previous error
    setError("");

    // Validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Make API call to backend
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If response is not OK, throw error with message
        throw new Error(data.message || "Signup failed");
      }

      // SUCCESS: Save token to localStorage
      localStorage.setItem('token', data.token);

      // Show success message
      alert("Signup successful! Welcome to Fashion.");

      // Clear form
      setEmail("");
      setPassword("");

      // Redirect to home page
      navigate('/');
      
      // Reload to update header
      window.location.reload();

    } catch (err) {
      // Show error message
      setError(err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create an account
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Enter your email below to create your account
        </p>

        {/* NEW: Error message display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            disabled={loading} // NEW: Disable during loading
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* NEW: Password input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 characters)"
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Submit button with loading state */}
          <button
            onClick={handleEmailSubmit}
            disabled={loading} // NEW: Disable during loading
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up with Email"}
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-4 text-sm text-gray-500">
              Already have an account?
            </span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* Login button */}
          <button
            onClick={handleLoginClick}
            disabled={loading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-900">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-900">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}