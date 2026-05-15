"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }
      const from = searchParams.get("from");
      router.push(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-md">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#648CEB]">
          fórmula AGENCIA
        </p>
        <h1 className="mb-2 text-2xl font-black text-white">Panel de leads</h1>
        <p className="mb-8 text-sm text-zinc-500">
          Ingresá la contraseña para ver y administrar las consultas del formulario.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500"
            >
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#648CEB]/50 focus:ring-2 focus:ring-[#648CEB]/20"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#648CEB] py-4 text-sm font-black uppercase tracking-widest text-[#0a1628] transition hover:shadow-[0_0_32px_rgba(100,140,235,0.4)] disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar al panel"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#030303] text-zinc-500">
          Cargando…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
