import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API_URL } from "./config";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { getCartCount, getFavoritesCount } = useCart();
  const cartCount = getCartCount();
  const favoritesCount = getFavoritesCount();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
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
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
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
    setUser(null);
    setShowProfileMenu(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };
    if (menuOpen || showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, showProfileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "PRODUCTS", to: "/ProductCards" },
    { label: "FASHION", to: "/fashion" },
    { label: "FAVOURITE", to: "/favorites" },
    { label: "LIFESTYLE", to: "/lifestyle" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between h-[70px]">
        <Link
          to="/"
          className="flex items-center text-black no-underline font-bold text-lg sm:text-xl tracking-wide transition-transform hover:scale-105"
        >
          <span className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-2.5 flex items-center justify-center bg-black rounded-sm rotate-45">
            <span className="-rotate-45 text-white text-sm sm:text-base font-black">
              F
            </span>
          </span>
          FASHION
        </Link>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3">
          {/* Cart Icon - Mobile */}
          <button
            onClick={() => navigate("/cart")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="sm:w-[18px] sm:h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-yellow-400 text-black text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="text-black text-xl sm:text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex list-none m-0 p-0 gap-12 items-center">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className="animate-fadeInDown"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={item.to}
                onClick={() => setActiveItem(item.label)}
                className={`relative no-underline text-xs font-medium tracking-wider uppercase py-2 inline-block transition-colors duration-300 group ${
                  activeItem === item.label
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${
                    activeItem === item.label
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-3">
          {/* Favorites Icon - Desktop */}
          <button
            onClick={() => navigate("/favorites")}
            className="w-9 h-9 rounded-sm bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Icon - Desktop */}
          <button
            onClick={() => navigate("/cart")}
            className="w-9 h-9 rounded-sm bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                {user.email.charAt(0).toUpperCase()}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Manage your account
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="bg-black text-white px-6 py-2 rounded-sm 
              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              SIGN UP
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease both;
        }
      `}</style>
      {menuOpen && (
        <ul
          ref={menuRef}
          className="flex flex-col items-center gap-4 sm:gap-6 mt-4 md:hidden border-b border-gray-200 shadow-md bg-white py-4"
        >
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                onClick={() => {
                  setActiveItem(item.label);
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-black uppercase text-sm no-underline"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-black uppercase text-sm no-underline"
                >
                  {user.email}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 text-white px-5 sm:px-6 py-2 rounded-sm text-sm"
                >
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-black text-white px-5 sm:px-6 py-2 rounded-sm text-sm no-underline"
              >
                SIGN UP
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Header;
