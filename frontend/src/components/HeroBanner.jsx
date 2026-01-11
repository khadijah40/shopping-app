import React from "react";
import { useNavigate } from "react-router-dom";
import heroimage from "../assets/heroimage.jpg";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gray-50 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span
          className="absolute top-8 left-[15%] text-gray-300 text-2xl animate-pulse"
          style={{ animationDelay: "0s" }}
        >
          ✦
        </span>
        <span
          className="absolute top-12 left-[25%] text-gray-200 text-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          ✦
        </span>
        <span
          className="absolute top-20 right-[20%] text-gray-300 text-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          ✦
        </span>
        <span
          className="absolute top-32 right-[35%] text-gray-200 text-xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-20 left-[10%] text-gray-300 text-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-32 right-[15%] text-gray-200 text-xl animate-pulse"
          style={{ animationDelay: "2.5s" }}
        >
          ✦
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 z-10 animate-fadeInLeft">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
              <span
                className="block text-black animate-slideInUp"
                style={{ animationDelay: "0.1s" }}
              >
                LET'S
              </span>
              <span
                className="block text-black animate-slideInUp"
                style={{ animationDelay: "0.2s" }}
              >
                EXPLORE
              </span>
              <span
                className="relative inline-block animate-slideInUp"
                style={{ animationDelay: "0.3s" }}
              >
                <span className="relative z-10 text-black px-4">UNIQUE</span>
                <span className="absolute inset-0 bg-yellow-400 -skew-x-2 animate-expandWidth"></span>
              </span>
              <span
                className="block text-black animate-slideInUp"
                style={{ animationDelay: "0.4s" }}
              >
                CLOTHES.
              </span>
            </h1>

            <button
              onClick={() => navigate("/cart")}
              className="bg-black text-white px-8 py-3 text-xs font-bold tracking-wider uppercase hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 animate-fadeIn"
              style={{ animationDelay: "0.8s" }}
            >
              SHOP NOW
            </button>
          </div>
          <div className="flex-1 relative animate-fadeInRight">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-[400px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-100 to-pink-100 rounded-[40px] transform rotate-3"></div>

                <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={heroimage}
                    alt="Fashion Collection"
                    className="absolute inset-0  h-full "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-60 h-60 bg-yellow-300 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
              <div
                className="absolute -top-12 -left-12 w-48 h-48 bg-pink-300 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expandWidth {
          from {
            transform: scaleX(0) skewX(-2deg);
          }
          to {
            transform: scaleX(1) skewX(-2deg);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-expandWidth {
          animation: expandWidth 0.8s ease-out 0.3s forwards;
          transform-origin: left;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
