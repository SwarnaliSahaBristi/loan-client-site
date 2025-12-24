import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            LoanLink
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Simplifying loans for everyone. Fast approvals, low rates, and total transparency – empowering your financial journey.
          </p>
          <div className="flex space-x-4 mt-4 text-gray-700 dark:text-gray-300">
            <a href="#" className="hover:text-pink-400 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-400 transition-colors"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-pink-400 transition-colors"><FaInstagram /></a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-pink-400 transition-colors">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-pink-400 transition-colors">About Us</Link></li>
            <li><Link to="/loans" className="hover:text-pink-400 transition-colors">Loans</Link></li>
            <li><Link to="/contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-pink-400 transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact & Copy */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>Email: support@loanlink.com</p>
          <p>Phone: +1 234 567 890</p>
          <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-pink-300 dark:border-purple-500 pt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        Designed with ❤️ for modern borrowers
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
