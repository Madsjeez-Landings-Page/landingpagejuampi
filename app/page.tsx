"use client";

import Image from "next/image";
import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Megaphone,
  Layout,
  Sparkles,
  Target,
  Rocket,
  Search,
  Users,
  ChevronDown,
  TrendingUp,
  Award,
  Layers,
} from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { InstagramLogo, WhatsAppLogo } from "@/components/brand-icons";
import { BRAND_RGB } from "@/lib/brand";

const INSTAGRAM_AGENCIA = "https://www.instagram.com/formula.agencia/";
const WA_URL = "https://wa.me/5492227506533";
/** Madsjeez — consultas por una web similar (+54 9 11 2181-6064) */
const WA_MADSJEEZ = "https://wa.me/5491121816064";
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
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#648CEB]/40 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(${BRAND_RGB},0.14), transparent 40%)`,
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
          className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#648CEB]" : ""}`}
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
    <div className="min-h-screen overflow-x-hidden bg-[#030303] font-sans text-zinc-300 selection:bg-[#648CEB] selection:text-white">
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
        <div className="absolute right-[-5%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#648CEB]/10 blur-[150px]" />
        <div
          className="absolute bottom-[10%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[130px]"
          style={{ backgroundColor: `rgba(10, 24, 46, 0.45)` }}
        />
      </div>

      <header
        className={`fixed left-0 top-0 z-[60] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-black/50 py-4 backdrop-blur-xl"
            : "bg-transparent py-8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          <a
            href="/"
            className="flex shrink-0 items-center"
            aria-label="fórmula AGENCIA — inicio"
          >
            <Image
              src="/logo-formula-lockup.png"
              alt="fórmula AGENCIA"
              width={200}
              height={40}
              className="h-8 w-auto max-w-[180px] object-contain object-left sm:h-9 sm:max-w-[220px]"
              priority
            />
          </a>
          <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400 lg:flex">
            <a href="#sobre" className="transition-colors hover:text-[#648CEB]">
              Sobre
            </a>
            <a href="#sobre-mi" className="transition-colors hover:text-[#648CEB]">
              Sobre mí
            </a>
            <a href="#servicios" className="transition-colors hover:text-[#648CEB]">
              Servicios
            </a>
            <a href="#metodo" className="transition-colors hover:text-[#648CEB]">
              Método
            </a>
            <a href="#faq" className="transition-colors hover:text-[#648CEB]">
              FAQ
            </a>
            <a href="#contacto" className="transition-colors hover:text-[#648CEB]">
              Contacto
            </a>
          </div>
          <a
            href="#contacto"
            className="rounded-full bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-xl shadow-white/5 transition-all hover:scale-105 hover:bg-[#648CEB] active:scale-95 sm:px-6"
          >
            Pedir propuesta
          </a>
        </div>
      </header>

      <section className="relative z-10 flex flex-col items-center px-6 pb-28 pt-40 text-center sm:pt-56">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#648CEB] shadow-2xl backdrop-blur-md">
          <Sparkles className="h-3 w-3" />
          Marketing digital estratégico
        </div>

        <h1 className="mb-10 text-balance text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-7xl md:text-[120px]">
          ELIMINAMOS EL
          <br />
          <span className="bg-gradient-to-r from-[#648CEB] via-sky-400 to-cyan-100 bg-clip-text text-transparent">
            RUIDO DIGITAL.
          </span>
        </h1>

        <p className="mb-14 max-w-2xl text-lg font-light leading-relaxed text-zinc-400 md:text-2xl">
          En <span className="font-semibold text-white">Fórmula</span> ayudamos a
          negocios y marcas a mejorar su comunicación digital a través de estrategia,
          contenido y creatividad.{" "}
          <span className="text-zinc-500">
            Atención por WhatsApp e Instagram las 24 horas.
          </span>
        </p>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/40 px-4 py-2 text-xs font-bold text-zinc-400">
          <Layout className="h-4 w-4 text-[#648CEB]" />
          {ADDRESS}
        </div>

        <a
          href="#contacto"
          className="mt-10 flex items-center gap-3 rounded-full bg-[#648CEB] px-10 py-5 text-lg font-black text-[#0a1628] transition-all hover:scale-105 hover:shadow-[0_0_44px_rgba(100,140,235,0.5)]"
        >
          Pedir propuesta <ArrowRight className="h-5 w-5" />
        </a>
      </section>

      <section
        id="sobre"
        className="relative z-10 border-t border-white/5 bg-zinc-950/40 px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-xs font-black uppercase tracking-[0.4em] text-[#648CEB]">
            Sobre Fórmula
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-zinc-400 md:text-xl">
            Trabajamos en gestión de redes sociales, producción de contenido y
            publicidad digital, desarrollando propuestas pensadas para cada negocio y
            enfocadas en construir una presencia profesional, clara y auténtica.
          </p>
          <p className="border-l-2 border-[#648CEB]/60 pl-6 text-xl font-medium leading-snug text-white md:text-2xl">
            Creemos que detrás de cada marca tiene que haber una estrategia real.
          </p>
        </div>
      </section>

      <section
        id="sobre-mi"
        className="relative z-10 border-t border-white/5 bg-[#030303] px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-xs font-black uppercase tracking-[0.4em] text-[#648CEB]">
            Sobre mí
          </h2>
          <p className="mb-6 text-lg font-medium text-white md:text-xl">
            Soy Juan Pablo Cravero, Licenciado en Comunicación y fundador de Fórmula.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
            Hace varios años trabajo en marketing digital y comunicación para marcas,
            negocios y emprendimientos, combinando estrategia, creatividad y producción
            de contenido para ayudar a que cada proyecto comunique mejor y crezca de
            forma profesional.
          </p>
          <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
            Mi enfoque está puesto en crear marcas con identidad, contenido de calidad y
            una comunicación pensada para generar resultados reales.
          </p>
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
              <TrendingUp className="h-10 w-10 text-[#648CEB]" />
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
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-[#648CEB]">
              Servicios
            </h2>
            <h3 className="text-4xl font-black text-white md:text-5xl">
              Lo que hacemos en fórmula
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
              Redes, contenido y pauta digital — propuestas a medida para una presencia
              profesional y auténtica, con Juampi al frente del ritmo diario.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map(({ icon: Icon, title, body }) => (
              <SpotlightCard key={title}>
                <div className="flex flex-col gap-4 p-8 md:flex-row md:items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#648CEB]/10 text-[#648CEB]">
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
              <h2 className="mb-6 text-xs font-black uppercase tracking-[0.4em] text-[#648CEB]">
                Metodología fórmula
              </h2>
              <h3 className="mb-8 text-4xl font-black leading-tight text-white md:text-5xl">
                Un proceso pensado para avanzar sin fricción.
              </h3>
              <p className="mb-10 text-lg leading-relaxed text-zinc-500">
                Auditoría clara, estrategia de nicho y ejecución creativa alineada a tu
                marca — sin promesas vacías.
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#648CEB]/10 text-[#648CEB]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-white">{item.t}</h4>
                      <p className="text-sm text-zinc-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-zinc-900/80 p-4">
                  <BarChart3 className="h-8 w-8 text-[#648CEB]" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500">
                      Reporting
                    </span>
                    <p className="text-sm font-bold text-white">Métricas accionables</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-zinc-900/80 p-4">
                  <Rocket className="h-8 w-8 text-blue-500" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500">
                      Ritmo
                    </span>
                    <p className="text-sm font-bold text-white">Ejecución ágil</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#648CEB]/20 to-blue-600/20 blur-3xl" />
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

      <section id="faq" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-16 text-center text-4xl font-black text-white md:text-5xl">
            Preguntas <span className="text-[#648CEB]">frecuentes.</span>
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
              content="Sí. Piezas y textos pensados para tu marca: tono, formatos y calendario acordes a fórmula y a lo que vos necesitás comunicar."
            />
            <AccordionItem
              title="¿Cómo son los reportes?"
              content="Resumen mensual con métricas de alcance, interacción y aprendizajes, más una instancia de revisión para ajustar la estrategia."
            />
          </div>
        </div>
      </section>

      <section id="contacto" className="px-6 pb-24 md:px-8 md:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/50 p-10 md:rounded-[4rem] md:p-16">
          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#648CEB]/5 blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tighter text-white md:text-5xl">
              Hablemos de tu próximo paso
            </h2>
            <p className="mb-10 text-lg text-zinc-500">
              Dejanos tus datos y contanos el objetivo. Respondemos con una propuesta
              acorde. También podés escribirnos por los canales oficiales.
            </p>

            <LeadForm />

            <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Canales oficiales
              </p>
              <div className="flex items-center justify-center gap-6">
                <a
                  href={INSTAGRAM_AGENCIA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:scale-105 hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10 hover:text-[#fd5f93]"
                  aria-label="Instagram de fórmula"
                >
                  <InstagramLogo className="h-8 w-8" />
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#25D366] transition-all hover:scale-105 hover:border-[#25D366]/50 hover:bg-[#25D366]/10"
                  aria-label="WhatsApp fórmula"
                >
                  <WhatsAppLogo className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black px-6 py-14 text-center md:py-16">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-formula-lockup.png"
            alt="fórmula AGENCIA"
            width={240}
            height={48}
            className="h-10 w-auto max-w-[260px] object-contain sm:h-11"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
          © {new Date().getFullYear()} fórmula AGENCIA · Juan Pablo Cravero (Juampi)
        </p>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-zinc-600">
          {ADDRESS}
        </p>
        <div className="mx-auto mt-8 max-w-lg border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-zinc-500">
            Sitio desarrollado por{" "}
            <span className="font-semibold text-zinc-400">Madsjeez</span>. ¿Querés una web
            igual? Tocá el enlace y escribinos por WhatsApp.
          </p>
          <a
            href={WA_MADSJEEZ}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
          >
            <WhatsAppLogo className="h-5 w-5 shrink-0" />
            WhatsApp Madsjeez
          </a>
        </div>
      </footer>
    </div>
  );
}
