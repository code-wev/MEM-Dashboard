"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiCheck } from "react-icons/fi";

const transactions = [
  { id: "TXN001", name: "Wade Warren", amount: "$1,250.00", status: "Success", date: "2025-05-01", method: "Credit Card" },
  { id: "TXN002", name: "Esther Howard", amount: "$850.00", status: "Pending", date: "2025-05-01", method: "Bank Transfer" },
  { id: "TXN003", name: "Leslie Alexander", amount: "$5,250.00", status: "Fail", date: "2025-05-01", method: "PayPal" },
  { id: "TXN004", name: "Jacob Jones", amount: "$250.00", status: "Success", date: "2025-05-01", method: "Credit Card" },
  { id: "TXN005", name: "Jacob Jones", amount: "$750.00", status: "Pending", date: "2025-05-01", method: "PayPal" },
  { id: "TXN006", name: "Jacob Jones", amount: "$870.00", status: "Fail", date: "2025-05-01", method: "Bank Transfer" },
];

const statusColors = {
  Success: "bg-[#E6F8ED] text-[#2E8E4D]",
  Pending: "bg-[#FFF8D9] text-[#C89A00]",
  Fail: "bg-[#FFE5E5] text-[#D64040]",
};

const timeOptions = ["All Time", "Today", "This Week", "This Month"];
const statusOptions = ["All Status", "Completed", "Pending", "Failed"];
const methodOptions = ["All Methods", "Credit Card", "Bank Transfer", "PayPal"];

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [methodFilter, setMethodFilter] = useState("All Methods");

  const filteredTxns = transactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full mt-10">

      {/* ================= PAGE HEADER ================= */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-semibold">Payments</h1>
          <p className="text-[13px] text-[#6B7280] mt-1">
            Manage and track all payment transactions
          </p>
        </div>

        <Link href="payments/add">
         <button className="bg-[#00796B] text-white text-[14px] font-medium px-4 py-2 rounded-md hover:bg-[#006558] transition">
          Add Payment
        </button>
        </Link>
      </div>

      {/* ================= TOP FILTER CARD ================= */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm mb-4">
        
        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[17px]" />
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-md border border-[#E5E7EB] text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            />
          </div>

          {/* Dropdowns */}
          <PerfectDropdown value={timeFilter} onChange={setTimeFilter} options={timeOptions} />
          <PerfectDropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
          <PerfectDropdown value={methodFilter} onChange={setMethodFilter} options={methodOptions} />

        </div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6B7280] text-[13px] border-b border-[#F3F4F6]">
                <th className="py-2">CUSTOMER</th>
                <th className="py-2">AMOUNT</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">DATE</th>
                <th className="py-2">METHOD</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-[14px]">
              {filteredTxns.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b last:border-b-0 border-[#F3F4F6] hover:bg-gray-50 transition"
                >
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{txn.name}</span>
                      <span className="text-[12px] text-[#6B7280]">{txn.id}</span>
                    </div>
                  </td>

                  <td className="py-3 font-medium">{txn.amount}</td>

                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${statusColors[txn.status]}`}>
                      {txn.status}
                    </span>
                  </td>

                  <td className="py-3">{txn.date}</td>
                  <td className="py-3">{txn.method}</td>

                  <td className="py-3">
                    <Link
                      href={`/payments/${txn.id}`}
                      className="text-[#15803D] font-semibold text-[14px]"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= PERFECT FIGMA-STYLE DROPDOWN ================= */

function PerfectDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-[150px] flex-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 border border-[#E5E7EB] rounded-md bg-white text-[14px]"
      >
        {value}
        <FiChevronDown className="text-[18px] text-[#4B5563]" />
      </button>

      {open && (
        <div className="absolute w-full mt-1 rounded-md bg-white shadow-md border border-[#E5E7EB] z-50">
          {options.map((item) => {
            const active = item === value;
            return (
              <button
                key={item}
                className={`flex items-center justify-between w-full px-3 py-2 text-[14px]
                ${active ? "bg-[#00796B] text-white" : "hover:bg-gray-100"}`}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
              >
                {item}
                {active && <FiCheck className="text-[16px]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
