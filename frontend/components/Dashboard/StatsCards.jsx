import React from "react";
import { PiMoneyWavyLight } from "react-icons/pi";
import { FiCheck } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

export default function StatsCards() {
  const cards = [
    {
      title: "Total Payment",
      value: "$45,231",
      iconBg: "bg-[#E8EEFF]",
      icon: <PiMoneyWavyLight className="text-[#3B4AC5] text-[22px]" />,
    },
    {
      title: "Successful",
      value: "5,231",
      iconBg: "bg-[#E6F8ED]",
      icon: <FiCheck className="text-[#2E8E4D] text-[20px]" />,
    },
    {
      title: "Pending",
      value: "91",
      iconBg: "bg-[#FFF8D9]",
      icon: <LuClock3 className="text-[#C89A00] text-[20px]" />,
    },
    {
      title: "Failed",
      value: "12",
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
          {/* Left */}
          <div>
            <p className="text-[14px] text-[#6B7280]">{card.title}</p>
            <h2 className="text-[26px] font-semibold mt-1">{card.value}</h2>
          </div>

          {/* Right Icon */}
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
