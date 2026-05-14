const INSTAGRAM_AGENCIA =
  "https://www.instagram.com/formula.agencia/";

const services = [
  {
    title: "Marketing y comunicación",
    body: "Mensajes claros y coherentes con la marca: posicionamiento, campañas y piezas que hablan con tu audiencia.",
  },
  {
    title: "Contenido y redes",
    body: "Calendario, copy, reels y formatos adaptados a cada canal para mantener presencia constante y profesional.",
  },
  {
    title: "Community management",
    body: "Moderación, respuestas y conversación con foco en la experiencia de quienes siguen tu marca.",
  },
  {
    title: "Seguimiento y mejora",
    body: "Lectura de métricas y aprendizajes para ajustar lo que publicamos y cómo lo decimos.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-black/5 bg-surface/80 backdrop-blur-md dark:border-white/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
          <div className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight">
              Juampi · Community Manager
            </span>
            <a
              href={INSTAGRAM_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/55 transition hover:text-accent"
            >
              Agencia Fórmula · Marketing y comunicación
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={INSTAGRAM_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-foreground/15 px-3 py-2 text-xs font-medium transition hover:bg-foreground/5 sm:inline-flex"
            >
              @formula.agencia
            </a>
            <a
              href="#contacto"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:text-[#0f0e0c]"
            >
              Hablemos
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent-muted/60 blur-3xl dark:bg-accent-muted/30"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              Agencia Fórmula · Marketing y comunicación
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Redes con intención, comunidad con criterio
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/75">
              Soy Juampi, community manager en{" "}
              <a
                href={INSTAGRAM_AGENCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
              >
                Agencia Fórmula
              </a>
              . Acompaño a marcas y emprendedores a ordenar su presencia digital, publicar con constancia y
              construir vínculos reales con su audiencia.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contacto"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white transition hover:opacity-90 dark:text-[#0f0e0c]"
              >
                Agendar una charla
              </a>
              <a
                href="#servicios"
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-8 text-sm font-medium transition hover:bg-foreground/5"
              >
                Ver enfoque
              </a>
              <a
                href={INSTAGRAM_AGENCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-8 text-sm font-medium transition hover:bg-foreground/5"
              >
                Ver la agencia en Instagram
              </a>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          className="border-t border-black/5 bg-surface px-6 py-20 dark:border-white/10"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Cómo sumamos desde marketing y comunicación
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-foreground/70">
              En{" "}
              <a
                href={INSTAGRAM_AGENCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              >
                Agencia Fórmula
              </a>{" "}
              trabajamos comunicación integral; yo me enfoco en la gestión de comunidad y el ritmo diario en redes.
            </p>
            <ul className="mt-14 grid gap-6 sm:grid-cols-2">
              {services.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-background p-6 shadow-sm dark:border-white/10"
                >
                  <h3 className="font-semibold text-accent">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contacto"
          className="mx-auto max-w-2xl px-6 py-20 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight">¿Arrancamos?</h2>
          <p className="mt-3 text-foreground/70">
            Contame en qué etapa está tu marca y qué canales querés potenciar. También podés conocer el trabajo de
            la agencia en Instagram.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href="mailto:hola@ejemplo.com"
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white dark:text-[#0f0e0c] sm:w-auto"
            >
              Escribime por mail
            </a>
            <a
              href="https://wa.me/"
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium hover:bg-foreground/5 sm:w-auto"
            >
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium hover:bg-foreground/5 sm:w-auto"
            >
              @formula.agencia
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-8 text-center text-sm text-foreground/50 dark:border-white/10">
        <p>
          © {new Date().getFullYear()} Juampi · Community Manager ·{" "}
          <a
            href={INSTAGRAM_AGENCIA}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 underline-offset-4 transition hover:text-accent hover:underline"
          >
            Agencia Fórmula
          </a>
        </p>
      </footer>
    </div>
  );
}
