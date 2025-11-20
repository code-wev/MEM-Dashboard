"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { AiOutlineAppstore } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { LuMailPlus } from "react-icons/lu";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiMagicWandLight } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Sidebar({ className = "" }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineAppstore size={20} />, path: "/" },
    { name: "Payments", icon: <FaRegEnvelope size={20} />, path: "/payments" },
    { name: "Send Email", icon: <LuMailPlus size={20} />, path: "/send-email" },
    {
      name: "Emails Logs",
      icon: <MdOutlineMarkEmailRead size={20} />,
      path: "/email-logs",
    },
    { name: "AI Assistant", icon: <PiMagicWandLight size={20} />, path: "/ai" },
    {
      name: "Notifications",
      icon: <IoNotificationsOutline size={20} />,
      path: "/notifications",
    },
  ];

  const isActive = (path) => pathname === path;

  return (
      <aside
      className={`h-screen w-[280px] bg-[#00796B] flex flex-col items-center text-[#DFDAB7] shadow-lg ${className}`}>
      {/* Logo Section */}
      <div className="flex flex-col items-center pt-6 pb-3">
        <Image src="/logo.png" alt="MEM Logo" width={85} height={85} />

        <h2 className="text-[17px] text-white font-semibold mt-2 tracking-wide">
          MEM Design Build
        </h2>

        <p className="text-[12px] leading-tight opacity-90 text-center w-[170px]">
          Transforming House Into Dream Homes
        </p>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[#DFDAB7] mt-3"></div>

      {/* Menu Items */}
      <nav className="w-full mt-4 px-4 space-y-3">
        {menuItems.map((item, i) => {
          const active = isActive(item.path);

          return (
            <Link href={item.path} key={i}>
              <div
                className={`flex items-center gap-3 px-4 py-[11px] rounded-md cursor-pointer transition-all duration-200
                    ${active ? "bg-white/20" : "hover:bg-white/10"}
                `}
              >
                <span
                  className={`text-[20px] ${
                    active ? "text-white" : "text-[#DFDAB7]"
                  }`}
                >
                  {item.icon}
                </span>

                <span
                  className={`text-[15px] ${
                    active ? "text-white font-semibold" : "text-[#DFDAB7]"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
