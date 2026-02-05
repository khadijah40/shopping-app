import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../components/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      localStorage.setItem("token", data.token);

      alert("Login successful! Welcome back.");

      setEmail("");
      setPassword("");

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome back
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Enter your email to sign in to your account
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-4 text-sm text-gray-500">
              Don't have an account?
            </span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <button
            onClick={handleSignupClick}
            disabled={loading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
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
