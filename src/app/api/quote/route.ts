import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const required = ["fullName", "email"];
    for (const key of required) {
      if (!payload?.[key]) {
        return NextResponse.json({ message: `Missing field: ${key}` }, { status: 400 });
      }
    }

    const id = `q_${Date.now()}`;
    // For now, just log. In production, persist to DB or send an email.
    console.log("Quote request", { id, payload });

    return NextResponse.json({ id, ok: true, message: "Quote requested successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Invalid request" }, { status: 400 });
  }
}