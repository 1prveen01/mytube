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

  useEffect(() => {
    if (isMobileSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-900 z-50">
      <div className="max-w-[1440px] mx-auto grid grid-cols-3 items-center px-4 py-3">
        
        
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white text-2xl"
            onClick={onMenuClick}
          >
            <FiMenu />
          </button>
          {!isMobileSearchOpen && (
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer text-2xl md:text-3xl font-semibold text-white whitespace-nowrap"
            >
              myTube
            </span>
          )}
        </div>

        
        <div className="flex justify-center">
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-row border rounded-sm border-gray-700 w-full max-w-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border-none outline-none text-gray-100 bg-transparent"
            />
            <button
              type="submit"
              className="bg-blue-600 px-3 py-1 text-white hover:bg-blue-800"
            >
              Search
            </button>
          </form>

          {/* Mobile Search  */}
          {isMobileSearchOpen && (
            <form
              onSubmit={handleSearch}
              className="flex flex-1 items-center border rounded-sm border-gray-700 overflow-hidden md:hidden w-full"
            >
              <input
                type="text"
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-3 py-1 text-white outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 px-3 py-1 text-white hover:bg-blue-800"
              >
                Search
              </button>
              <button
                type="button"
                className="px-2 text-white text-xl"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <FiX />
              </button>
            </form>
          )}
        </div>

        
        <div className="flex justify-end items-center gap-2">
          {/* Mobile Search Icon */}
          {!isMobileSearchOpen && (
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <FiSearch />
            </button>
          )}

          {/* Desktop Buttons */}
          {!isMobileSearchOpen && (
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
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
