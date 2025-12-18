import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: { type: String, required: true },
    email: { type: String, required: true },

    amount: { type: Number, required: true },

    method: {
      type: String,
      enum: ["Credit Card", "Bank Transfer", "PayPal", "Cash"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Success", "Fail"],
      default: "Pending",
    },

    description: { type: String },
    sendReceipt: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
