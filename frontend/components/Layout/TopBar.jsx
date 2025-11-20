"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import Link from "next/link";

export default function TopBar({ onOpenSidebar }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] shadow-[0px_4px_12px_0px_#0000001A] rounded-xl px-6 py-4 flex items-center justify-between relative">
      {/* LEFT SIDE: MOBILE MENU BUTTON */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 text-[#00796B]"
          onClick={onOpenSidebar}
        >
          <FiMenu size={24} />
        </button>

        <h2 className="text-[#000000] hidden md:flex text-2xl font-semibold">Dashboard</h2>
      </div>

      {/* RIGHT SIDE: PROFILE DROPDOWN */}
      <div ref={menuRef} className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="flex flex-col leading-tight text-right">
            <span className="text-sm font-semibold text-[#000000]">
              Alamin Khan
            </span>
            <span className="text-xs text-gray-500 -mt-1">Admin</span>
          </div>

          <FiChevronDown
            size={18}
            className={`text-gray-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl p-2 z-50 border border-gray-100">
            <Link
              href="/profile"
              className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            >
              Profile
            </Link>
            <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
