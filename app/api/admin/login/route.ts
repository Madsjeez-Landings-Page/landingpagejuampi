import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "Panel no configurado (falta ADMIN_PASSWORD)." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Contraseña incorrecta." }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: "Error de sesión." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
