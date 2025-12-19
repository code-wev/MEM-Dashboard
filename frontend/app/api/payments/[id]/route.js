export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import mongoose from "mongoose";

/* ===================== GET PAYMENT ===================== */
export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid payment ID" }, { status: 400 });
    }

    await dbConnect();

    const payment = await Payment.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!payment) {
      return Response.json({ message: "Payment not found" }, { status: 404 });
    }

    return Response.json(payment, { status: 200 });
  } catch (error) {
    console.error("PAYMENT DETAILS ERROR:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

/* ===================== UPDATE PAYMENT ===================== */
export async function PUT(req, context) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid payment ID" }, { status: 400 });
    }

    const body = await req.json();

    await dbConnect();

    const updatedPayment = await Payment.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      {
        customerName: body.customerName,
        email: body.email,
        amount: Number(body.amount),
        method: body.method,
        status: body.status,
        description: body.description,
        createdAt: new Date(body.createdAt),
      },
      { new: true }
    );

    if (!updatedPayment) {
      return Response.json({ message: "Payment not found" }, { status: 404 });
    }

    return Response.json(updatedPayment, { status: 200 });
  } catch (error) {
    console.error("UPDATE PAYMENT ERROR:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
