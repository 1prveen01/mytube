// components/Sidebar.jsx
import React from 'react';
import { FaHome } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    return (
        <aside className="fixed top-16  left-0 w-64 h-[calc(100vh-4rem)]  flex flex-col justify-between bg-gray-900 text-white p-4 z-40">
            <ul className="space-y-6 mt-4 ">
                <NavLink to="/" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer 
                   hover:bg-gray-400 hover:text-gray-900
                     ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <FaHome />
                    <span className='mx-2'>Home</span>
                </NavLink>
                <NavLink to="/liked" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer 
                   hover:bg-gray-400 hover:text-gray-900
                  ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <BiSolidLike />
                    <span className='mx-2'>Liked Videos</span>
                </NavLink>

                <NavLink to="/" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer 
                   hover:bg-gray-400 hover:text-gray-900
                     ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <FaHistory />
                    <span className='mx-2'>History</span>
                </NavLink>             
                
                   <NavLink to="/liked" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer 
                     hover:bg-gray-400 hover:text-gray-900
                    ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <MdSubscriptions />
                    <span className='mx-2'>My Channel</span>
                </NavLink>
                <NavLink to="/liked" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer 
                     hover:bg-gray-400 hover:text-gray-900
                    ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <MdSubscriptions />
                    <span className='mx-2'>Subscriptions</span>
                </NavLink>
                <NavLink to="/liked" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer
                     hover:bg-gray-400 hover:text-gray-900
                     ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <BiSolidMessageSquareDetail />
                    <span className='mx-2'>Tweets</span>
                </NavLink>

            </ul>
            <ul className='space-y-6 mb-4'>
                <NavLink to="/liked" className={({ isActive }) =>
                    `flex items-center px-2 py-1 text-lg rounded-md cursor-pointer 
                     hover:bg-gray-400 hover:text-gray-900
                    ${isActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-white"}`}>
                    <BiSupport />
                    <span className='mx-2'>Support</span>
                </NavLink>

            </ul>
        </aside>
    );
};

export default Sidebar;
