import { ThemeToggle } from "../components/theme-toggle";

const INSTAGRAM_AGENCIA =
  "https://www.instagram.com/formula.agencia/";
const INSTAGRAM_JUAMPI = "https://www.instagram.com/juampicrav/";
const EMAIL = "juanpablocraveromkt@gmail.com";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Intendente+Tarigo+B1727+Roque+P%C3%A9rez+Buenos+Aires+Argentina";

const services = [
  {
    title: "Campañas en Meta Ads",
    body: "Publicidad en Facebook e Instagram: segmentación, creatividades y optimización para que tu inversión rinda.",
  },
  {
    title: "Creación de contenido",
    body: "Piezas y formatos alineados a tu marca: copy, reels, estáticos y adaptaciones para cada red.",
  },
  {
    title: "Redes sociales",
    body: "Planificación, publicación y conversación con tu comunidad para una presencia constante y profesional.",
  },
  {
    title: "Marketing digital estratégico",
    body: "Decisiones con criterio: qué decir, a quién y en qué momento, conectando comunicación y objetivos de negocio.",
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
            <a
              href={INSTAGRAM_JUAMPI}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 block text-xs text-foreground/45 transition hover:text-accent"
            >
              @juampicrav
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href="#sobre"
              className="hidden text-xs font-medium text-foreground/60 transition hover:text-accent sm:inline"
            >
              Sobre mí
            </a>
            <a
              href={INSTAGRAM_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-foreground/15 px-3 py-2 text-xs font-medium transition hover:bg-foreground/5 sm:inline-flex"
            >
              @formula.agencia
            </a>
            <a
              href={INSTAGRAM_JUAMPI}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-foreground/15 px-3 py-2 text-xs font-medium transition hover:bg-foreground/5 sm:inline-flex"
            >
              @juampicrav
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
              Potenciamos tu negocio con marketing digital estratégico
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/75">
              Soy{" "}
              <strong className="font-semibold text-foreground">Juan Pablo Cravero</strong>{" "}
              (Juampi), licenciado en Comunicación enfocado en marketing. Trabajo en{" "}
              <a
                href={INSTAGRAM_AGENCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
              >
                Agencia Fórmula
              </a>{" "}
              con foco en community management, contenido y la operación diaria de tus redes.
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
                Servicios
              </a>
              <a
                href={INSTAGRAM_AGENCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-8 text-sm font-medium transition hover:bg-foreground/5"
              >
                @formula.agencia
              </a>
              <a
                href={INSTAGRAM_JUAMPI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-8 text-sm font-medium transition hover:bg-foreground/5"
              >
                @juampicrav
              </a>
            </div>
          </div>
        </section>

        <section
          id="sobre"
          className="border-t border-black/5 px-6 py-16 dark:border-white/10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Sobre mí</h2>
            <p className="mt-4 text-pretty leading-relaxed text-foreground/75">
              Me formé como <strong className="text-foreground">licenciado en Comunicación</strong> con
              orientación al <strong className="text-foreground">marketing</strong>: combino criterio de
              mensaje, conocimiento de audiencias y trabajo cotidiano en redes para que tu marca crezca con
              claridad y constancia.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
              Atención y consultas por WhatsApp e Instagram{" "}
              <span className="font-medium text-foreground">las 24 horas</span>, como figura en nuestro perfil
              de negocio. También podés ver mi día a día en{" "}
              <a
                href={INSTAGRAM_JUAMPI}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              >
                @juampicrav
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="servicios"
          className="border-t border-black/5 bg-surface px-6 py-20 dark:border-white/10"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Qué hacemos en Agencia Fórmula
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-foreground/70">
              Estos son los pilares que compartimos en{" "}
              <a
                href={INSTAGRAM_AGENCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              >
                @formula.agencia
              </a>
              ; vos me tenés a Juampi para el día a día de comunidad, contenido y coordinación en redes.
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
            Escribime por el canal que prefieras. Si estás cerca de Roque Pérez, también podés ubicarnos en el
            mapa.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-white break-all dark:text-[#0f0e0c] sm:w-auto sm:break-normal sm:px-6"
            >
              {EMAIL}
            </a>
            <a
              href="https://wa.me/5492227506533"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium hover:bg-foreground/5 sm:w-auto"
            >
              WhatsApp (+54 9 2227 50-6533)
            </a>
            <a
              href={INSTAGRAM_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium hover:bg-foreground/5 sm:w-auto"
            >
              Agencia · @formula.agencia
            </a>
            <a
              href={INSTAGRAM_JUAMPI}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium hover:bg-foreground/5 sm:w-auto"
            >
              Juampi · @juampicrav
            </a>
          </div>
          <div className="mt-12 rounded-2xl border border-black/5 bg-surface p-6 text-left text-sm dark:border-white/10">
            <h3 className="font-semibold text-foreground">Ubicación</h3>
            <address className="mt-2 not-italic leading-relaxed text-foreground/75">
              Intendente Tarigo, B1727 Roque Pérez, Provincia de Buenos Aires, Argentina.
            </address>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex font-medium text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
            >
              Ver en Google Maps
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-6 py-8 text-center text-sm text-foreground/50 dark:border-white/10">
        <p>
          © {new Date().getFullYear()} Juan Pablo Cravero (Juampi) ·{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-foreground/60 underline-offset-4 transition hover:text-accent hover:underline"
          >
            {EMAIL}
          </a>
          {" · "}
          <a
            href={INSTAGRAM_JUAMPI}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 underline-offset-4 transition hover:text-accent hover:underline"
          >
            @juampicrav
          </a>
          {" · "}
          <a
            href={INSTAGRAM_AGENCIA}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 underline-offset-4 transition hover:text-accent hover:underline"
          >
            @formula.agencia
          </a>
        </p>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-foreground/45">
          Intendente Tarigo, B1727 Roque Pérez, Provincia de Buenos Aires, Argentina.
        </p>
      </footer>
    </div>
  );
}
