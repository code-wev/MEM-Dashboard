"use client";

import Image from "next/image";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="mt-10">
      {/* Title */}
      <h1 className="text-[22px] font-semibold">Profile</h1>
      <p className="text-[13px] text-[#6B7280] mt-1">Manage your profile</p>

      {/* Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mt-5 shadow-sm">
        {/* User Profile Header */}
        <h2 className="text-[16px] font-semibold mb-5">User Profile</h2>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              width={70}
              height={70}
              alt="Profile Image"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[15px] font-semibold">Admin User</p>
            <p className="text-[14px] text-[#6B7280]">admin@company.com</p>
          </div>
        </div>

        {/* Full name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <Field label="Full Name" placeholder="Admin user" />
          <Field label="Email" placeholder="your@gmail.com" />
        </div>

        {/* Change Password */}
        {/* Change Password */}
        <div className="mt-8">
          <p className="text-[14px] font-semibold mb-3">Change Password</p>

          {/* Current password – full width */}
          <div className="mb-4">
            <Field label="Current Passwprd" placeholder="" type="password" />
          </div>

          {/* New + Confirm – two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Field label="New Password" placeholder="" type="password" />
            <Field label="Confirm Password" placeholder="" type="password" />
          </div>

          {/* Save button aligned left */}
          <button className="bg-[#00796B] text-white px-5 py-2 rounded-md text-[14px]">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------- Input Field Component ---------- */
function Field({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-[13px] text-[#6B7280] mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-[14px] bg-white focus:ring-1 focus:ring-[#00796B]"
      />
    </div>
  );
}
