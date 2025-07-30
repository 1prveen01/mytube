import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
            {/* Sidebar - fixed width */}
            <div className="w-60 border-2 border-green-600 bg-[#1E293B]">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div className="h-16 bg-[#1E293B]">
                    <Navbar />
                </div>

                {/* Page Content */}
                <main className="flex-1 flex  overflow-auto bg-black">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
