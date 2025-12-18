"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiDownload, FiEdit } from "react-icons/fi";

/* ---------- STATUS COLORS ---------- */
const statusColors = {
  Success: "bg-[#E6F8ED] text-[#2E8E4D]",
  Pending: "bg-[#FFF8D9] text-[#C89A00]",
  Fail: "bg-[#FFE5E5] text-[#D64040]",
};

export default function PaymentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- FETCH PAYMENT ---------- */
  useEffect(() => {
    async function fetchPayment() {
      try {
        const res = await fetch(`/api/payments/${id}`);

        if (!res.ok) throw new Error("Failed to load payment");

        const data = await res.json();
        setPayment(data);
      } catch (err) {
        setError("Unable to load payment details");
      } finally {
        setLoading(false);
      }
    }

    fetchPayment();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading payment details...
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="mt-10 text-center text-red-500">
        {error || "Payment not found"}
      </div>
    );
  }

  return (
    <div className="w-full mt-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F3F4F6] hover:bg-[#E5E7EB]"
        >
          <FiArrowLeft className="text-[#4B5563]" />
        </button>
        <h1 className="text-[19px] font-semibold ml-1">Payment Details</h1>
      </div>

      {/* ================= DETAILS CARD ================= */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        {/* 2 COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Field label="Customer Name" value={payment.customerName} />
          <Field label="Payment ID" value={payment._id} />

          <Field label="Email" value={payment.email} />
          <Field
            label="Transaction ID"
            value={payment._id.slice(-10).toUpperCase()}
          />

          <Field
            label="Amount"
            value={`$${Number(payment.amount).toFixed(2)}`}
            bold
          />

          <Field label="Payment Method" value={payment.method} />

          {/* STATUS */}
          <div className="flex flex-col">
            <span className="text-[13px] text-[#6B7280] mb-1">Status</span>
            <div className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2">
              <span
                className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                  statusColors[payment.status]
                }`}
              >
                {payment.status}
              </span>
            </div>
          </div>

          <Field
            label="Date"
            value={new Date(payment.createdAt).toLocaleDateString()}
          />
        </div>

        {/* DESCRIPTION */}
        {payment.description && (
          <div className="mb-6">
            <span className="text-[14px] font-semibold mb-1 block">
              Description
            </span>
            <div className="text-[14px] text-[#374151]">
              {payment.description}
            </div>
          </div>
        )}
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex flex-wrap mt-5 gap-3">
        <button className="inline-flex items-center gap-2 bg-[#00796B] text-white px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#006458] transition">
          <FiDownload className="text-[17px]" />
          Download Receipt
        </button>

        <button
          onClick={() => router.push(`/payments/edit/${payment._id}`)}
          className="inline-flex items-center gap-2 border border-[#00796B] text-[#00796B] px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#E6F4F1] transition"
        >
          <FiEdit className="text-[17px]" />
          Edit Payment
        </button>
      </div>
    </div>
  );
}

/* ================= FIELD COMPONENT ================= */

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
