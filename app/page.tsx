"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  ArrowRight,
  MessageCircle,
  BarChart3,
  Megaphone,
  Layout,
  AtSign,
  Mail,
  Sparkles,
  Globe,
  Target,
  Rocket,
  Search,
  Users,
  ChevronDown,
  TrendingUp,
  Award,
  Layers,
} from "lucide-react";

const INSTAGRAM_AGENCIA = "https://www.instagram.com/formula.agencia/";
const INSTAGRAM_JUAMPI = "https://www.instagram.com/juampicrav/";
const EMAIL = "juanpablocraveromkt@gmail.com";
const WA_URL = "https://wa.me/5492227506533";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Intendente+Tarigo+B1727+Roque+P%C3%A9rez+Buenos+Aires+Argentina";
const ADDRESS =
  "Intendente Tarigo, B1727 Roque Pérez, Provincia de Buenos Aires, Argentina";

function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#00D084]/30 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0,208,132,0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#00D084]" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[28rem] pb-6" : "max-h-0"}`}
      >
        <p className="leading-relaxed text-zinc-400">{content}</p>
      </div>
    </div>
  );
}

const services = [
  {
    icon: Megaphone,
    title: "Campañas en Meta Ads",
    body: "Facebook e Instagram: segmentación, creatividades y optimización para que la pauta rinda.",
  },
  {
    icon: Sparkles,
    title: "Creación de contenido",
    body: "Piezas y formatos alineados a tu marca: copy, reels y adaptación por canal.",
  },
  {
    icon: Users,
    title: "Redes y comunidad",
    body: "Planificación, publicación y conversación con tu audiencia, con foco en community management.",
  },
  {
    icon: Target,
    title: "Marketing digital estratégico",
    body: "Mensaje, prioridades y ejecución coherente con los objetivos de tu negocio.",
  },
];

