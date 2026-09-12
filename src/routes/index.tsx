import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Shield, Sparkles, Star, Timer, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Super Lovable — Usa Lovable sin gastar créditos" },
      {
        name: "description",
        content: "Super Lovable sin límites por R$ 19,90. Sigue creando en Lovable sin depender de créditos.",
      },
      { property: "og:title", content: "Super Lovable — Crea sin límites en Lovable" },
      {
        property: "og:description",
        content: "Congela el consumo de créditos y sigue creando de principio a fin. Extensión premium para Chrome.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const CYCLE = 13 * 60;

function useCountdown() {
  const [leftMs, setLeftMs] = useState(CYCLE * 1000);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const tick = () => {
      const now = Date.now();
      const elapsed = now - (startedAt.current ?? now);
      const remaining = Math.max(0, CYCLE * 1000 - (elapsed % (CYCLE * 1000)));
      setLeftMs(remaining);
    };
    tick();
    const id = window.setInterval(tick, 10);
    return () => window.clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(leftMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((leftMs % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
}

function Countdown() {
  const formatted = useCountdown();
  return (
    <span className="inline-flex animate-pulse-gentle items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-[14px] font-black tabular-nums text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] ring-2 ring-white/30">
      <Timer className="h-4 w-4" />
      {formatted}
    </span>
  );
}

function useClientDate() {
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("es-419", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);
  return date;
}

function Header() {
  const date = useClientDate();
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#FF2DBB] shadow-[0_10px_40px_-12px_rgba(255,45,187,0.55)]">
        <div className="mx-auto flex min-h-[4rem] max-w-7xl items-center justify-center gap-4 px-4 py-3 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-black text-white sm:text-[15px]">Super Lovable sin límites por R$ 19,90</p>
              <span className="text-[13px] font-bold text-white/90 sm:text-[15px]">🔥 Solo hoy {date ? `(${date})` : "(...)"}</span>
            </div>
            <Countdown />
          </div>
        </div>
      </div>
    </header>
  );
}

const heroBullets = [
  "Trabaja sin interrupciones",
  "Se instala en menos de un minuto",
  "Interfaz extremadamente simple",
  "Sigue usando Lovable normalmente",
];

const heroSeals = [
  "Funciona con Lovable gratis",
  "Se instala en menos de 1 minuto",
  "Más de 14.782 usuarios",
];

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.23_350/0.16),transparent_65%)] blur-2xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-3.5 py-1.5 text-[11.5px] font-black uppercase tracking-[0.05em] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              🛡️ ¡Método blindado! La única extensión que sigue funcionando sin fallar
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Nunca vuelvas a quedarte sin <span className="text-gradient">créditos</span> en Lovable.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              Nunca más interrumpas un proyecto porque se acabaron tus créditos. Sigue creando normalmente de principio a fin.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {heroBullets.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-foreground/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9">
              <CtaButton href="#planos" size="lg">
                EMPEZAR AHORA <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {heroSeals.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[12.5px] font-medium text-foreground/80">
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={440}>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" /> 7 días de garantía • Todo sin límites por R$ 19,90
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="glass-strong relative rounded-[2rem] p-3 shadow-glow">
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-black shadow-2xl">
              <img
                src="https://i.ibb.co/KxVQh8WP/8bf4f36f-a7c5-49c9-9700-b2acd2401941.png"
                alt="Super Lovable ilimitada"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const comparisonSteps = [
  { number: "01", title: "Instala", text: "Agrega la extensión a Chrome en pocos segundos." },
  { number: "02", title: "Activa", text: "Usa tu licencia y deja Super Lovable lista." },
  { number: "03", title: "Empieza a usarla", text: "Vuelve a tus proyectos sin interrupciones ni límites." },
];

function ComparisonSection() {
  return (
    <Section
      id="comparacion"
      eyebrow="Antes y después"
      title="De proyectos interrumpidos a Lovable sin límites."
      subtitle="Mira la diferencia entre depender de los créditos y crear con Super Lovable activa."
      className="overflow-hidden"
    >
      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="glass-strong relative h-full overflow-hidden rounded-[2rem] border-red-500/25 p-3">
            <div className="mb-3 flex items-center justify-between px-2 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-red-300">
                <X className="h-3.5 w-3.5" strokeWidth={3} /> Sin extensión
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-300/70">Antes</span>
            </div>
            <img
              src={"/creditos-esgotados.webp"}
              alt="Usuario preocupado después de quedarse sin créditos en Lovable"
              className="h-auto w-full rounded-[1.45rem] object-contain"
              loading="lazy"
            />
            <div className="space-y-2 px-2 pb-3 pt-5">
              {["Proyectos interrumpidos a mitad del trabajo", "Horas esperando a que regresen los créditos", "Ideas detenidas antes de estar listas"].map((item) => (
                <p key={item} className="flex items-start gap-2 text-[13px] text-foreground/80 sm:text-sm">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={3} /> {item}
                </p>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <article className="relative h-full overflow-hidden rounded-[2rem] border border-emerald-400/35 bg-[linear-gradient(145deg,rgba(16,185,129,0.10),oklch(0.18_0.04_265/0.94))] p-3">
            <div className="mb-3 flex items-center justify-between px-2 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-300">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> Con extensión
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/70">Después</span>
            </div>
            <img
              src={"/comparacao-com-extensao.webp"}
              alt="Super Lovable activa en un navegador con un usuario feliz celebrando"
              className="h-auto w-full rounded-[1.45rem] object-cover"
              loading="lazy"
            />
            <div className="px-2 pb-3 pt-5">
              <h3 className="text-xl font-black leading-tight sm:text-2xl">Usa Lovable sin interrupciones ni límites en solo un minuto.</h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                {comparisonSteps.map((step) => (
                  <div key={step.number} className="rounded-xl border border-emerald-400/15 bg-emerald-500/[0.07] p-3">
                    <span className="text-[10px] font-black tracking-[0.16em] text-emerald-300">{step.number}</span>
                    <p className="mt-1 text-[13px] font-bold text-foreground">{step.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

const testimonials = [
  { content: "Ya había comprado tres extensiones que dejaban de funcionar después de pocos días. Super Lovable fue la primera que realmente se mantuvo estable. Hoy la uso prácticamente todo el día sin interrupciones.", author: "Rafael M.", role: "Afiliado y Gestor de Tráfico", metric: "+180 proyectos", image: "/rafael.png" },
  { content: "Antes perdía horas esperando a que regresaran los créditos. Ahora puedo desarrollar una landing page completa y todavía terminar mi aplicación el mismo día.", author: "Juliana S.", role: "Infoproductora", metric: "10 h ahorradas/semana", image: "/juliana-s.png" },
  { content: "No soy programador. La instalé, la activé y en pocos minutos ya la estaba usando normalmente. Mucho más simple de lo que imaginaba.", author: "Carlos R.", role: "Emprendedor Digital", metric: "1.er proyecto en 15 min", image: "/carlos-r.png" },
  { content: "Solo lo que ahorré al dejar de pagar otras herramientas ya compensó la inversión. Valió cada centavo.", author: "Marina A.", role: "Dueña de E-commerce", metric: "+R$ 2.300 ahorrados", image: "/marina-a.png" },
  { content: "Ahora puedo mantener varios proyectos abiertos al mismo tiempo sin preocuparme por gastar créditos. Mi productividad se multiplicó.", author: "Eduardo P.", role: "Freelancer", metric: "Mucho más productividad", image: "/eduardo-p.png" },
  { content: "La cola automática y el optimizador de prompts cambiaron por completo mi flujo de trabajo. Ya no necesito estar pegada a la pantalla y el resultado de los proyectos es mucho mejor.", author: "Fernanda L.", role: "Diseñadora y Creadora de Apps", metric: "+40 prompts/día", image: "/fernanda-l.png" },
];

function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <Section id="testimonios" className="overflow-hidden px-0 sm:px-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            <span className="flex gap-0.5 text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}</span>
            Más de 14.000 usuarios
          </span>
        </Reveal>
        <Reveal delay={80}><h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Quienes la usan, la recomiendan.</h2></Reveal>
        <Reveal delay={160}><p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">Miles de creadores, afiliados, infoproductores y emprendedores digitales ya usan Super Lovable a diario para desarrollar sin interrupciones.</p></Reveal>
      </div>

      <div className="relative left-1/2 mt-16 w-screen max-w-none -translate-x-1/2 overflow-hidden py-10" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className={cn("flex w-max gap-6 animate-infinite-scroll", isPaused && "pause-animation")}>
          {extendedTestimonials.map((item, index) => (
            <article key={index} className="glass-strong relative flex w-[320px] flex-col rounded-[2rem] p-6 shadow-glow-sm sm:w-[400px]">
              <div className="flex gap-0.5 text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/90">“{item.content}”</p>
              <div className="mt-8 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={`Foto de ${item.author}`} className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10" loading="lazy" />
                  <div><h4 className="text-[14px] font-semibold leading-none">{item.author}</h4><p className="mt-1 text-[12px] text-muted-foreground">{item.role}</p></div>
                </div>
                <div className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary ring-1 ring-primary/20">{item.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl justify-center px-5">
        <div className="glass-strong flex w-fit flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full px-8 py-4 text-center text-[13px] font-medium text-muted-foreground sm:text-[14px]">
          <span>⭐ 4,9/5</span><span>+14.000 usuarios</span><span>+320 reseñas</span><span className="text-primary">+97% la recomiendan</span>
        </div>
      </div>
    </Section>
  );
}

const plans = [
  {
    name: "Acceso por 30 días",
    checkout: "https://app.ensinaflix.com/c/qzygzw1",
    price: "R$ 19,90",
    period: "30 días",
    desc: "Usa todos los recursos de Super Lovable durante 30 días, con un único pago y sin renovación automática.",
    perks: ["Acceso completo por 30 días", "Todas las funciones habilitadas", "Actualizaciones incluidas durante el período", "Cola automática y prompts optimizados", "Instalación simple en pocos minutos", "Funciona con cuentas gratuitas", "Sin renovación automática"],
    badge: "30 días",
    professional: false,
  },
  {
    name: "Acceso de por vida",
    checkout: "https://app.ensinaflix.com/c/xy3nvpg",
    price: "R$ 49,90",
    period: "pago único",
    desc: "Paga una sola vez y usa Super Lovable sin fecha de vencimiento ni mensualidades.",
    perks: ["Acceso de por vida a Super Lovable", "Todas las funciones habilitadas", "Actualizaciones futuras incluidas", "Cola automática y prompts optimizados", "Instalación simple en pocos minutos", "Funciona con cuentas gratuitas", "Sin mensualidades ni renovaciones"],
    badge: "Mejor opción",
    professional: true,
  },
];

function PricingSection() {
  return (
    <Section id="planos" eyebrow="Elige tu opción" title="Elige el acceso ideal para ti." subtitle="30 días por R$ 19,90 o acceso de por vida por R$ 49,90. Sin renovación automática." className="isolate overflow-hidden">
      <div className="mx-auto grid max-w-5xl items-stretch gap-5 lg:grid-cols-2">
        {plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 100} className="h-full">
            <article className={cn("relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7", plan.professional ? "border-orange-400/55 bg-[linear-gradient(145deg,rgba(249,115,22,0.17),oklch(0.18_0.04_265/0.97))] shadow-[0_25px_90px_-42px_rgba(249,115,22,0.9)]" : "border-primary/40 bg-[linear-gradient(145deg,oklch(0.7_0.23_350/0.14),oklch(0.18_0.04_265/0.96))] shadow-glow") }>
              {plan.professional && <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white">Más completa</div>}
              <span className={cn("mt-2 inline-flex w-fit rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]", plan.professional ? "bg-orange-500/15 text-orange-300" : "bg-primary/15 text-primary")}>{plan.badge}</span>
              <h3 className="mt-5 pr-24 text-2xl font-black leading-tight sm:text-3xl">{plan.name}</h3>
              <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-muted-foreground">{plan.desc}</p>
              <div className="mt-6 flex items-end gap-2"><span className={cn("text-4xl font-black tracking-tight sm:text-5xl", plan.professional && "text-orange-400")}>{plan.price}</span><span className="pb-1 text-xs text-muted-foreground">/ {plan.period}</span></div>
              <ul className="mt-7 flex-1 space-y-3">
                {plan.perks.map((perk) => <li key={perk} className="flex items-start gap-2.5 text-[13.5px] text-foreground/90"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15"><Check className="h-3 w-3 text-primary" strokeWidth={3} /></span>{perk}</li>)}
              </ul>
              {plan.professional && <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/[0.08] p-4"><p className="text-[12.5px] font-semibold leading-relaxed text-orange-100/90">Un único pago para usarla sin fecha de vencimiento, con todas las actualizaciones futuras incluidas y sin mensualidades.</p></div>}
              <a href={plan.checkout} target="_blank" rel="noopener noreferrer" className={cn("mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5", plan.professional ? "bg-orange-500 text-white" : "bg-brand text-primary-foreground")}>Quiero esta opción <ArrowRight className="h-4 w-4" /></a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function GuaranteeSection() {
  return (
    <Section>
      <Reveal>
        <div className="glass-strong mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[2rem] bg-[linear-gradient(140deg,oklch(0.7_0.23_350/0.10),oklch(0.62_0.22_300/0.10))] px-6 py-12 text-center">
          <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-[6px] border-double border-amber-400/80 bg-[conic-gradient(from_0deg,oklch(0.85_0.15_80),oklch(0.6_0.12_70),oklch(0.9_0.18_90),oklch(0.6_0.12_70),oklch(0.85_0.15_80))] text-amber-950 shadow-xl">
            <div className="text-[9px] font-black uppercase tracking-[0.2em]">100% SATISFACCIÓN</div>
            <div className="text-[42px] font-black leading-none">7</div>
            <div className="text-[12px] font-black uppercase tracking-[0.25em]">DÍAS</div>
            <div className="mt-2 bg-amber-900 px-3 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-amber-100">O TE DEVOLVEMOS TU DINERO</div>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pruébala sin riesgo.</h2>
          <p className="max-w-xl text-pretty text-base text-muted-foreground">Tienes siete días para solicitar la cancelación si no quedas satisfecho. Te devolvemos el 100% de lo pagado. Sin burocracia. Sin preguntas.</p>
        </div>
      </Reveal>
    </Section>
  );
}

const faqs = [
  ["¿Funciona con la versión gratuita de Lovable?", "Sí. La extensión funciona con cualquier cuenta de Lovable, incluida la versión gratuita. No necesitas contratar ningún otro plan para usarla."],
  ["¿Necesito saber programación?", "No. Super Lovable fue creada para cualquier persona. La instalas, la activas y la usas."],
  ["¿Funciona con cualquier cuenta?", "Sí. Funciona normalmente con tu cuenta actual de Lovable, sin cambiar nada."],
  ["¿Cómo recibo mi licencia?", "Por correo electrónico, justo después de la confirmación del pago."],
  ["¿Cuánto tarda?", "Menos de un minuto entre instalarla, activarla y volver a crear."],
  ["¿Puedo cambiar de computadora?", "Sí. Solo tienes que instalar la extensión y activar tu licencia en el nuevo dispositivo."],
  ["¿Voy a necesitar comprar créditos?", "No. La idea es justamente que puedas producir sin depender de la barra de créditos."],
  ["¿Recibo actualizaciones?", "Sí. Las actualizaciones son automáticas y están incluidas en tu plan."],
  ["¿Es seguro?", "Sí. La extensión funciona en tu navegador y no modifica nada de tu cuenta."],
  ["¿Tiene garantía?", "Sí. Tienes siete días de garantía total. Si no te gusta, te devolvemos el 100% del valor."],
];

function FaqSection() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Preguntas frecuentes.">
      <Reveal>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqs.map(([question, answer]) => (
            <AccordionItem key={question} value={question} className="glass mb-3 rounded-2xl border px-5 transition-colors hover:border-primary/25">
              <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline">{question}</AccordionTrigger>
              <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

function FinalCta() {
  return (
    <section id="cta-final" className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.23_350/0.16),transparent_65%)]" />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">El próximo proyecto que abandones por falta de créditos podría ser justamente el que <span className="text-gradient">cambie tu negocio</span>.</h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">No vuelvas a detener tus ideas a mitad de camino. Instala Super Lovable y sigue creando de principio a fin, sin depender de créditos.</p>
        <CtaButton href="#planos" size="lg" className="mt-9">QUIERO CREAR SIN LÍMITES <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></CtaButton>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#topo" className="flex items-center gap-2.5"><span className="bg-brand flex h-9 w-9 items-center justify-center rounded-xl"><Sparkles className="h-4.5 w-4.5 text-primary-foreground" /></span><span className="text-[15px] font-semibold tracking-tight">Super <span className="text-gradient">Lovable</span></span></a>
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">{["Términos de uso", "Política de privacidad", "Contacto"].map((item) => <a key={item} href="#topo" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">{item}</a>)}</nav>
        <p className="text-[12.5px] text-muted-foreground">© {new Date().getFullYear()} Super Lovable. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
