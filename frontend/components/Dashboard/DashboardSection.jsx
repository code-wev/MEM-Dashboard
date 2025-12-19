"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DashboardSection() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadTransactions() {
      const res = await fetch("/api/payments", {
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();

      // latest 6 only
      setTransactions(data.slice(0, 6));
    }

    loadTransactions();
  }, []);

  const statusColors = {
    Success: "bg-[#E6F8ED] text-[#2E8E4D]",
    Pending: "bg-[#FFF8D9] text-[#C89A00]",
    Fail: "bg-[#FFE5E5] text-[#D64040]",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full mt-6">
      {/* LEFT TABLE */}
      <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
        <h2 className="text-[20px] font-semibold mb-4">Latest Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6B7280] text-[13.5px]">
                <th className="pb-3">CUSTOMER</th>
                <th className="pb-3">AMOUNT</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3">DATE</th>
                <th className="pb-3">METHOD</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-[14px]">
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-[#6B7280] text-[15px]"
                  >
                    No payments found yet.
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => (
                  <tr
                    key={txn._id}
                    className="border-t border-[#F0F0F0] hover:bg-gray-50 transition"
                  >
                    <td className="py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{txn.customerName}</span>
                        <span className="text-[#6B7280] text-[12px]">
                          {txn._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </td>

                    <td className="font-medium">
                      ${Number(txn.amount).toFixed(2)}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                          statusColors[txn.status]
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>

                    <td>
                      {new Date(txn.createdAt).toISOString().split("T")[0]}
                    </td>

                    <td>{txn.method}</td>

                    <td>
                      <Link
                        href={`/payments/${txn._id}`}
                        className="text-[#15803D] font-semibold hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
          <h2 className="text-[17px] font-semibold mb-3">Quick Action</h2>

          <Link href="/payments/add">
            <button className="w-full cursor-pointer bg-[#00796B] text-white py-2.5 rounded-md font-medium text-[15px]">
              Add Payment
            </button>
          </Link>

          <Link href="/send-email">
            <button className="w-full cursor-pointer border border-[#00796B] text-[#00796B] py-2.5 rounded-md font-medium mt-3 text-[15px]">
              Send Email
            </button>
          </Link>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
          <h2 className="text-[17px] font-semibold">Quick Action</h2>
          <p className="text-[#6B7280] text-[13px] mt-1 mb-3">
            Get help with payments, emails and more
          </p>

          <div className="flex flex-col gap-2">
            <button className="text-left bg-[#F9FAFB] py-2 px-3 rounded-md text-[14px]">
              Check payment status
            </button>
            <button className="text-left bg-[#F9FAFB] py-2 px-3 rounded-md text-[14px]">
              Send payment reminder
            </button>
            <button className="text-left bg-[#F9FAFB] py-2 px-3 rounded-md text-[14px]">
              Generate report
            </button>

            <Link href="/ai">
              <button className="w-full cursor-pointer bg-[#00796B] text-white py-2.5 rounded-md font-medium text-[15px] mt-2">
                Open AI Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
