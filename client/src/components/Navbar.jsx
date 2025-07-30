import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className="w-full fixed top-0 left-0  bg-gray-900 z-50 ">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4 overflow-hidden">
        
        <span className="text-3xl font-semibold text-white whitespace-nowrap">
          myTube
        </span>

        {/* Search bar */}
        <div className="flex-row overflow-hidden flex border-1 rounded-sm border-gray-700 mx-6 max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1rounded border-none outline-none text-gray-100"
          />
          <button className='bg-blue-600 px-3 py-1  text-white hover:bg-blue-800'>search</button>
        </div>

        <div className='flex flex-row'>
          <button
            className="bg-blue-600 px-3 py-1 mx-2 text-center text-white hover:bg-blue-800 rounded"
            onClick={logout}
          >
            upload video
          </button>
          <button
            className="bg-red-600 px-3 mx-2 py-1 text-center text-white hover:bg-red-800 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
