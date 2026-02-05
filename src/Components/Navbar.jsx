import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ theme }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className="
          flex items-center h-16 px-8
          backdrop-blur-xl
          bg-black/20
          border-b border-white/10
        "
      >
        {/* Logo (left) */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="Website logo"
              className="w-32 object-contain"
            />
          </Link>
        </div>

        {/* Centered nav links */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-8 text-sm text-white dark:text-white">
            <Link to="/" className="hover:text-purple-400 transition">
              Home
            </Link>

            <Link to="/movies" className="hover:text-purple-400 transition">
              Movies
            </Link>
            <Link to="/manga" className="hover:text-purple-400 transition">
            Manga
            </Link>

            

            <a href="#services" className="hover:text-purple-400 transition">
              Services
            </a>

            <a href="#contact-us" className="hover:text-purple-400 transition">
              Contact Us
            </a>
          </div>
        </div>

        {/* Right spacer */}
        <div className="w-32" />
      </nav>
    </header>
  );
};

export default Navbar;
