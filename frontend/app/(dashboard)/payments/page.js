"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiCheck } from "react-icons/fi";

/* ---------- STATUS COLORS ---------- */
const statusColors = {
  Success: "bg-[#E6F8ED] text-[#2E8E4D]",
  Pending: "bg-[#FFF8D9] text-[#C89A00]",
  Fail: "bg-[#FFE5E5] text-[#D64040]",
};

/* ---------- FILTER OPTIONS ---------- */
const timeOptions = ["All Time", "Today", "This Week", "This Month"];
const statusOptions = ["All Status", "Pending", "Success", "Fail"];
const methodOptions = [
  "All Methods",
  "Credit Card",
  "Bank Transfer",
  "PayPal",
  "Cash", // ✅ FIX
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [methodFilter, setMethodFilter] = useState("All Methods");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- FETCH PAYMENTS ---------- */
  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch("/api/payments");

        if (!res.ok) {
          throw new Error("Failed to load payments");
        }

        const data = await res.json();
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Unable to load payments");
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  /* ---------- FILTER LOGIC ---------- */
  const filteredPayments = payments.filter((p) => {
  /* SEARCH */
  const matchName =
    p.customerName?.toLowerCase().includes(search.toLowerCase());

  /* STATUS */
  const matchStatus =
    statusFilter === "All Status" || p.status === statusFilter;

  /* METHOD */
  const matchMethod =
    methodFilter === "All Methods" || p.method === methodFilter;

  /* TIME FILTER */
  let matchTime = true;

  if (timeFilter !== "All Time") {
    const createdAt = new Date(p.createdAt);
    const now = new Date();

    if (timeFilter === "Today") {
      matchTime = createdAt.toDateString() === now.toDateString();
    }

    if (timeFilter === "This Week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      matchTime = createdAt >= weekAgo;
    }

    if (timeFilter === "This Month") {
      matchTime =
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear();
    }
  }

  return matchName && matchStatus && matchMethod && matchTime;
});


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

        <Link href="/payments/add">
          <button className="bg-[#00796B] text-white text-[14px] font-medium px-4 py-2 rounded-md hover:bg-[#006558] transition">
            Add Payment
          </button>
        </Link>
      </div>

      {/* ================= FILTER CARD ================= */}
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

          <PerfectDropdown value={timeFilter} onChange={setTimeFilter} options={timeOptions} />
          <PerfectDropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
          <PerfectDropdown value={methodFilter} onChange={setMethodFilter} options={methodOptions} />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
        <div className="overflow-x-auto">

          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading payments...</p>
          ) : error ? (
            <p className="text-center py-10 text-red-500">{error}</p>
          ) : filteredPayments.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No payments found
            </p>
          ) : (
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
                {filteredPayments.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b last:border-b-0 border-[#F3F4F6] hover:bg-gray-50 transition"
                  >
                    <td className="py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{p.customerName}</span>
                        <span className="text-[12px] text-[#6B7280]">
                          {p._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 font-medium">
                      ${Number(p.amount).toFixed(2)}
                    </td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-medium ${statusColors[p.status]}`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="py-3">
                      {new Date(p.createdAt).toISOString().split("T")[0]}
                    </td>

                    <td className="py-3">{p.method}</td>

                    <td className="py-3">
                      <Link
                        href={`/payments/${p._id}`}
                        className="text-[#15803D] font-semibold text-[14px]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

/* ================= DROPDOWN ================= */
function PerfectDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative min-w-[150px] flex-1">
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

