import { NextResponse } from "next/server";

/** Railway / monitoring: debe responder 200 si el proceso está vivo */
export async function GET() {
  return NextResponse.json({ ok: true, service: "formula-agencia-landing" });
}
