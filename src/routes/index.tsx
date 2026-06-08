import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Watch Schedule — Fair yacht watch schedules in minutes" },
      {
        name: "description",
        content:
          "Specialist superyacht watch rota generator. Snap your crew list, choose Solo, Dual or Triple Watch, and export a fair, professional schedule.",
      },
      { property: "og:title", content: "Watch Schedule — Fair yacht watch schedules in minutes" },
      {
        property: "og:description",
        content:
          "Specialist superyacht watch rota generator built for captains, officers and superyacht teams.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- tiny line icons ---------- */
const Icon = ({ d, className = "" }: { d: string; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={`h-5 w-5 ${className}`}
  >
    <path d={d} />
  </svg>
);

const I = {
  camera: "M3 7h4l2-2h6l2 2h4v12H3zM12 17a4 4 0 100-8 4 4 0 000 8z",
  scale: "M12 4v16M4 8h16M6 8l-2 6h4zM18 8l-2 6h4z",
  pause: "M9 5v14M15 5v14",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  pdf: "M6 3h9l4 4v14H6zM15 3v4h4M9 13h2a1 1 0 100-2H9v6",
  refresh: "M4 10a8 8 0 0114-5l2-2v6h-6l3-3M20 14a8 8 0 01-14 5l-2 2v-6h6l-3 3",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 016 0v3",
  users: "M3 20c0-3 3-5 6-5s6 2 6 5M21 20c0-2-1.5-3.5-4-4M9 11a4 4 0 100-8 4 4 0 000 8zM17 10a3 3 0 100-6",
  check: "M5 12l5 5L20 6",
  cross: "M6 6l12 12M18 6L6 18",
  dash: "M6 12h12",
  arrow: "M5 12h14M13 6l6 6-6 6",
  anchor: "M12 7v14M8 11h8M12 3a2 2 0 100 4 2 2 0 000-4zM4 16a8 8 0 0016 0",
};

/* ---------- nav ---------- */
const NAV = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center border border-foreground">
            <Icon d={I.anchor} className="h-3.5 w-3.5" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Watch Schedule</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="#cta"
            className="inline-flex h-9 items-center bg-foreground px-4 text-[13px] font-medium text-background hover:bg-foreground/90"
          >
            Get Early Access
          </a>
        </div>
        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon d={open ? I.cross : "M4 7h16M4 12h16M4 17h16"} />
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col px-5 py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center bg-foreground text-[13px] font-medium text-background"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- hero mockup ---------- */
function DashboardMockup() {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const rows = [
    { dept: "Deck", crew: ["A. Hale", "B. Otis", "C. Ward", "A. Hale", "D. Reno", "B. Otis", "C. Ward"] },
    { dept: "Interior", crew: ["S. Lim", "J. Park", "S. Lim", "M. Cruz", "J. Park", "M. Cruz", "S. Lim"] },
    { dept: "Engineering", crew: ["E. Vogt", "F. Marek", "E. Vogt", "F. Marek", "E. Vogt", "F. Marek", "E. Vogt"] },
  ];
  return (
    <div className="hairline bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">
            watchschedule.com / M/Y Example
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">Week 14 · 2026</span>
      </div>

      {/* meta strip */}
      <div className="grid grid-cols-2 border-b border-border md:grid-cols-4">
        {[
          ["Vessel", "M/Y Example"],
          ["Watch Mode", "Triple Watch"],
          ["Fairness Score", "92%"],
          ["Charter Mode", "Paused · Mon"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`px-4 py-3 ${i < 3 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border md:border-b-0" : ""}`}
          >
            <div className="eyebrow">{k}</div>
            <div className="mt-1 text-sm font-medium">{v}</div>
          </div>
        ))}
      </div>

      {/* calendar */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="w-32 px-4 py-2 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Department
              </th>
              {days.map((d, i) => (
                <th
                  key={d}
                  className={`px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wider ${
                    i >= 5 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.dept} className="border-b border-border last:border-0">
                <td className="px-4 py-3 align-top">
                  <div className="text-[13px] font-medium">{r.dept}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">3 watchkeepers</div>
                </td>
                {r.crew.map((c, i) => (
                  <td key={i} className="px-3 py-3 align-top">
                    <div
                      className={`hairline px-2 py-1.5 text-[12px] ${
                        i >= 5 ? "bg-foreground text-background border-foreground" : "bg-background"
                      }`}
                    >
                      {c}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 border border-foreground" /> Day watch
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 bg-foreground" /> Weekend
          </span>
        </div>
        <div className="flex gap-2">
          <button className="hairline px-3 py-1.5 text-[12px] font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Icon d={I.refresh} className="h-3.5 w-3.5" /> Regenerate
            </span>
          </button>
          <button className="bg-foreground px-3 py-1.5 text-[12px] font-medium text-background">
            <span className="inline-flex items-center gap-1.5">
              <Icon d={I.pdf} className="h-3.5 w-3.5" /> Export PDF
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 grid-paper opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-px w-6 bg-foreground" />
              Watch rota software for superyachts
            </div>
            <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[64px]">
              Fair yacht watch
              <br />
              schedules in minutes.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              Snap your crew list, choose Solo, Dual, or Triple Watch, and generate a professional
              rota that balances leave, weekends, charter pauses, and crew fairness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="inline-flex h-12 items-center bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Get Early Access
                <Icon d={I.arrow} className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#pricing"
                className="hairline inline-flex h-12 items-center px-6 text-sm font-medium hover:bg-muted"
              >
                View Pricing
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Built for captains, officers & superyacht teams managing fair watch rotations.
            </p>
          </div>
          <div className="lg:col-span-6">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- section wrapper ---------- */
function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  muted = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`border-b border-border ${muted ? "bg-muted/40" : "bg-background"}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-[44px]">{title}</h2>
          {intro && <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">{intro}</p>}
        </div>
        {children && <div className="mt-12 lg:mt-16">{children}</div>}
      </div>
    </section>
  );
}

/* ---------- problem ---------- */
function Problem() {
  const cards = [
    "Spreadsheets get messy",
    "Crew availability changes",
    "Weekend watches become unfair",
    "Charter periods break the rotation",
    "PDF exports take extra admin",
    "Schedule changes are hard to explain",
  ];
  return (
    <Section
      id="product"
      eyebrow="The problem"
      title="Watch rotas should not be built from guesswork."
      intro="Manual watch schedules break quickly. Crew go on leave. Charters interrupt the rotation. Weekend duties become uneven. Bad watches repeat. Then the captain is left rebuilding the rota manually."
      muted
    >
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <div key={c} className="flex items-start gap-4 bg-background p-6">
            <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[15px] font-medium">{c}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- solution flow ---------- */
function Solution() {
  const steps = [
    "Snap crew list",
    "Confirm departments",
    "Select watch type",
    "Generate rota",
    "Pause for charter",
    "Export to PDF",
  ];
  return (
    <Section
      eyebrow="The solution"
      title="One focused system for building fair watch schedules."
      intro="Watch Schedule is not a full yacht management suite. It is a specialist rota tool built for the specific problem of creating, adjusting, and exporting fair yacht watch schedules."
    >
      <div className="hairline">
        <div className="grid divide-y divide-border md:grid-cols-6 md:divide-x md:divide-y-0">
          {steps.map((s, i) => (
            <div key={s} className="flex items-start gap-3 p-5">
              <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
              <p className="text-[13px] font-medium leading-snug">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- watch modes ---------- */
function WatchModes() {
  const cards = [
    {
      title: "Solo Watch",
      desc: "For vessels with one daily watchkeeper or simple port, anchor, or night watch coverage.",
      best: "30m–50m yachts",
      items: ["One watch rota", "Leave management", "Charter mode", "PDF export", "Fairness balancing"],
    },
    {
      title: "Dual Watch",
      desc: "For yachts running two simultaneous schedules, such as Watchkeeper + OOW, or day/night rotations.",
      best: "50m–65m yachts",
      items: [
        "Two simultaneous schedules",
        "Leave management",
        "Fairness balancing",
        "Schedule optimisation",
      ],
    },
    {
      title: "Triple Watch",
      desc: "For larger yachts operating separate Deck/OOW, Interior, and Engineering watch systems.",
      best: "60m–120m+ yachts",
      items: [
        "Three independent watch systems",
        "Department-specific rules",
        "Leave management",
        "Charter mode",
        "Advanced reporting",
      ],
    },
  ];
  return (
    <Section
      eyebrow="Watch modes"
      title="Choose the watch structure your vessel actually runs."
      muted
    >
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <div key={c.title} className="hairline flex flex-col bg-background p-7">
            <div className="font-mono text-[11px] text-muted-foreground">0{i + 1} / 03</div>
            <h3 className="mt-3 text-2xl">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            <div className="mt-5 border-t border-border pt-4">
              <div className="eyebrow">Best for</div>
              <div className="mt-1 text-sm font-medium">{c.best}</div>
            </div>
            <ul className="mt-5 space-y-2.5">
              {c.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[13px]">
                  <Icon d={I.check} className="mt-0.5 h-4 w-4 shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- features ---------- */
function Features() {
  const cards = [
    { icon: I.camera, title: "Crew List Photo Import", copy: "Upload or snap the crew list. Watch Schedule extracts names and positions, then suggests departments for captain approval." },
    { icon: I.scale, title: "Fairness Engine", copy: "Balance night watches, weekend watches, total watch count, and repeated duty patterns." },
    { icon: I.pause, title: "Charter Mode", copy: "Pause the normal rota while on charter, then resume from the correct next crew member when the charter ends." },
    { icon: I.users, title: "Leave Management", copy: "Toggle crew on or off, enter leave dates, and regenerate only the affected schedule." },
    { icon: I.calendar, title: "Calendar View", copy: "See the full rota by day, week, month, department, or watch mode." },
    { icon: I.pdf, title: "PDF Export", copy: "Export clean bridge, crew mess, or department-specific watch schedules." },
    { icon: I.refresh, title: "Regenerate & Confirm", copy: "When something changes, preview the new rota before confirming it." },
    { icon: I.lock, title: "Secure Vessel Data", copy: "Keep vessel, crew, and schedule data private with secure account access and role-based permissions." },
  ];
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Built around the real problems captains deal with."
    >
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className="bg-background p-6">
            <Icon d={c.icon} />
            <h3 className="mt-5 text-[15px] font-semibold">{c.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- charter mode ---------- */
function Charter() {
  return (
    <Section
      eyebrow="Charter mode"
      title="Pause the rota when charter starts. Resume it properly when charter ends."
      intro="Normal watch rotations often stop making sense during charter. Watch Schedule freezes the rotation during charter mode and resumes from the correct point afterwards, so crew are not skipped, punished, or overloaded."
      muted
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: "Before charter", body: "Alex → Ben → Chris → Daniel", tag: "Rotation active" },
          { label: "Charter mode", body: "Paused", tag: "Frozen", invert: true },
          { label: "After charter", body: "Resumes with Chris", tag: "Continues fairly" },
        ].map((b) => (
          <div
            key={b.label}
            className={`hairline p-7 ${b.invert ? "bg-foreground text-background border-foreground" : "bg-background"}`}
          >
            <div className={`eyebrow ${b.invert ? "text-background/60" : ""}`}>{b.label}</div>
            <div className="mt-4 font-mono text-[15px]">{b.body}</div>
            <div className={`mt-6 inline-flex items-center gap-2 border px-2 py-1 text-[11px] uppercase tracking-wider ${b.invert ? "border-background/40" : "border-border"}`}>
              <span className={`h-1.5 w-1.5 ${b.invert ? "bg-background" : "bg-foreground"}`} />
              {b.tag}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <a href="#cta" className="inline-flex h-11 items-center bg-foreground px-5 text-sm font-medium text-background">
          Build a fair rota <Icon d={I.arrow} className="ml-2 h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}

/* ---------- fairness engine ---------- */
function Fairness() {
  const stats = [
    { k: "Total watch balance", v: "94%" },
    { k: "Weekend fairness", v: "89%" },
    { k: "Night watch balance", v: "91%" },
    { k: "Consecutive-day risk", v: "Low" },
  ];
  return (
    <Section
      eyebrow="Fairness engine"
      title="Make the schedule fair — and easy to defend."
      intro="The fairness engine checks the rota before it goes live. It helps balance total watches, weekend duties, night watches, and repeated assignments across the crew."
    >
      <div className="hairline grid grid-cols-2 divide-border bg-background md:grid-cols-4 md:divide-x">
        {stats.map((s, i) => (
          <div
            key={s.k}
            className={`p-7 ${i < 2 ? "border-b border-border md:border-b-0" : ""} ${i === 1 ? "border-l border-border md:border-l-0" : ""} ${i === 3 ? "border-l border-border md:border-l-0" : ""}`}
          >
            <div className="font-mono text-[11px] text-muted-foreground">{s.k}</div>
            <div className="mt-3 text-4xl font-semibold tracking-tight">{s.v}</div>
            <div className="mt-4 h-px w-full bg-border">
              <div
                className="h-px bg-foreground"
                style={{ width: typeof s.v === "string" && s.v.includes("%") ? s.v : "30%" }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">The captain always has final approval.</p>
    </Section>
  );
}

/* ---------- pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Solo Watch",
      price: "£29",
      desc: "For yachts with a single daily watchkeeper.",
      features: ["One watch rota", "Leave management", "Charter mode", "PDF export", "Fairness balancing"],
      vessels: "30m–50m",
      cta: "Start Solo Watch",
    },
    {
      name: "Dual Watch",
      price: "£59",
      desc: "For yachts running Watchkeeper + OOW, or Day/Night rotations.",
      features: ["Two simultaneous schedules", "Leave management", "Fairness balancing", "Schedule optimisation"],
      vessels: "50m–65m",
      cta: "Start Dual Watch",
      popular: true,
    },
    {
      name: "Triple Watch",
      price: "£99",
      desc: "For yachts operating Deck/OOW, Interior, and Engineering watch systems.",
      features: ["Three independent watch systems", "Department-specific rules", "Leave management", "Charter mode", "Advanced reporting"],
      vessels: "60m–120m+",
      cta: "Start Triple Watch",
    },
  ];
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Simple pricing by watch complexity."
      muted
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col p-8 ${p.popular ? "border-2 border-foreground bg-background" : "hairline bg-background"}`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-8 bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                Most popular
              </div>
            )}
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-5xl font-semibold tracking-tight">{p.price}</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Typical vessels · {p.vessels}
            </div>
            <ul className="mt-7 space-y-3 border-t border-border pt-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px]">
                  <Icon d={I.check} className="mt-0.5 h-4 w-4 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={`mt-8 inline-flex h-11 items-center justify-center text-sm font-medium ${
                p.popular
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "hairline hover:bg-muted"
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Need a fleet or management-company setup?{" "}
        <a href="#cta" className="text-foreground underline-offset-4 hover:underline">
          Contact us for custom vessel pricing.
        </a>
      </p>
    </Section>
  );
}

/* ---------- comparison ---------- */
function Comparison() {
  const rows: Array<[string, boolean | "partial", boolean | "partial", boolean | "partial"]> = [
    ["Purpose-built watch rota generation", true, false, "partial"],
    ["Crew list photo import", true, false, false],
    ["Solo / Dual / Triple watch modes", true, false, "partial"],
    ["Charter pause and resume", true, false, false],
    ["Fairness engine", true, false, false],
    ["Simple PDF export", true, "partial", "partial"],
    ["Lightweight setup", true, true, false],
    ["Full yacht management suite", false, false, true],
  ];
  const Cell = ({ v }: { v: boolean | "partial" }) =>
    v === true ? (
      <Icon d={I.check} className="mx-auto h-4 w-4" />
    ) : v === "partial" ? (
      <Icon d={I.dash} className="mx-auto h-4 w-4 text-muted-foreground" />
    ) : (
      <Icon d={I.cross} className="mx-auto h-4 w-4 text-muted-foreground/60" />
    );
  return (
    <Section
      eyebrow="Comparison"
      title="Focused rota software, not another bloated management suite."
    >
      <div className="hairline overflow-x-auto bg-background">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-5 py-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Capability
              </th>
              <th className="px-5 py-4 text-center text-[12px] font-semibold">Watch Schedule</th>
              <th className="px-5 py-4 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Spreadsheets
              </th>
              <th className="px-5 py-4 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Broad yacht platforms
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0] as string} className="border-b border-border last:border-0">
                <td className="px-5 py-4 text-[13px]">{r[0]}</td>
                <td className="px-5 py-4 text-center"><Cell v={r[1]} /></td>
                <td className="px-5 py-4 text-center"><Cell v={r[2]} /></td>
                <td className="px-5 py-4 text-center"><Cell v={r[3]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    ["Is Watch Schedule a full yacht management platform?", "No. It is focused specifically on creating, adjusting, and exporting fair yacht watch schedules."],
    ["Does it replace hours-of-rest software?", "No. Watch Schedule is designed to support rota planning. It can be rest-hour aware, but the captain and vessel remain responsible for final compliance and records."],
    ["Can the captain override the schedule?", "Yes. The captain can manually adjust assignments and confirm changes before the schedule goes live."],
    ["Can we pause the rota during charter?", "Yes. Charter Mode pauses the normal rotation and resumes it from the correct point after the charter."],
    ["Can we upload a crew list?", "Yes. The onboarding flow allows the captain to upload or snap a crew list, review extracted names and departments, then confirm the database."],
    ["Does it work for small yachts?", "Yes. Solo Watch is designed for smaller yachts running one watch rota."],
    ["Does it support deck, interior, and engineering?", "Yes. Triple Watch supports three independent watch systems for larger vessels."],
  ];
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions captains usually ask." muted>
      <div className="hairline bg-background">
        <Accordion type="single" collapsible className="w-full">
          {items.map(([q, a], i) => (
            <AccordionItem key={q} value={`i${i}`} className="border-border px-6">
              <AccordionTrigger className="py-5 text-left text-[15px] font-medium hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[14px] leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

/* ---------- final CTA ---------- */
function FinalCTA() {
  return (
    <section id="cta" className="border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="eyebrow text-background/60">Get early access</div>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-[52px]">
              Build the next watch schedule without rebuilding the spreadsheet.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-background/70">
              Watch Schedule helps captains generate fair, professional yacht rotas in minutes.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="captain@vessel.com"
                className="h-12 flex-1 border border-background/30 bg-transparent px-4 text-sm text-background placeholder:text-background/40 focus:border-background focus:outline-none"
              />
              <Button
                type="submit"
                className="h-12 bg-background px-5 text-sm font-medium text-foreground hover:bg-background/90"
              >
                Get Early Access
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const groups = [
    ["Product", ["Features", "Pricing", "Watch modes", "Charter mode"]],
    ["Company", ["About", "Contact", "Press"]],
    ["Legal", ["Privacy", "Terms", "Data handling"]],
  ] as const;
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center border border-foreground">
                <Icon d={I.anchor} className="h-3.5 w-3.5" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">Watch Schedule</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Specialist superyacht watch rota generator. Fair schedules, charter-aware, captain-approved.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              watchschedule.com
            </p>
          </div>
          {groups.map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <div className="eyebrow">{title}</div>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="eyebrow">Status</div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 bg-foreground" />
              Pre-launch
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Watch Schedule. All rights reserved.</div>
          <div className="font-mono">Built for the bridge.</div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <WatchModes />
      <Features />
      <Charter />
      <Fairness />
      <Pricing />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
