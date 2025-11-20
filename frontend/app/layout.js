"use client";

import "./globals.css";
import Sidebar from "@/components/Layout/Sidebar";
import TopBar from "@/components/Layout/TopBar";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] antialiased">
        <div className="flex max-w-[2040px] mx-auto">
          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block h-screen sticky top-0">
            <Sidebar />
          </div>

          {/* MOBILE SIDEBAR (slide-in) */}
          <div
            className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 lg:hidden
              ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar />
          </div>

          {/* MOBILE OVERLAY */}
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 h-screen overflow-y-auto px-8 py-4 no-scrollbar">
            <TopBar onOpenSidebar={() => setMobileSidebarOpen(true)} />
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
