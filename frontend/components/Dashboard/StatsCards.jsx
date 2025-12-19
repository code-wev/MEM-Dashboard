"use client";

import React, { useEffect, useState } from "react";
import { PiMoneyWavyLight } from "react-icons/pi";
import { FiCheck } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalAmount: 0,
    success: 0,
    pending: 0,
    fail: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/payments", {
          credentials: "include",
          cache: "no-store",
        });

        // 🔴 If auth fails or server error
        if (!res.ok) {
          console.error("Payments API failed:", res.status);
          return;
        }

        const data = await res.json();

        // ✅ SAFETY CHECK
        if (!Array.isArray(data)) {
          console.error("Payments API returned non-array:", data);
          return;
        }

        let totalAmount = 0;
        let success = 0;
        let pending = 0;
        let fail = 0;

        data.forEach((p) => {
          totalAmount += Number(p.amount ?? 0);

          if (p.status === "Success") success++;
          if (p.status === "Pending") pending++;
          if (p.status === "Fail") fail++;
        });

        setStats({
          totalAmount,
          success,
          pending,
          fail,
        });
      } catch (err) {
        console.error("Stats load error:", err);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Payment",
      value: `$${stats.totalAmount.toLocaleString()}`,
      iconBg: "bg-[#E8EEFF]",
      icon: <PiMoneyWavyLight className="text-[#3B4AC5] text-[22px]" />,
    },
    {
      title: "Successful",
      value: stats.success.toLocaleString(),
      iconBg: "bg-[#E6F8ED]",
      icon: <FiCheck className="text-[#2E8E4D] text-[20px]" />,
    },
    {
      title: "Pending",
      value: stats.pending.toLocaleString(),
      iconBg: "bg-[#FFF8D9]",
      icon: <LuClock3 className="text-[#C89A00] text-[20px]" />,
    },
    {
      title: "Failed",
      value: stats.fail.toLocaleString(),
      iconBg: "bg-[#FFE5E5]",
      icon: <RxCross2 className="text-[#D64040] text-[20px]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex justify-between items-start shadow-sm hover:shadow-md transition"
        >
          <div>
            <p className="text-[14px] text-[#6B7280]">{card.title}</p>
            <h2 className="text-[26px] font-semibold mt-1">{card.value}</h2>
          </div>

          <div
            className={`w-[38px] h-[38px] rounded-lg flex items-center justify-center ${card.iconBg}`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
