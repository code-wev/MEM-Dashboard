"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { FiLock, FiMail } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <>
      {(error || errorParam) && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {error ||
            (errorParam === "CredentialsSignin"
              ? "Invalid email or password"
              : errorParam)}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
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
              className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md 
              bg-[#F7F8FA] text-[14px]
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
              className="w-full mt-1 px-10 py-2.5 border border-gray-200 rounded-md 
              bg-[#F7F8FA] text-[14px]
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex relative">

      {/* LEFT TEAL STRIPE */}
      <div className="absolute left-0 top-0 h-full w-[10px] bg-[#00796B]" />

      <div className="flex flex-col flex-1">

        {/* TOP LOGO BAR */}
        <div className="w-full flex items-center justify-between px-6 md:px-10 py-6">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              {/* <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
              /> */}
              <div className="leading-tight">
                <p className="font-semibold text-[#1A1A1A] text-[13px] md:text-[14px]">
                  MEM Dashboard
                </p>
                <p className="text-[11px] md:text-[12px] text-gray-500 -mt-1">
                  Contractor Platform
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* LOGIN CARD */}
        <div className="flex flex-1 items-center justify-center pb-10 px-4">
          <div
            className="
              bg-white 
              w-full 
              max-w-[450px] 
              rounded-xl 
              shadow-[0_4px_25px_rgba(0,0,0,0.08)] 
              px-6 md:px-10 
              py-10
            "
          >
            <h1 className="text-center text-[20px] md:text-[22px] font-semibold mb-8">
              Sign In
            </h1>

            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>

            {/* FOOTER */}
            <div className="text-center mt-6 text-[12px] md:text-[13px]">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#00796B] hover:underline">
                Create one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
