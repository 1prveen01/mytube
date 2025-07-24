import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const { user , logout} = useAuth();
    
  return (
    <nav>
        <span className='text-2xl bg-purple-500 p-4 text-black'>Welcome, {user?.fullName} </span>
        <button className='bg-red-600 px-2 py-1 text-white hover:bg-red-800 ' onClick={logout}>Logout</button>
        navigate("/login")

    </nav>
  )
}

export default Navbar