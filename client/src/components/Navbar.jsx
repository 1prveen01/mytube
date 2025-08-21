import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleSearch = () => {
    console.log("Search:", searchTerm);
    // Add your search logic here
  };

  // Auto-focus the input when it opens
  useEffect(() => {
    if (isMobileSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-900 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Burger Menu (mobile only) */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={onMenuClick}
          >
            <FiMenu />
          </button>

          {/* Logo */}
          {!isMobileSearchOpen && (
            <span className="text-2xl md:text-3xl font-semibold text-white whitespace-nowrap">
              myTube
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center md:justify-start mx-4">
          {/* Desktop Search */}
          <div className="hidden md:flex flex-row border rounded-sm border-gray-700 w-full max-w-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 border-none outline-none text-gray-100 bg-transparent"
            />
            <button
              className="bg-blue-600 px-3 py-1 text-white hover:bg-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Mobile Search Input */}
          {isMobileSearchOpen && (
            <div className="flex flex-1 items-center border rounded-sm border-gray-700 overflow-hidden md:hidden w-full">
              <input
                type="text"
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-3 py-1 text-white outline-none"
              />
              <button
                className="bg-blue-600 px-3 py-1 text-white hover:bg-blue-800"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="px-2 text-white text-xl"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <FiX />
              </button>
            </div>
          )}
        </div>

       
        {!isMobileSearchOpen && (
          <div className="flex items-center gap-2">
            {/* Mobile Search Icon */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <FiSearch />
            </button>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-2">
              <button
                className="bg-gray-600 px-3 py-1 flex items-center gap-1 text-white hover:bg-gray-700 rounded"
                onClick={() => navigate("/playlist")}
              >
                <IoAddSharp className="text-xl" />
                <span>Create</span>
              </button>
              <button
                className="bg-blue-600 px-3 py-1 text-white hover:bg-blue-800 rounded"
                onClick={() => navigate("/publishPage")}
              >
                Upload video
              </button>
              <button
                className="bg-red-600 px-3 py-1 text-white hover:bg-red-800 rounded"
                onClick={() => {
                  logout();
                  navigate("/login")
                }}
                
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
