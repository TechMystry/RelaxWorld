// src/app/api/quote/route.ts
import { NextResponse } from "next/server";

// Define expected payload shape
interface QuotePayload {
  fullName: string;
  email: string;
  phone?: string;
  destination?: string;
  travelDate?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as QuotePayload;

    const required: (keyof QuotePayload)[] = ["fullName", "email"];
    for (const key of required) {
      if (!payload[key] || typeof payload[key] !== "string") {
        return NextResponse.json(
          { message: `Missing or invalid field: ${key}` },
          { status: 400 }
        );
      }
    }

    // Generate unique ID
    const id = `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    // TODO: In production — save to DB, send email, etc.
    console.log("Quote request received:", { id, payload });

    return NextResponse.json(
      {
        id,
        ok: true,
        message: "Quote requested successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    // No more `any` — we don't need to inspect the error
    console.error("Quote API error:", err);
    return NextResponse.json(
      { message: "Invalid request payload" },
      { status: 400 }
    );
  }
}