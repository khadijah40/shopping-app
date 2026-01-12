import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="w-full md:w-auto">
              <h3 className="text-xl sm:text-2xl font-light mb-2">
                Stay in Style
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Subscribe for exclusive offers and latest trends
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-800 focus:border-white focus:outline-none rounded-sm w-full sm:flex-1 md:w-80 text-sm sm:text-base"
              />
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 text-black hover:bg-yellow-400 transition-colors rounded-sm font-medium text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 tracking-wider">
              FASHION
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Elevating your wardrobe with timeless pieces and contemporary
              designs that define modern elegance.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-4 sm:mb-6 tracking-widest">
              SHOP
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Women
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-4 sm:mb-6 tracking-widest">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors block"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-medium mb-4 sm:mb-6 tracking-widest">
              CONTACT
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                />
                <span className="leading-relaxed">
                  123 Fashion Ave, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone
                  size={16}
                  className="flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                />
                <a
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail
                  size={16}
                  className="flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                />
                <a
                  href="mailto:hello@fashion.com"
                  className="hover:text-white transition-colors"
                >
                  hello@fashion.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Fashion. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <a
              href="#"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
