"use client";

import EmailDetailsModal from "@/components/Dashboard/EmailDetailsModal";
import React, { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const dummyEmails = [
  {
    id: "EML-001",
    to: "willie.jennings@example.com",
    subject: "Payment Confirmation",
    status: "Sent",
    time: "2025-05-01 10:30 AM",
    template: "Payment Confirmation",
  },
  {
    id: "EML-002",
    to: "tim.jennings@example.com",
    subject: "Welcome to Our Service",
    status: "Sent",
    time: "2025-05-01 10:30 AM",
    template: "Welcome Email",
  },
  {
    id: "EML-003",
    to: "debora.hall@example.com",
    subject: "Payment Reminder",
    status: "Failed",
    time: "2025-05-01 10:30 AM",
    template: "Payment Reminder",
  },
  {
    id: "EML-004",
    to: "bill.sanders@example.com",
    subject: "Monthly Newsletter",
    status: "Sent",
    time: "2025-05-01 10:30 AM",
    template: "Newsletter",
  },
  {
    id: "EML-005",
    to: "nathan.roberts@example.com",
    subject: "Account Verification",
    status: "Sent",
    time: "2025-05-01 10:30 AM",
    template: "Verification",
  },
  {
    id: "EML-006",
    to: "debbie.baker@example.com",
    subject: "Payment Failed Notice",
    status: "Failed",
    time: "2025-05-01 10:30 AM",
    template: "Payment Failed",
  },
];

const statusColors = {
  Sent: "bg-[#E6F8ED] text-[#2E8E4D]",
  Failed: "bg-[#FFE5E5] text-[#D64040]",
};

export default function EmailLogsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const statusOptions = ["All Status", "Sent", "Failed"];

  const filteredEmails = dummyEmails.filter(
    (e) =>
      e.to.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full mt-10">
      <h1 className="text-[22px] font-semibold mb-4">Emails Logs</h1>

      {/* Filter Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              placeholder="Search by email or subject..."
              className="w-full pl-10 pr-3 py-2.5 border border-[#E5E7EB] rounded-md bg-white text-[14px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative min-w-[150px]">
            <button
              className="w-full flex items-center justify-between px-3 py-2.5 border border-[#E5E7EB] rounded-md bg-white text-[14px]"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {statusFilter}
              <FiChevronDown />
            </button>

            {dropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border border-[#E5E7EB] rounded-md shadow-md z-20">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    className={`w-full px-3 py-2 text-left text-[14px] hover:bg-gray-100 ${
                      s === statusFilter ? "bg-[#00796B] text-white" : ""
                    }`}
                    onClick={() => {
                      setStatusFilter(s);
                      setDropdownOpen(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6B7280] text-[13px] border-b border-[#F3F4F6]">
                <th className="py-2">TO</th>
                <th className="py-2">SUBJECT</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">TIME</th>
                <th className="py-2">TEMPLATE</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-[14px]">
              {filteredEmails.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-b-0 border-[#F3F4F6] hover:bg-gray-50"
                >
                  <td className="py-4">{item.to}</td>
                  <td className="py-4 font-medium">{item.subject}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] ${
                        statusColors[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4">{item.time}</td>
                  <td className="py-4">{item.template}</td>

                  <td className="py-4">
                    <button
                      onClick={() => setSelectedEmail(item)}
                      className="text-[#15803D] font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedEmail && (
        <EmailDetailsModal
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}
    </div>
  );
}