export default function AgenciaLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030303] font-sans text-zinc-300 selection:bg-[#00D084] selection:text-black">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay bg-noise" />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-5%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#00D084]/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[130px]" />
      </div>

      <header
        className={`fixed left-0 top-0 z-[60] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-black/50 py-4 backdrop-blur-xl"
            : "bg-transparent py-8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D084] to-emerald-800 shadow-lg shadow-[#00D084]/20">
              <span className="text-xl font-black italic text-black">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black uppercase tracking-tighter text-white">
                Agencia Fórmula
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00D084]">
                Marketing y comunicación
              </span>
            </div>
          </a>
          <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400 lg:flex">
            <a href="#metodo" className="transition-colors hover:text-[#00D084]">
              Método
            </a>
            <a href="#servicios" className="transition-colors hover:text-[#00D084]">
              Servicios
            </a>
            <a href="#enfoque" className="transition-colors hover:text-[#00D084]">
              Enfoque
            </a>
            <a href="#faq" className="transition-colors hover:text-[#00D084]">
              FAQ
            </a>
          </div>
          <a
            href="#cta"
            className="rounded-full bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-xl shadow-white/5 transition-all hover:scale-105 hover:bg-[#00D084] active:scale-95 sm:px-6"
          >
            Iniciar proyecto
          </a>
        </div>
      </header>

      <section className="relative z-10 flex flex-col items-center px-6 pb-32 pt-40 text-center sm:pt-56">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00D084] shadow-2xl backdrop-blur-md">
          <Sparkles className="h-3 w-3" />
          Marketing digital estratégico
        </div>

        <h1 className="mb-10 text-balance text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-7xl md:text-[120px]">
          ELIMINAMOS EL
          <br />
          <span className="bg-gradient-to-r from-[#00D084] via-emerald-400 to-emerald-200 bg-clip-text text-transparent">
            RUIDO DIGITAL.
          </span>
        </h1>

        <p className="mb-6 max-w-2xl text-lg font-light leading-relaxed text-zinc-400 md:text-2xl">
          Potenciamos tu negocio con marketing digital estratégico. En{" "}
          <span className="font-semibold text-white">Agencia Fórmula</span>, Juan
          Pablo Cravero (Juampi) —lic. en Comunicación enfocado en marketing— acompaña
          marcas a transformar seguidores en una comunidad sólida.
        </p>
        <p className="mb-14 max-w-xl text-sm text-zinc-500">
          Community management, contenido y operación diaria en redes. Atención por
          WhatsApp e Instagram las 24 horas.
        </p>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <a
            href="#cta"
            className="flex items-center gap-3 rounded-full bg-[#00D084] px-10 py-5 text-lg font-black text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,208,132,0.4)]"
          >
            Agendar sesión estratégica <ArrowRight className="h-5 w-5" />
          </a>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/40 px-4 py-2 text-xs font-bold text-zinc-400">
              <Layout className="h-4 w-4 text-[#00D084]" />
              Roque Pérez, Buenos Aires
            </div>
            <a
              href={INSTAGRAM_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-[#00D084] transition hover:text-emerald-300"
            >
              @formula.agencia
            </a>
            <span className="hidden text-zinc-600 sm:inline">·</span>
            <a
              href={INSTAGRAM_JUAMPI}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 transition hover:text-[#00D084]"
            >
              @juampicrav
            </a>
          </div>
        </div>
      </section>

      <div className="z-20 flex overflow-hidden border-y border-white/5 bg-zinc-900/50 py-8">
        <div className="animate-marquee flex items-center gap-20 whitespace-nowrap">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center gap-20 text-4xl font-black uppercase italic text-zinc-800"
            >
              <span>Performance</span>
              <TrendingUp className="h-10 w-10 text-[#00D084]" />
              <span>Branding</span>
              <Award className="h-10 w-10 text-blue-500" />
              <span>Social media</span>
              <Users className="h-10 w-10 text-purple-500" />
              <span>Scale up</span>
              <Rocket className="h-10 w-10 text-orange-500" />
            </div>
          ))}
        </div>
      </div>

      <section id="servicios" className="relative z-10 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-[#00D084]">
              Servicios
            </h2>
            <h3 className="text-4xl font-black text-white md:text-5xl">
              Lo que hacemos en Agencia Fórmula
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
              Meta Ads, contenido, redes y estrategia — con Juampi al frente del
              ritmo diario y la comunidad.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map(({ icon: Icon, title, body }) => (
              <SpotlightCard key={title}>
                <div className="flex flex-col gap-4 p-8 md:flex-row md:items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00D084]/10 text-[#00D084]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">{title}</h4>
                    <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="relative z-10 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-xs font-black uppercase tracking-[0.4em] text-[#00D084]">
                Metodología Fórmula
              </h2>
              <h3 className="mb-8 text-4xl font-black leading-tight text-white md:text-5xl">
                Un proceso pensado para avanzar sin fricción.
              </h3>
              <p className="mb-10 text-lg leading-relaxed text-zinc-500">
                No vendemos soluciones mágicas: trabajo con auditoría clara, estrategia
                de nicho y ejecución creativa alineada a tu marca.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Search className="h-6 w-6" />,
                    t: "Auditoría 360",
                    d: "Revisamos tu presencia actual para detectar oportunidades y fugas de mensaje.",
                  },
                  {
                    icon: <Target className="h-6 w-6" />,
                    t: "Estrategia y nicho",
                    d: "Definimos a quién hablamos, en qué tono y en qué canales conviene invertir tiempo.",
                  },
                  {
                    icon: <Layers className="h-6 w-6" />,
                    t: "Ejecución creativa",
                    d: "Piezas que detienen el scroll y generan conversación, siempre con tu ADN.",
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="flex gap-6 rounded-[1.5rem] border border-white/5 bg-white/5 p-6 transition-colors hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00D084]/10 text-[#00D084]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-white">{item.t}</h4>
                      <p className="text-sm text-zinc-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#00D084]/20 to-blue-600/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
                  alt="Equipo trabajando en estrategia digital"
                  className="h-[480px] w-full object-cover opacity-60 grayscale transition-all duration-700 hover:grayscale-0 md:h-[600px]"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="enfoque"
        className="border-y border-white/5 bg-white/5 px-6 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                Enfoque real.
              </h2>
              <p className="text-zinc-500">
                Más allá de los likes: alineamos contenido, pauta y comunidad con
                objetivos de negocio. Métricas y aprendizajes para ajustar cada mes.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="rounded-2xl border border-white/5 bg-zinc-900 p-4">
                <span className="flex items-center gap-2 text-2xl font-black text-[#00D084]">
                  <BarChart3 className="h-8 w-8" />
                </span>
                <span className="mt-2 block text-[10px] font-bold uppercase text-zinc-500">
                  Reporting claro
                </span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-zinc-900 p-4">
                <span className="flex items-center gap-2 text-2xl font-black text-blue-500">
                  <Rocket className="h-8 w-8" />
                </span>
                <span className="mt-2 block text-[10px] font-bold uppercase text-zinc-500">
                  Ejecución ágil
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Pauta & performance",
                tag: "Meta Ads",
                gradient: "from-[#00D084]/30 to-emerald-900/40",
              },
              {
                title: "Contenido & marca",
                tag: "Creación",
                gradient: "from-blue-600/20 to-violet-900/30",
              },
              {
                title: "Comunidad & conversión",
                tag: "Redes",
                gradient: "from-orange-500/20 to-rose-900/30",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[4/5] cursor-default overflow-hidden rounded-[2rem]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute bottom-10 left-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00D084]">
                    {item.tag}
                  </span>
                  <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-16 text-center text-4xl font-black text-white md:text-5xl">
            Preguntas <span className="text-[#00D084]">frecuentes.</span>
          </h2>
          <div className="space-y-4">
            <AccordionItem
              title="¿En cuánto tiempo veré resultados?"
              content="Los resultados orgánicos suelen notarse entre los primeros 45 y 90 días, según nicho y frecuencia. Si necesitás impacto más rápido, lo combinamos con pauta en Meta Ads."
            />
            <AccordionItem
              title="¿Trabajan todas las redes?"
              content="Nos enfocamos donde hay retorno: principalmente Instagram y Facebook para pauta y comunidad; evaluamos TikTok o LinkedIn según tu audiencia y objetivos."
            />
            <AccordionItem
              title="¿El contenido es original?"
              content="Sí. Piezas y textos pensados para tu marca: tono, formatos y calendario acordes a Agencia Fórmula y a lo que vos necesitás comunicar."
            />
            <AccordionItem
              title="¿Cómo son los reportes?"
              content="Resumen mensual con métricas de alcance, interacción y aprendizajes, más una instancia de revisión para ajustar la estrategia."
            />
          </div>
        </div>
      </section>

      <section id="cta" className="px-6 pb-24 md:px-8 md:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/50 p-12 text-center md:rounded-[4rem] md:p-20">
          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#00D084]/5 blur-[120px]" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-12 flex h-24 w-24 animate-bounce items-center justify-center rounded-3xl bg-[#00D084]/20 text-[#00D084]">
              <Rocket className="h-12 w-12" />
            </div>
            <h2 className="mb-8 text-4xl font-black tracking-tighter text-white md:text-6xl">
              ¿LISTO PARA EL SIGUIENTE NIVEL?
            </h2>
            <p className="mb-12 max-w-xl text-lg italic leading-relaxed text-zinc-500 md:text-xl">
              &ldquo;La mejor inversión que podés hacer hoy es en la atención de tu
              audiencia.&rdquo;
            </p>

            <div className="flex flex-col gap-6 sm:flex-row">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-base font-black text-black shadow-2xl transition-all hover:scale-105 md:px-12 md:py-6 md:text-lg"
              >
                <MessageCircle className="h-6 w-6" />
                WhatsApp (+54 9 2227 50-6533)
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full bg-zinc-800 px-10 py-5 text-base font-black text-white transition-all hover:bg-zinc-700 md:px-12 md:py-6 md:text-lg"
              >
                {EMAIL}
              </a>
            </div>
            <p className="mt-8 max-w-lg text-sm text-zinc-500">{ADDRESS}</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-sm font-bold text-[#00D084] underline-offset-4 hover:underline"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black px-6 py-16 text-center md:py-20">
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={INSTAGRAM_AGENCIA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/5 p-4 text-zinc-400 transition-all hover:bg-white/10 hover:text-[#00D084]"
            aria-label="Instagram Agencia Fórmula"
          >
            <AtSign className="h-6 w-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              @formula.agencia
            </span>
          </a>
          <a
            href={INSTAGRAM_JUAMPI}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/5 p-4 text-zinc-400 transition-all hover:bg-white/10 hover:text-[#00D084]"
            aria-label="Instagram Juampi"
          >
            <AtSign className="h-6 w-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              @juampicrav
            </span>
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/5 p-4 text-zinc-400 transition-all hover:bg-white/10 hover:text-blue-500"
            aria-label="Ubicación en mapa"
          >
            <Globe className="h-6 w-6" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-white/5 p-4 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
          © {new Date().getFullYear()} Agencia Fórmula · Juan Pablo Cravero (Juampi) ·
          Estrategia · Innovación · Crecimiento
        </p>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-zinc-600">
          {ADDRESS}
        </p>
      </footer>
    </div>
  );
}
