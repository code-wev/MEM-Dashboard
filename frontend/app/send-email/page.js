"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function SendEmailPage() {
  const [template, setTemplate] = useState("No Template");
  const [open, setOpen] = useState(false);

  const templates = [
    "No Template",
    "Welcome Email",
    "Payment Confirmation",
    "Payment Reminder",
    "Newsletter",
  ];

  return (
    <div className="w-full mt-10">
      {/* Page Title */}
      <h1 className="text-[22px] font-semibold mb-4">Send Email</h1>

      {/* Main Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        {/* SECTION TITLE */}
        <h2 className="text-[15px] font-semibold mb-4">Email Details</h2>

        {/* 2-column row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* To Field */}
          <Field label="To*" placeholder="Enter recipient email address" />

          {/* Template Dropdown */}
          <div className="relative">
            <label className="text-[13px] text-[#6B7280] mb-1 block">
              Template*
            </label>

            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-3 py-2 border border-[#E5E7EB] rounded-md bg-white text-[14px]"
            >
              {template}
              <FiChevronDown className="text-[18px] text-[#4B5563]" />
            </button>

            {open && (
              <div className="absolute w-full mt-1 bg-white border border-[#E5E7EB] rounded-md shadow-md z-50">
                {templates.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setTemplate(item);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[14px] hover:bg-gray-100 ${
                      item === template ? "bg-[#00796B] text-white" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Subject */}
        <Field label="Subject*" placeholder="Enter email subject" />

        {/* Email Content */}
        <div className="mt-5">
          <label className="text-[13px] text-[#6B7280] mb-1 block">
            Email Content*
          </label>

          <textarea
            placeholder="Enter your email content here…. "
            className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[14px] h-[150px] resize-none focus:ring-1 focus:ring-[#00796B]"
          />
        </div>

        {/* Buttons bottom right */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 border border-[#027C66] rounded-md text-[14px] text-[#374151] hover:bg-gray-100 transition">
            Preview
          </button>

          <button className="px-5 py-2 bg-[#00796B] text-white rounded-md text-[14px] font-medium hover:bg-[#006558] transition">
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------ Field Component (Matches Figma Exactly) ------------ */
function Field({ label, placeholder }) {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-[13px] text-[#6B7280] mb-1">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[14px] focus:ring-1 focus:ring-[#00796B]"
      />
    </div>
  );
}
