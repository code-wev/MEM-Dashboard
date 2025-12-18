import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";

/* ===================== GET PAYMENTS ===================== */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const payments = await Payment.find({
      userId: session.user.id,
    }).sort({ createdAt: -1 });

    return Response.json(payments, { status: 200 });
  } catch (error) {
    console.error("GET PAYMENTS ERROR:", error);
    return Response.json(
      { message: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

/* ===================== CREATE PAYMENT ===================== */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      customerName,
      email,
      amount,
      method,
      status,
      description,
      sendReceipt,
    } = body;

    if (
      !customerName ||
      !email ||
      !method ||
      typeof amount !== "number" ||
      isNaN(amount) ||
      amount <= 0
    ) {
      return Response.json(
        { message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const payment = await Payment.create({
      userId: session.user.id,
      customerName,
      email,
      amount,
      method,
      status,
      description,
      sendReceipt,
    });

    return Response.json(payment, { status: 201 });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
