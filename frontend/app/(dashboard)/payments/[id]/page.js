"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiDownload, FiEdit } from "react-icons/fi";

const payments = [
  {
    id: "TXN001",
    customerName: "John Smith",
    email: "johnsmith@gmail.com",
    amount: "$1,250.00",
    status: "Success",
    paymentId: "PAY001",
    transactionId: "TXN-121542245",
    method: "Credit Card",
    date: "2025-01-15",
    description: "Monthly subscription payment",
  },
];

export default function PaymentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const payment = payments[0];

  return (
    <div className="w-full mt-10"> 
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F3F4F6] hover:bg-[#E5E7EB]"
        >
          <FiArrowLeft className="text-[#4B5563]" />
        </button>
        <h1 className="text-[19px] font-semibold ml-1">Payment Details</h1>
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        {/* 2 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Field label="Customer Name" value={payment.customerName} />
          <Field label="Payment ID" value={payment.paymentId} />

          <Field label="Email" value={payment.email} />
          <Field label="Transaction ID" value={payment.transactionId} />

          <Field label="Amount" value={payment.amount} bold />

          <Field label="Payment Method" value={payment.method} />

          {/* Status badge */}
          <div className="flex flex-col">
            <span className="text-[13px] text-[#6B7280] mb-1">Status</span>

            <div className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 flex items-center">
              <span className="bg-[#E6F8ED] text-[#2E8E4D] px-3 py-1 rounded-full text-[12px] font-medium">
                {payment.status}
              </span>
            </div>
          </div>

          <Field label="Date" value={payment.date} />
        </div>

        {/* Description */}
        <div className="mb-6">
          <span className="text-[14px] font-semibold mb-1 block">
            Description
          </span>
          <div className=" text-[14px] text-[#374151]">
            {payment.description}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap mt-5 gap-3">
        <button className="inline-flex items-center gap-2 bg-[#00796B] text-white px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#006458] transition">
          <FiDownload className="text-[17px]" />
          Download Receipt
        </button>

        <button className="inline-flex items-center gap-2 border border-[#00796B] text-[#00796B] px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#E6F4F1] transition">
          <FiEdit className="text-[17px]" />
          Edit Payment
        </button>
      </div>
    </div>
  );
}

/* ========================== FIELD COMPONENT ========================== */

function Field({ label, value, bold }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-[#6B7280] mb-1">{label}</span>
      <div className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[15px] text-[#111827]">
        <span className={bold ? "font-semibold text-[18px]" : ""}>{value}</span>
      </div>
    </div>
  );
}
