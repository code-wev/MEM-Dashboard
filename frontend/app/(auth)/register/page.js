"use client";

import { useState } from "react";
import Image from "next/image";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Success → redirect to login
      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex relative">

      {/* LEFT TEAL STRIPE */}
      <div className="absolute left-0 top-0 h-full w-[10px] bg-[#00796B]" />

      <div className="flex flex-col flex-1">

        {/* TOP LOGO BAR */}
        <div className="w-full flex items-center justify-between px-10 py-6">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              {/* <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="rounded-full"
              /> */}
              <div className="leading-tight">
                <p className="font-semibold text-[#1A1A1A] text-[14px]">
                  MEM Dashboard
                </p>
                <p className="text-[12px] text-gray-500 -mt-1">
                  Contractor Platform
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* REGISTER CARD */}
        <div className="flex flex-1 items-center justify-center pb-10">
          <div className="bg-white w-[450px] rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] px-10 py-10">

            <h1 className="text-center text-[22px] font-semibold mb-8">
              Create Your Account
            </h1>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>

              {/* FULL NAME */}
              <div>
                <label className="text-[13px] text-gray-600">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                    outline-none focus:ring-1 focus:ring-[#00796B]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-[13px] text-gray-600">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                    outline-none focus:ring-1 focus:ring-[#00796B]"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-[13px] text-gray-600">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                    outline-none focus:ring-1 focus:ring-[#00796B]"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-[13px] text-gray-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md bg-[#F7F8FA] text-[14px]
                    outline-none focus:ring-1 focus:ring-[#00796B]"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 bg-[#00796B] hover:bg-[#006d7b] text-white text-[15px]
                rounded-md transition font-medium disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* FOOTER */}
            <div className="text-center mt-6 text-[13px]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#00796B] hover:underline">
                Sign in
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
