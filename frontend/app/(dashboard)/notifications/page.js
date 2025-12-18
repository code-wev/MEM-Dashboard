"use client";

import React, { useState } from "react";
import { FiCheckCircle, FiAlertTriangle, FiMail } from "react-icons/fi";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "payment",
      title: "Payment Received",
      message: "New Payment of $1,250.00 from John Smith",
      badge: "Payment",
      statusColor: "bg-[#E6F8ED] text-[#2E8E4D]",
      iconColor: "text-[#2E8E4D]",
      icon: <FiCheckCircle />,
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "email",
      title: "Email Sent Successfully",
      message: "Welcome email sent to sarah@email.com",
      badge: "Email",
      statusColor: "bg-[#E0DFFF] text-[#6D49FA]",
      iconColor: "text-[#6D49FA]",
      icon: <FiMail />,
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 3,
      type: "system",
      title: "System Update",
      message: "System maintenance completed successfully",
      badge: "System",
      statusColor: "bg-[#F3F4F6] text-[#374151]",
      iconColor: "text-[#374151]",
      icon: <FiCheckCircle />,
      time: "36 minutes ago",
      unread: false,
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Failed",
      message: "Payment attempt failed for demo@email.com",
      badge: "Payment",
      statusColor: "bg-[#FFE5E5] text-[#D64040]",
      iconColor: "text-[#D64040]",
      icon: <FiAlertTriangle />,
      time: "46 minutes ago",
      unread: false,
    },
    {
      id: 5,
      type: "email",
      title: "Email Delivery Failed",
      message: "Failed to send email to invalid@email.com",
      badge: "Email",
      statusColor: "bg-[#FFE5E5] text-[#D64040]",
      iconColor: "text-[#D64040]",
      icon: <FiMail />,
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 6,
      type: "payment",
      title: "Payment Received",
      message: "New Payment of $1,250.00 from John Smith",
      badge: "Payment",
      statusColor: "bg-[#E6F8ED] text-[#2E8E4D]",
      iconColor: "text-[#2E8E4D]",
      icon: <FiCheckCircle />,
      time: "3 hours ago",
      unread: false,
    },
  ];

  const filtered =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  return (
    <div className="mt-10">
      <h1 className="text-[22px] font-semibold">Notifications</h1>
      <p className="text-[13px] text-[#6B7280] mt-1">
        You have 2 unseen notifications
      </p>

      {/* Tabs */}
      <div className="mt-5 bg-white border border-[#E5E7EB] rounded-xl p-4 flex gap-6 text-[15px]">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 border-b-2 ${
            activeTab === "all"
              ? "border-black font-semibold"
              : "border-transparent text-[#6B7280]"
          }`}
        >
          All (6)
        </button>

        <button
          onClick={() => setActiveTab("payment")}
          className={`pb-2 border-b-2 ${
            activeTab === "payment"
              ? "border-black font-semibold"
              : "border-transparent text-[#6B7280]"
          }`}
        >
          Payment (3)
        </button>

        <button
          onClick={() => setActiveTab("email")}
          className={`pb-2 border-b-2 ${
            activeTab === "email"
              ? "border-black font-semibold"
              : "border-transparent text-[#6B7280]"
          }`}
        >
          Email (2)
        </button>
      </div>

      {/* Notifications List - Scrollable */}
      <div className="mt-4 bg-white border border-[#E5E7EB] rounded-xl p-4 max-h-[620px] no-scrollbar overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`flex justify-between items-start p-4 rounded-lg mb-2 cursor-pointer ${
              n.unread ? "bg-[#EEF6FF]" : "bg-transparent"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`text-[20px] ${n.iconColor}`}>{n.icon}</div>

              <div>
                <h3 className="font-semibold text-[15px]">{n.title}</h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">{n.message}</p>

                <span
                  className={`inline-block px-3 py-1 mt-2 rounded-full text-[12px] ${n.statusColor}`}
                >
                  {n.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[12px] text-[#6B7280]">
              {n.time}
              {n.unread && (
                <span className="w-2 h-2 bg-[#00796B] rounded-full inline-block"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
