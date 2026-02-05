import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Profile load error:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
              {user?.email.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Your Profile
            </h1>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <span className="text-sm text-gray-600">{user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  User ID
                </span>
                <span className="text-xs text-gray-600">{user?.id}</span>
              </div>
              {user?.createdAt && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-700">
                    Member Since
                  </span>
                  <span className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
