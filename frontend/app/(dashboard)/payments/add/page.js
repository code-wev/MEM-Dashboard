"use client";

import React, { useState } from "react";
import { FiArrowLeft, FiCheck, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AddPaymentPage() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [status, setStatus] = useState("Pending");
  const [sendReceipt, setSendReceipt] = useState(true);

  const methods = ["Credit Card", "Bank Transfer", "PayPal", "Cash"]; // ✅ FIX
  const statuses = ["Pending", "Success", "Fail"];

  async function handleSave() {
    if (!customerName || !email || !amount) {
      alert("Please fill all required fields");
      return;
    }

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        email,
        amount: Number(amount),
        method: paymentMethod,
        status,
        description,
        sendReceipt,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save payment");
      return;
    }

    router.push("/payments");
  }

  return (
    <div className="w-full mt-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB]"
        >
          <FiArrowLeft className="text-[#4B5563]" />
        </button>
        <h1 className="text-[20px] font-semibold ml-1">Add New Payment</h1>
      </div>

      {/* Customer Information */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm mb-6">
        <p className="text-[15px] font-semibold mb-4">Customer Information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Customer Name*"
            value={customerName}
            onChange={setCustomerName}
          />
          <Field label="Email Address*" value={email} onChange={setEmail} />
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        <p className="text-[15px] font-semibold mb-4">Payment Details</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Amount*"
            value={amount}
            onChange={setAmount}
            type="number"
          />

          <Dropdown
            label="Payment Method"
            value={paymentMethod}
            onChange={setPaymentMethod}
            options={methods}
          />
          <Dropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={statuses}
          />

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={sendReceipt}
              onChange={(e) => setSendReceipt(e.target.checked)}
              className="w-4 h-4 rounded border-[#D1D5DB] text-[#00796B]"
            />
            <span className="text-[14px] text-[#374151]">
              Send receipt automatically
            </span>
          </div>
        </div>

        <div className="mt-5">
          <span className="text-[14px] font-medium">Payment Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter payment description (Optional)"
            className="w-full mt-1 border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[14px] h-[90px] resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 border border-[#D1D5DB] rounded-md text-[14px] text-[#374151]">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#00796B] text-white rounded-md text-[14px] font-medium"
          >
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- INPUT ---------- */
function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-[#6B7280] mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[14px]"
      />
    </div>
  );
}

/* ---------- DROPDOWN ---------- */
function Dropdown({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <span className="text-[13px] text-[#6B7280] mb-1 block">{label}</span>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 border border-[#E5E7EB] rounded-md bg-white text-[14px]"
      >
        {value}
        <FiChevronDown className="text-[18px]" />
      </button>

      {open && (
        <div className="absolute w-full mt-1 rounded-md bg-white border shadow-md z-20">
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
              {item === value && <FiCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
