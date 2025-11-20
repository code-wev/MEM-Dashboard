"use client";

import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function EmailDetailsModal({ email, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
          <h2 className="text-[18px] font-semibold">Email Details</h2>
          <button onClick={onClose}>
            <RxCross2 className="text-[22px] text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-y-4 text-[14px]">
            <div>
              <div className="text-[#6B7280] mb-1">Email ID</div>
              <div className="font-medium">{email.id}</div>
            </div>

            <div>
              <div className="text-[#6B7280] mb-1">Status</div>
              <span className="px-3 py-1 bg-[#E6F8ED] text-[#2E8E4D] rounded-full text-[12px]">
                Delivered
              </span>
            </div>

            <div>
              <div className="text-[#6B7280] mb-1">To</div>
              <div>{email.to}</div>
            </div>

            <div>
              <div className="text-[#6B7280] mb-1">Sent At</div>
              <div>{email.time}</div>
            </div>

            <div>
              <div className="text-[#6B7280] mb-1">Opened At</div>
              <div>2024-01-15 10:45 AM</div>
            </div>

            <div>
              <div className="text-[#6B7280] mb-1">Subject</div>
              <div className="font-medium">{email.subject}</div>
            </div>
          </div>

          {/* Email Content Box */}
          <div>
            <div className="text-[14px] font-medium mb-1">Email Content</div>

            <div className="border border-[#E5E7EB] rounded-lg bg-[#F8FAFC] p-4 text-[14px] leading-relaxed">
              Dear John,
              <br />
              <br />
              Thank you for your payment of $1,250.00. Your transaction has been
              successfully processed.
              <br />
              <br />
              Transaction ID: TXN-001
              <br />
              Amount: $1,250.00
              <br />
              Date: January 15, 2024
              <br />
              <br />
              If you have any questions, please don`&apos;`t hesitate to contact
              us.
              <br />
              <br />
              Best regards,
              <br />
              Payment Team
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
            <button className="flex items-center gap-2 bg-[#027C66] text-white px-6 py-2 rounded-md">
              Resend Email
            </button>

            <button className="flex items-center gap-2 border border-[#027C66] text-[#00796B] px-6 py-2 rounded-md">
              ↓ Resend Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
