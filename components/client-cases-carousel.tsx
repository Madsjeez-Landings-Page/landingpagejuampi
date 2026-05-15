"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { BRAND_RGB } from "@/lib/brand";

/** Editá esta lista con clientes y casos reales cuando los tengas. */
export const CLIENT_CASES = [
  {
    tag: "Redes + contenido",
    title: "Comercio local · alimentos",
    summary:
      "Calendario de publicaciones, reels de producto y tono de marca unificado para pasar de publicar “por publicar” a contar una historia clara.",
    quote:
      "Por fin tenemos un feed que se ve profesional y la gente nos escribe con consultas concretas.",
    author: "Dueña · Buenos Aires",
    highlight: "Más mensajes directos calificados",
  },
  {
    tag: "Meta Ads",
    title: "Servicios profesionales",
    summary:
      "Campañas de captación con creatividades probadas, segmentación por zona y seguimiento quincenal para ajustar inversión.",
    quote:
      "Entendimos qué anuncios funcionan y dejamos de tirar presupuesto a ciegas.",
    author: "Responsable de marketing · interior",
    highlight: "Costo por lead bajo control",
  },
  {
    tag: "Identidad + redes",
    title: "Marca personal · emprendimiento",
    summary:
      "Guía de voz, plantillas de historias y piezas simples para sostener constancia sin depender de tendencias pasajeras.",
    quote:
      "Juampi nos ordenó el mensaje; ahora sé qué decir cada semana sin bloquearme.",
    author: "Fundadora · proyecto propio",
    highlight: "Constancia + coherencia visual",
  },
  {
    tag: "Community + pauta",
    title: "PyME · producto regional",
    summary:
      "Respuesta en comentarios y MD, FAQs armadas y remarketing suave para cerrar la venta después del primer contacto.",
    quote:
      "Se nota que hay alguien detrás de la cuenta; los clientes vuelven y recomiendan.",
    author: "Director comercial · La Pampa",
    highlight: "Más recompra y referidos",
  },
] as const;

const AUTO_MS = 6500;

export function ClientCasesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const resumeAt = useRef<number>(0);

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
      resumeAt.current = Date.now() + 20000;
    },
    [count],
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => {
      if (Date.now() < resumeAt.current) return;
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion, count]);

  const c = CLIENT_CASES[index];

  return (
    <section
      id="casos"
      className="relative z-10 border-y border-white/5 bg-zinc-950/30 px-6 py-24 md:px-8 md:py-32"
      aria-labelledby="casos-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
          {paused ? " · Carrusel en pausa" : ""}
          {reduceMotion ? " · Avance manual" : ""}
        </p>
      </div>
    </section>
  );
}
