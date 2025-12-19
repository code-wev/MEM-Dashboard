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

const statusOptions = ["Success", "Pending", "Fail"];
const methodOptions = ["Credit Card", "Bank Transfer", "PayPal", "Cash"];

export default function PaymentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [payment, setPayment] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- FETCH PAYMENT ---------- */
  useEffect(() => {
    async function fetchPayment() {
      try {
        const res = await fetch(`/api/payments/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to load payment");

        const data = await res.json();
        setPayment(data);
        setForm(data);
      } catch {
        setError("Unable to load payment details");
      } finally {
        setLoading(false);
      }
    }

    fetchPayment();
  }, [id]);

  /* ---------- SAVE PAYMENT ---------- */
  async function handleSave() {
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setPayment(updated);
      setForm(updated);
      setEditing(false);
    } catch {
      alert("Failed to save changes");
    }
  }

  if (loading) {
    return <div className="mt-10 text-center text-gray-500">Loading payment details...</div>;
  }

  if (error || !payment) {
    return <div className="mt-10 text-center text-red-500">{error || "Payment not found"}</div>;
  }

  const transactionId = payment._id.slice(-6).toUpperCase();

  return (
    <div className="w-full mt-10">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F3F4F6] hover:bg-[#E5E7EB]"
        >
          <FiArrowLeft className="text-[#4B5563]" />
        </button>
        <h1 className="text-[19px] font-semibold ml-1">Payment Details</h1>
      </div>

      {/* DETAILS */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <Field
            label="Customer Name"
            value={form.customerName}
            editable={editing}
            onChange={(v) => setForm({ ...form, customerName: v })}
          />

          <Field label="Payment ID" value={payment._id} />

          <Field
            label="Email"
            value={form.email}
            editable={editing}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <Field label="Transaction ID" value={transactionId} />

          {/* AMOUNT */}
         <Field
  label="Amount"
  value={
    editing
      ? form.amount
      : `$${Number(form.amount).toFixed(2)}`
  }
  editable={editing}
  bold
  type="number"
  onChange={(v) =>
    setForm({ ...form, amount: Number(v) })
  }
/>


          {/* METHOD */}
          <SelectField
            label="Payment Method"
            value={form.method}
            editable={editing}
            options={methodOptions}
            onChange={(v) => setForm({ ...form, method: v })}
          />

          {/* STATUS */}
          <StatusField
            value={form.status}
            editable={editing}
            onChange={(v) => setForm({ ...form, status: v })}
          />

          {/* DATE */}
          <Field
            label="Date"
            value={new Date(form.createdAt).toISOString().split("T")[0]}
            editable={editing}
            type="date"
            onChange={(v) =>
              setForm({ ...form, createdAt: new Date(v).toISOString() })
            }
          />
        </div>

        {/* DESCRIPTION */}
        {form.description && (
          <div className="mb-6">
            <span className="text-[14px] font-semibold mb-1 block">Description</span>
            {editing ? (
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-[14px]"
              />
            ) : (
              <div className="text-[14px] text-[#374151]">{payment.description}</div>
            )}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap mt-5 gap-3">
        <button className="inline-flex items-center gap-2 bg-[#00796B] text-white px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#006458] transition">
          <FiDownload className="text-[17px]" />
          Download Receipt
        </button>

        <button
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="inline-flex items-center gap-2 border border-[#00796B] text-[#00796B] px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#E6F4F1] transition"
        >
          <FiEdit className="text-[17px]" />
          {editing ? "Save Payment" : "Edit Payment"}
        </button>
      </div>
    </div>
  );
}

/* ---------- INPUT FIELD ---------- */
function Field({ label, value, bold, editable, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-[#6B7280] mb-1">{label}</span>
      {editable ? (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[15px]"
        />
      ) : (
        <div className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[15px]">
          <span className={bold ? "font-semibold text-[18px]" : ""}>{value}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- SELECT FIELD ---------- */
function SelectField({ label, value, editable, options, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-[#6B7280] mb-1">{label}</span>
      {editable ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[15px]"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <div className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[15px]">
          {value}
        </div>
      )}
    </div>
  );
}

/* ---------- STATUS FIELD ---------- */
function StatusField({ value, editable, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-[#6B7280] mb-1">Status</span>
      {editable ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2 text-[15px]"
        >
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      ) : (
        <div className="w-full border border-[#E5E7EB] rounded-md bg-white px-3 py-2">
          <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${statusColors[value]}`}>
            {value}
          </span>
        </div>
      )}
    </div>
  );
}
