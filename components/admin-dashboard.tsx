"use client";

import { useCallback, useEffect, useState } from "react";
import { LogOut, Mail, Phone, RefreshCw, Trash2 } from "lucide-react";
import {
  BUDGET_LABELS,
  LEAD_STATUSES,
  SERVICE_LABELS,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
} from "@/lib/leads-types";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads");
      const data = (await res.json()) as { ok?: boolean; leads?: Lead[]; error?: string };
      if (!res.ok || !data.ok || !data.leads) {
        setError(data.error ?? "No se pudieron cargar los leads.");
        return;
      }
      setLeads(data.leads);
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function patchLead(id: string, patch: { status?: LeadStatus; notes?: string }) {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      const data = (await res.json()) as { ok?: boolean; lead?: Lead; error?: string };
      if (!res.ok || !data.ok || !data.lead) {
        alert(data.error ?? "No se pudo guardar.");
        return;
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? data.lead! : l)));
    } finally {
      setSavingId(null);
    }
  }

  async function removeLead(id: string) {
    if (!confirm("¿Eliminar este lead del historial?")) return;
    const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const data = (await res.json()) as { ok?: boolean };
    if (!res.ok || !data.ok) {
      alert("No se pudo eliminar.");
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const filtered =
    filter === "todos" ? leads : leads.filter((l) => l.status === filter);

  const counts = LEAD_STATUSES.reduce(
    (acc, s) => {
      acc[s] = leads.filter((l) => l.status === s).length;
      return acc;
    },
    {} as Record<LeadStatus, number>,
  );

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#648CEB]">
              fórmula AGENCIA
            </p>
            <h1 className="text-xl font-black text-white">Panel de leads</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 transition hover:border-[#648CEB]/40 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 transition hover:border-red-500/40 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("todos")}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              filter === "todos"
                ? "bg-[#648CEB] text-[#0a1628]"
                : "border border-white/10 text-zinc-500 hover:text-white"
            }`}
          >
            Todos ({leads.length})
          </button>
          {LEAD_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                filter === s
                  ? "bg-[#648CEB] text-[#0a1628]"
                  : "border border-white/10 text-zinc-500 hover:text-white"
              }`}
            >
              {STATUS_LABELS[s]} ({counts[s]})
            </button>
          ))}
        </div>

        {error && (
          <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {loading && leads.length === 0 ? (
          <p className="text-center text-zinc-500">Cargando leads…</p>
        ) : filtered.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-12 text-center text-zinc-500">
            {leads.length === 0
              ? "Todavía no hay consultas. Cuando alguien envíe el formulario, aparecerán acá."
              : "No hay leads con este filtro."}
          </p>
        ) : (
          <ul className="space-y-6">
            {filtered.map((lead) => (
              <li
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-lg"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{lead.name}</h2>
                    <p className="mt-1 text-xs text-zinc-500">{formatDate(lead.createdAt)}</p>
                    {lead.company && (
                      <p className="mt-1 text-sm text-zinc-400">{lead.company}</p>
                    )}
                  </div>
                  <select
                    value={lead.status}
                    disabled={savingId === lead.id}
                    onChange={(e) =>
                      patchLead(lead.id, { status: e.target.value as LeadStatus })
                    }
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm font-semibold text-white outline-none focus:border-[#648CEB]/50"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 flex flex-wrap gap-3 text-sm">
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[#648CEB] hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </a>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[#25D366] hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {lead.phone}
                  </a>
                </div>

                <dl className="mb-4 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                      Servicio
                    </dt>
                    <dd className="text-zinc-300">
                      {SERVICE_LABELS[lead.service] ?? lead.service}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                      Presupuesto
                    </dt>
                    <dd className="text-zinc-300">
                      {BUDGET_LABELS[lead.budget] ?? (lead.budget || "—")}
                    </dd>
                  </div>
                </dl>

                <p className="mb-4 whitespace-pre-wrap rounded-xl border border-white/5 bg-black/30 p-4 text-sm leading-relaxed text-zinc-300">
                  {lead.body}
                </p>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Notas internas
                  </span>
                  <textarea
                    defaultValue={lead.notes}
                    rows={2}
                    maxLength={8000}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#648CEB]/50"
                    placeholder="Seguimiento, próxima llamada, etc."
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v !== (lead.notes ?? "")) {
                        patchLead(lead.id, { notes: v });
                      }
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => removeLead(lead.id)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar del historial
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-center text-xs text-zinc-600">
          Acceso privado · fórmula AGENCIA. En Railway los leads persisten en el volumen
          montado (<code className="text-zinc-500">LEADS_DATA_FILE</code>).
        </p>
      </main>
    </div>
  );
}
