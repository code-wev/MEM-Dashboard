"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      time: "10:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const quickPrompts = [
    "Generate payment report",
    "Analyze recent transactions",
    "Send payment reminders",
    "Check system status",
    "Create email template",
    "Export customer data",
  ];

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textFromPrompt) => {
    const content = (textFromPrompt ?? input).trim();
    if (!content || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response.",
        time: getTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content:
            "Sorry, I ran into an issue while processing your request. Please try again.",
          time: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      {/* Page title */}
      <h1 className="text-[22px] font-semibold">AI Assistant</h1>

      {/* Main card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl mt-4 p-5 shadow-sm min-h-[700px] flex flex-col">

        {/* Chat area — FIXED HEIGHT + SCROLLABLE + HIDDEN SCROLLBAR */}
        <div
          ref={chatRef}
          className="no-scrollbar overflow-y-auto flex-1 max-h-[500px] pb-4 pr-1"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${
                msg.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-md px-3 py-2 text-[14px] ${
                  msg.role === "assistant"
                    ? "bg-[#F3F4F6] text-[#111827]"
                    : "bg-[#E6F8ED] text-[#111827]"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                <p className="mt-1 text-[11px] text-[#6B7280]">{msg.time}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="mt-2 text-[13px] text-[#6B7280]">AI is typing…</div>
          )}
        </div>

        {/* Divider line */}
        <div className="border-t border-[#E5E7EB] my-3" />

        {/* Quick prompts */}
        <div className="mb-3">
          <p className="text-[13px] text-[#6B7280] mb-2">Quick prompts:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full text-[13px] bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message input */}
        <div className="flex items-center gap-2 mt-auto">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border border-[#E5E7EB] rounded-md px-3 py-2 text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-[#00796B]"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={loading}
            className={`w-10 h-10 rounded-md flex items-center justify-center text-white ${
              loading
                ? "bg-[#9CA3AF] cursor-not-allowed"
                : "bg-[#00796B] hover:bg-[#006458]"
            } transition`}
          >
            <FiSend className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
