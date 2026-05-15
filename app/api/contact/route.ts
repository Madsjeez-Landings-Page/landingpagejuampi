import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads-store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  body: string;
  consent: boolean;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const b = json as Partial<Body>;
  if (typeof b.name !== "string" || typeof b.email !== "string") {
    return NextResponse.json({ ok: false, error: "Datos incompletos." }, { status: 400 });
  }

  const name = b.name.trim();
  const email = b.email.trim().toLowerCase();
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  if (company.length > 160) {
    return NextResponse.json({ ok: false, error: "Datos inválidos." }, { status: 400 });
  }
  const service = typeof b.service === "string" ? b.service.trim() : "";
  const budget = typeof b.budget === "string" ? b.budget.trim() : "";
  const body = typeof b.body === "string" ? b.body.trim() : "";
  const consent = b.consent === true;

  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Debés aceptar el uso de datos para continuar." },
      { status: 400 },
    );
  }
  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Revisá el nombre." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Email inválido." }, { status: 400 });
  }
  if (phone.length < 8 || phone.length > 40) {
    return NextResponse.json({ ok: false, error: "Teléfono inválido." }, { status: 400 });
  }

  const SERVICES = new Set([
    "meta-ads",
    "contenido",
    "redes-community",
    "estrategia",
    "no-seguro",
  ]);
  const BUDGETS = new Set([
    "",
    "explorando",
    "bajo",
    "medio",
    "alto",
    "definir",
  ]);

  if (!service || !SERVICES.has(service)) {
    return NextResponse.json({ ok: false, error: "Elegí un servicio válido." }, { status: 400 });
  }
  if (budget.length > 24 || !BUDGETS.has(budget)) {
    return NextResponse.json({ ok: false, error: "Datos inválidos." }, { status: 400 });
  }
  if (body.length < 20 || body.length > 4000) {
    return NextResponse.json(
      { ok: false, error: "El mensaje debe tener al menos 20 caracteres." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  const lines = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    company ? `Empresa: ${company}` : null,
    `Servicio: ${service}`,
    budget ? `Presupuesto: ${budget}` : null,
    "",
    "Mensaje:",
    body,
  ].filter(Boolean);

  const text = lines.join("\n");
  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">${escapeHtml(text)}</pre>`;

  try {
    await createLead({
      name,
      email,
      phone,
      company,
      service,
      budget,
      body,
    });
  } catch (err) {
    console.error("[contact] No se pudo guardar el lead:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos registrar tu consulta. Intentá más tarde." },
      { status: 500 },
    );
  }

  if (apiKey && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Lead web] ${name} — ${service}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[contact] Resend error:", res.status, errText);
      return NextResponse.json(
        { ok: false, error: "No pudimos enviar el correo. Intentá más tarde." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] Lead (sin Resend configurado):\n", text);
  }

  return NextResponse.json({ ok: true });
}
