import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    // Convert messages -> Responses API "input"
    const inputFormat = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: inputFormat,
        max_output_tokens: 300,
      }),
    });

    const data = await openaiRes.json();
    console.log("OPENAI RAW RESPONSE:", JSON.stringify(data, null, 2));

    if (!openaiRes.ok || data?.error) {
      console.error("OPENAI ERROR:", data.error || data);
      return NextResponse.json(
        { error: data.error?.message || "OpenAI request failed" },
        { status: 500 }
      );
    }

    // ---- Extract text safely from Responses API shape ----
    let reply = "No response generated.";

    if (typeof data.output_text === "string") {
      // some SDKs add this convenience field
      reply = data.output_text;
    } else if (Array.isArray(data.output) && data.output.length > 0) {
      const firstOutput = data.output[0];
      const firstContent = firstOutput?.content?.[0];

      // content[0].text can be a string or an object with .value
      const textObj = firstContent?.text;

      if (typeof textObj === "string") {
        reply = textObj;
      } else if (textObj && typeof textObj.value === "string") {
        reply = textObj.value;
      }
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("AI Assistant API error:", err);
    return NextResponse.json(
      { error: "Server error processing AI request" },
      { status: 500 }
    );
  }
}
