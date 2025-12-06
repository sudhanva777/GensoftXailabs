import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemInstruction = `You are Apex Tech's helpful AI assistant. You help students understand Data Science, internships, major projects, tech career pathways, and details about Apex Tech programs. Your responses should be simple, clear, friendly, and helpful.`;

    const conversationHistory = messages
      .map((m: { role: string; content: string }) => {
        if (m.role === "user") {
          return `User: ${m.content}`;
        } else {
          return `Assistant: ${m.content}`;
        }
      })
      .join("\n");

    const prompt = `${systemInstruction}\n\n${conversationHistory}\n\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json(
      {
        role: "assistant",
        content: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Chat API error. Please try again." },
      { status: 500 }
    );
  }
}

