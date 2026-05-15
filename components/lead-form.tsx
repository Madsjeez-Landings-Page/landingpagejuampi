"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  { value: "", label: "Seleccioná un servicio" },
  { value: "meta-ads", label: "Campañas en Meta Ads" },
  { value: "contenido", label: "Creación de contenido" },
  { value: "redes-community", label: "Redes sociales y community" },
  { value: "estrategia", label: "Marketing digital estratégico" },
  { value: "no-seguro", label: "Aún no lo tengo claro" },
] as const;

const BUDGET_OPTIONS = [
  { value: "", label: "Presupuesto mensual (opcional)" },
  { value: "explorando", label: "Solo estoy explorando" },
  { value: "bajo", label: "Hasta aprox. USD 500 / mes" },
  { value: "medio", label: "USD 500 – 2.000 / mes" },
  { value: "alto", label: "Más de USD 2.000 / mes" },
  { value: "definir", label: "Prefiero definirlo en una llamada" },
] as const;

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const botcheck = String(fd.get("botcheck") ?? "").trim();
    if (botcheck) return;

    setStatus("loading");
    setMessage("");

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      body: String(fd.get("body") ?? "").trim(),
      consent: fd.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "No pudimos enviar el formulario. Intentá de nuevo.");
        return;
      }
      setStatus("success");
      setMessage(
        "Recibimos tu consulta. Te vamos a contactar a la brevedad con una propuesta acorde a tu necesidad.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Verificá tu internet e intentá de nuevo.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-5 text-left"
    >
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            Nombre y apellido *
          </label>
          <input
            id="lead-name"
            name="name"
            required
            minLength={2}
            maxLength={120}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-[#6495ED]/0 transition placeholder:text-zinc-600 focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
            placeholder="Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="lead-company" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            Empresa / marca
          </label>
          <input
            id="lead-company"
            name="company"
            maxLength={160}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
            placeholder="Opcional"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            Email corporativo *
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
            placeholder="nombre@empresa.com"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            WhatsApp / teléfono *
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            minLength={8}
            maxLength={40}
            autoComplete="tel"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
            placeholder="+54 9 …"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-service" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            ¿Qué necesitás? *
          </label>
          <select
            id="lead-service"
            name="service"
            required
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
            defaultValue=""
          >
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value || "empty"} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lead-budget" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            Inversión estimada
          </label>
          <select
            id="lead-budget"
            name="budget"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
            defaultValue=""
          >
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value || "empty-b"} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lead-body" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
          Contanos tu objetivo *
        </label>
        <textarea
          id="lead-body"
          name="body"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#6495ED]/50 focus:ring-2 focus:ring-[#6495ED]/20"
          placeholder="Ej.: queremos vender más en Instagram, lanzar pauta, mejorar el mensaje de marca…"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-400">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-black/40 text-[#6495ED] focus:ring-[#6495ED]/30"
        />
        <span>
          Acepto que Agencia Fórmula use mis datos solo para responder esta consulta,
          según la normativa de protección de datos vigente. *
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-[#6495ED] py-4 text-sm font-black uppercase tracking-widest text-[#0a1628] transition hover:shadow-[0_0_32px_rgba(100,149,237,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar consulta"}
      </button>

      {status === "success" && (
        <p className="rounded-xl border border-[#6495ED]/30 bg-[#6495ED]/10 px-4 py-3 text-center text-sm text-sky-100">
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
          {message}
        </p>
      )}
    </form>
  );
}
