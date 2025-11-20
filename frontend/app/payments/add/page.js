"use client";

import React, { useState } from "react";
import { FiArrowLeft, FiCheck, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AddPaymentPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [status, setStatus] = useState("Pending");
  const [sendReceipt, setSendReceipt] = useState(true);

  const methods = ["Credit Card", "Bank Transfer", "PayPal"];
  const statuses = ["Pending", "Success", "Fail"];

  return (
    <div className="w-full mt-10">
      {/* -------- Header -------- */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB]"
        >
          <FiArrowLeft className="text-[#4B5563]" />
        </button>
        <h1 className="text-[20px] font-semibold ml-1">Add New Payment</h1>
      </div>

      {/* -------- CUSTOMER INFORMATION -------- */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm mb-6">
        <p className="text-[15px] font-semibold mb-4">Customer Information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Customer Name*" placeholder="John Smith" />
          <Field label="Email Address*" placeholder="johnsmith@gmail.com" />
        </div>
      </div>

      {/* -------- PAYMENT DETAILS -------- */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        <p className="text-[15px] font-semibold mb-4">Payment Details</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Amount*" placeholder="650.00" />

          {/* Payment Method Dropdown */}
          <Dropdown
            label="Payment Method"
            value={paymentMethod}
            onChange={setPaymentMethod}
            options={methods}
          />

          {/* Status Dropdown */}
          <Dropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={statuses}
          />

          {/* Checkbox */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={sendReceipt}
              onChange={(e) => setSendReceipt(e.target.checked)}
              className="w-4 h-4 rounded border-[#D1D5DB] text-[#00796B] focus:ring-[#00796B]"
            />
            <span className="text-[14px] text-[#374151]">
              Send receipt automatically
            </span>
          </div>
        </div>

        {/* Description textarea */}
        <div className="mt-5">
          <span className="text-[14px] font-medium">Customer Name</span>
          <textarea
            placeholder="Enter payment description (Optional)"
            className="w-full mt-1 border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[14px] text-[#374151] h-[90px] resize-none focus:ring-1 focus:ring-[#00796B]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 border border-[#D1D5DB] rounded-md text-[14px] text-[#374151] hover:bg-gray-100 transition">
            Cancel
          </button>

          <button className="px-5 py-2 bg-[#00796B] text-white rounded-md text-[14px] font-medium hover:bg-[#006558] transition">
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------ INPUT FIELD COMPONENT ------------ */
function Field({ label, placeholder }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-[#6B7280] mb-1">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[14px] focus:ring-1 focus:ring-[#00796B] outline-none"
      />
    </div>
  );
}

/* ------------ DROPDOWN COMPONENT (PIXEL PERFECT) ------------ */
function Dropdown({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <span className="text-[13px] text-[#6B7280] mb-1 block">{label}</span>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 border border-[#E5E7EB] rounded-md bg-white text-[14px] hover:bg-gray-50"
      >
        {value}
        <FiChevronDown className="text-[18px] text-[#4B5563]" />
      </button>

      {open && (
        <div className="absolute w-full mt-1 rounded-md bg-white border border-[#E5E7EB] shadow-md z-20">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className={`flex items-center justify-between w-full px-3 py-2 text-[14px] 
              ${
                item === value ? "bg-[#00796B] text-white" : "hover:bg-gray-100"
              }`}
            >
              {item}
              {item === value && <FiCheck className="text-[16px]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
