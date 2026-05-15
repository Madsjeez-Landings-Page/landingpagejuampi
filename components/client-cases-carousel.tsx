"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { BRAND_RGB } from "@/lib/brand";

export const CLIENT_CASES = [
  {
    tag: "Turismo · gastronomía",
    title: "Estancia Los Álamos",
    summary:
      "Comunicación digital ordenada y alineada a la esencia del lugar: imagen de marca, redes y seguimiento constante en cada detalle.",
    quote:
      "Trabajar con Fórmula nos ayudó a ordenar y potenciar toda nuestra comunicación digital. No solo mejoraron la imagen de nuestra marca, sino que también lograron transmitir la esencia del lugar en redes sociales. Se nota el compromiso, la creatividad y el seguimiento constante en cada detalle.",
    author: "Karina, Patricia y Dalma · Estancia Los Álamos",
    highlight: "Marca e identidad en redes",
  },
  {
    tag: "Restaurante · bar",
    title: "Alameda Resto Bar",
    summary:
      "Redes más profesionales y activas, con ideas nuevas, contenido creativo y estrategias orientadas a resultados.",
    quote:
      "Desde que empezamos a trabajar con Fórmula, nuestras redes empezaron a verse mucho más profesionales y activas. Siempre aportan ideas nuevas, contenido creativo y estrategias que generan resultados. Muy recomendados.",
    author: "Alameda Resto Bar",
    highlight: "Redes activas y profesionales",
  },
  {
    tag: "Crecimiento · multi-sucursal",
    title: "El Bunker del Escabio",
    summary:
      "Acompañamiento desde el inicio: de una sucursal a dos, con creatividad, ideas y presencia constante en redes y comunicación.",
    quote:
      "Fórmula nos acompaña desde el comienzo de El Bunker. Arrancamos con una sola sucursal y hoy, después de mucho trabajo, ya contamos con dos. Siempre estuvieron presentes aportando ideas, creatividad y ayudándonos a crecer en redes y comunicación. Juampi siempre está atento y predispuesto.",
    author: "Iván · El Bunker del Escabio",
    highlight: "De 1 a 2 sucursales",
  },
] as const;

const AUTO_MS = 5500;

function TrustStars({ label }: { label: string }) {
  return (
    <div
      className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      role="img"
      aria-label="Cinco estrellas. Los clientes recomiendan fórmula AGENCIA"
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className="h-6 w-6 shrink-0 fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)] sm:h-7 sm:w-7"
            aria-hidden
          />
        ))}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-100/90 sm:text-right">
        {label}
      </p>
    </div>
  );
}

export function ClientCasesCarousel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeAt = useRef<number>(0);
  const progressRaf = useRef<number>(0);

  const count = CLIENT_CASES.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
      resumeAt.current = Date.now() + 18000;
    },
    [count],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => {
      if (Date.now() < resumeAt.current) return;
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [reduceMotion, count]);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const slideStarted = Date.now();
    const tick = () => {
      const now = Date.now();
      if (now < resumeAt.current) {
        setProgress(0);
        progressRaf.current = requestAnimationFrame(tick);
        return;
      }
      const effectiveStart = Math.max(slideStarted, resumeAt.current);
      const p = Math.min(1, (now - effectiveStart) / AUTO_MS);
      setProgress(p);
      if (p < 1) {
        progressRaf.current = requestAnimationFrame(tick);
      }
    };
    progressRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRaf.current);
  }, [index, reduceMotion]);

  const c = CLIENT_CASES[index];

  return (
    <section
      id="casos"
      className="relative z-10 border-y border-white/5 bg-zinc-950/30 px-6 py-24 md:px-8 md:py-32"
      aria-labelledby="casos-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(ellipse 90% 55% at 50% 0%, rgba(${BRAND_RGB},0.1), transparent 58%)`,
        }}
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2
            id="casos-heading"
            className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-[#648CEB]"
          >
            Casos y testimonios
          </h2>
          <h3 className="text-4xl font-black text-white md:text-5xl">
            Clientes contentos
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
            Estrategia, creatividad y ejecución: historias de proyectos que acompañamos
            con la misma metodología.
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md"
          style={{
            background: `linear-gradient(145deg, rgba(24,24,27,0.9) 0%, rgba(9,9,11,0.95) 100%)`,
          }}
        >
          {!reduceMotion && (
            <div
              className="h-1 w-full bg-white/[0.06]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-label="Progreso hasta el siguiente caso"
            >
              <div
                className="h-full bg-gradient-to-r from-[#648CEB] to-sky-400"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}

          <div
            className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(${BRAND_RGB},0.35), transparent 70%)`,
            }}
          />

          <div className="relative px-6 py-10 md:px-12 md:py-12">
            <Quote
              className="mb-6 h-10 w-10 text-[#648CEB]/50"
              aria-hidden
            />

            <TrustStars label="Recomiendan fórmula AGENCIA · 5 estrellas" />

            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#648CEB]">
              {c.tag}
            </p>
            <h4 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              {c.title}
            </h4>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {c.summary}
            </p>

            <blockquote className="border-l-2 border-[#648CEB]/50 pl-6">
              <p className="text-lg font-medium italic leading-relaxed text-zinc-200 md:text-xl">
                “{c.quote}”
              </p>
              <footer className="mt-4 text-sm font-semibold text-zinc-500">
                {c.author}
              </footer>
            </blockquote>

            <div className="mt-8 inline-flex rounded-full border border-[#648CEB]/30 bg-[#648CEB]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#648CEB]">
              {c.highlight}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/5 px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#648CEB]/50 hover:bg-[#648CEB]/15 hover:text-[#648CEB]"
              aria-label="Caso anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
              {CLIENT_CASES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir al caso ${i + 1} de ${count}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => {
                    setIndex(i);
                    resumeAt.current = Date.now() + 20000;
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-[#648CEB]"
                      : "w-2.5 bg-zinc-600 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#648CEB]/50 hover:bg-[#648CEB]/15 hover:text-[#648CEB]"
              aria-label="Caso siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p
          className="mt-6 text-center text-xs text-zinc-600"
          aria-live="polite"
        >
          Caso {index + 1} de {count}
          {reduceMotion
            ? " · Avance manual (accesibilidad)"
            : " · Carrusel automático"}
        </p>
      </div>
    </section>
  );
}
