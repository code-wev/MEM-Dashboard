import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email and password required" }, { status: 400 });
    }

    await dbConnect();

    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json({ message: "Email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name: name || "",
      email,
      passwordHash,
      role: "contractor",
    });

    return Response.json({ message: "Registered successfully" }, { status: 201 });
  } catch (e) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
