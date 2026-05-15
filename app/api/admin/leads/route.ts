import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth-server";
import { deleteLead, listLeads, updateLead } from "@/lib/leads-store";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads-types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ ok: true, leads });
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const b = json as { id?: string; status?: string; notes?: string };
  if (typeof b.id !== "string" || !b.id) {
    return NextResponse.json({ ok: false, error: "ID requerido." }, { status: 400 });
  }

  const patch: { status?: LeadStatus; notes?: string } = {};
  if (b.status !== undefined) {
    if (!LEAD_STATUSES.includes(b.status as LeadStatus)) {
      return NextResponse.json({ ok: false, error: "Estado inválido." }, { status: 400 });
    }
    patch.status = b.status as LeadStatus;
  }
  if (b.notes !== undefined) {
    if (typeof b.notes !== "string" || b.notes.length > 8000) {
      return NextResponse.json({ ok: false, error: "Notas inválidas." }, { status: 400 });
    }
    patch.notes = b.notes;
  }

  const lead = await updateLead(b.id, patch);
  if (!lead) {
    return NextResponse.json({ ok: false, error: "Lead no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "ID requerido." }, { status: 400 });
  }

  const removed = await deleteLead(id);
  if (!removed) {
    return NextResponse.json({ ok: false, error: "Lead no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
