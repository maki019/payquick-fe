import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ProtectedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onHamburgerClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          className={`
            fixed z-20 left-0 h-[calc(100vh-4rem)] w-60 p-4
            transform transition-transform duration-300
            md:relative md:translate-x-0
            ${sidebarOpen ? "top-0 h-full translate-x-0" : "-translate-x-full"}
          `}
        />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 p-1 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
