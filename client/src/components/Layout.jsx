import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-60 transform bg-[#1E293B] border-r-2 border-green-600
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <div className="h-16 bg-[#1E293B] flex items-center">
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-black p-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
