import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import bridgeNight from "@/assets/bridge-night.jpg";
import yachtNight from "@/assets/yacht-night.jpg";
import officerIpad from "@/assets/officer-ipad.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Watch Schedule — Fair yacht watch schedules in minutes" },
      {
        name: "description",
        content:
          "Specialist superyacht watch rota software. Snap your crew list, choose Solo, Dual or Triple Watch, and export a fair, professional schedule.",
      },
      { property: "og:title", content: "Watch Schedule — Fair yacht watch schedules in minutes" },
      {
        property: "og:description",
        content:
          "Specialist superyacht watch rota software built for captains, officers and superyacht teams.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- icons ---------- */
const Icon = ({ d, className = "" }: { d: string; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={`h-5 w-5 ${className}`}
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const I = {
  camera: "M3 7h4l2-2h6l2 2h4v12H3zM12 17a4 4 0 100-8 4 4 0 000 8z",
  scale: "M12 4v16M4 8h16M6 8l-2 6h4zM18 8l-2 6h4z",
  pause: "M9 5v14M15 5v14",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  doc: "M6 3h9l4 4v14H6zM15 3v4h4",
  refresh: "M4 12a8 8 0 0114-5l2-2v6h-6l2-2a6 6 0 100 6",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z",
  users: "M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a7 7 0 0118 0",
  anchor: "M12 3a2 2 0 100 4 2 2 0 000-4zM12 7v14M5 14a7 7 0 0014 0M3 14h4M17 14h4",
  check: "M5 12l4 4 10-10",
  x: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

/* ---------- header ---------- */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-ink/85 backdrop-blur-md border-b border-line-2">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between text-white">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="h-7 w-7 grid place-items-center border border-line text-white">
            <Icon d={I.anchor} className="h-3.5 w-3.5" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Watch Schedule</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-mute">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#modes" className="hover:text-white transition-colors">Watch Modes</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white h-9">
            <a href="#cta">Sign in</a>
          </Button>
          <Button asChild className="bg-white text-ink hover:bg-bone h-9 rounded-none">
            <a href="#cta">Get Early Access</a>
          </Button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Menu">
          <Icon d={open ? I.x : "M4 7h16M4 12h16M4 17h16"} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line-2 bg-ink text-white px-5 py-4 space-y-3 text-sm">
          {["how", "features", "modes", "pricing", "faq"].map((id) => (
            <a key={id} href={`#${id}`} className="block py-1 text-mute hover:text-white" onClick={() => setOpen(false)}>
              {id === "how" ? "How it works" : id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#cta" className="block mt-3 px-4 py-2.5 bg-white text-ink text-center font-medium">Get Early Access</a>
        </div>
      )}
    </header>
  );
}

/* ---------- premium dashboard mockup (dark) ---------- */
function DashboardMockup() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows = [
    { dept: "Deck", crew: [
      ["AM", "BK", "CR", "DM", "AM", "BK", "CR"],
    ]},
    { dept: "Interior", crew: [
      ["LS", "MT", "LS", "MT", "LS", "MT", "LS"],
    ]},
    { dept: "Engineering", crew: [
      ["JW", "PR", "JW", "PR", "JW", "PR", "JW"],
    ]},
  ];

  return (
    <div className="glass-dark text-white">
      {/* chrome */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-line">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line"/>
          <span className="h-2.5 w-2.5 rounded-full border border-line"/>
          <span className="h-2.5 w-2.5 rounded-full border border-line"/>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-mute font-mono">watchschedule.com / rota</div>
        <div className="text-[10px] text-mute font-mono">v1.0</div>
      </div>

      {/* vessel header */}
      <div className="px-5 py-4 flex flex-wrap items-end justify-between gap-4 border-b border-line">
        <div>
          <div className="eyebrow text-mute">Vessel</div>
          <div className="text-lg font-semibold tracking-tight mt-1">M/Y Example · 72m</div>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono">
          <div><div className="text-mute uppercase tracking-widest">Week</div><div className="text-white mt-1">14 · 2026</div></div>
          <div><div className="text-mute uppercase tracking-widest">Mode</div><div className="text-white mt-1">Triple Watch</div></div>
          <div><div className="text-mute uppercase tracking-widest">Charter</div><div className="text-white mt-1 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-white"/>Paused</div></div>
        </div>
      </div>

      {/* metrics strip */}
      <div className="grid grid-cols-3 border-b border-line">
        {[
          { k: "Fairness Score", v: "92%" },
          { k: "Weekend balance", v: "89%" },
          { k: "Night watch", v: "91%" },
        ].map((m) => (
          <div key={m.k} className="px-5 py-4 border-r last:border-r-0 border-line">
            <div className="text-[10px] uppercase tracking-[0.2em] text-mute">{m.k}</div>
            <div className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{m.v}</div>
          </div>
        ))}
      </div>

      {/* rota */}
      <div className="p-5">
        <div className="grid grid-cols-[110px_repeat(7,1fr)] text-[10px] font-mono text-mute uppercase tracking-widest mb-2">
          <div></div>
          {days.map((d, i) => (
            <div key={d} className={`px-2 py-1 ${i >= 5 ? "text-white" : ""}`}>{d}</div>
          ))}
        </div>
        <div className="space-y-1.5">
          {rows.map((r) => (
            <div key={r.dept} className="grid grid-cols-[110px_repeat(7,1fr)] items-stretch gap-1">
              <div className="flex items-center text-[12px] text-mute px-1">{r.dept}</div>
              {r.crew[0].map((c, i) => (
                <div key={i} className={`h-10 border border-line flex items-center justify-center text-[12px] font-mono ${i >= 5 ? "bg-white text-ink border-white" : "bg-ink-4"}`}>
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* legend / charter banner */}
        <div className="mt-5 border border-line p-3 flex items-center justify-between text-[11px] text-mute">
          <div className="flex items-center gap-2"><Icon d={I.pause} className="h-3.5 w-3.5 text-white"/><span className="text-white">Charter Mode</span> · Paused · Resumes Monday</div>
          <div className="font-mono">Auto-resume enabled</div>
        </div>
      </div>

      {/* footer actions */}
      <div className="px-5 py-3 border-t border-line flex items-center justify-between">
        <div className="text-[11px] text-mute font-mono">Last generated 04:12 · Captain approval required</div>
        <div className="flex gap-2">
          <button className="text-[12px] px-3 h-8 border border-line text-white hover:bg-white/5">Regenerate</button>
          <button className="text-[12px] px-3 h-8 bg-white text-ink font-medium">Export PDF</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */
function Hero() {
  return (
    <section id="top" className="relative bg-ink text-white overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0">
        <img src={bridgeNight} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-35"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink"/>
        <div className="absolute inset-0 chart-grid opacity-60"/>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow text-mute flex items-center gap-3">
              <span className="h-px w-8 bg-line"/> Watch rota software for superyachts
            </div>
            <h1 className="mt-6 text-[40px] leading-[1.02] sm:text-[56px] lg:text-[68px] font-semibold tracking-[-0.035em]">
              Fair yacht watch schedules in minutes.
            </h1>
            <p className="mt-6 text-[16px] lg:text-[17px] text-mute max-w-xl leading-relaxed">
              Snap your crew list, choose Solo, Dual, or Triple Watch, and generate a professional rota that balances leave, weekends, charter pauses, and crew fairness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-white text-ink hover:bg-bone h-11 px-6 rounded-none text-[14px] font-medium">
                <a href="#cta">Get Early Access <Icon d={I.arrow} className="ml-1 h-4 w-4"/></a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-line text-white hover:bg-white/5 hover:text-white h-11 px-6 rounded-none text-[14px]">
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>
            <p className="mt-8 text-[12px] text-mute-2 max-w-md leading-relaxed">
              Built for captains, officers, and superyacht teams managing fair watch rotations.
            </p>
          </div>

          <div className="lg:col-span-6">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* spec bar */}
      <div className="relative border-t border-line-2">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 text-[11px] font-mono text-mute uppercase tracking-[0.18em]">
          {[
            ["Solo · Dual · Triple", "Watch Modes"],
            ["Charter-aware", "Rota Engine"],
            ["PDF Export", "Captain-ready"],
            ["Fairness Engine", "Built-in"],
          ].map(([a, b]) => (
            <div key={a} className="py-4 border-r last:border-r-0 border-line-2 px-1">
              <div className="text-white">{a}</div>
              <div className="mt-1">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { t: "Spreadsheets get messy", d: "Cells drift, formulas break, last week's rota becomes this week's guesswork." },
    { t: "Crew availability changes", d: "Leave, joiners, leavers and sickness keep moving the baseline." },
    { t: "Weekend watches become unfair", d: "The same crew end up on Saturdays and Sundays week after week." },
    { t: "Charter periods break rotation", d: "Charter operations override the rota and the sequence loses its place." },
    { t: "PDF exports take extra admin", d: "Formatting a clean schedule for the bridge eats an evening." },
    { t: "Schedule changes are hard to explain", d: "Without an audit trail, fairness is impossible to defend." },
  ];
  return (
    <section className="bg-bone text-ink relative">
      <div className="absolute inset-0 bone-grid opacity-70 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">The problem</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Watch rotas should not be built from guesswork.
          </h2>
          <p className="mt-5 text-[16px] text-mute-2 leading-relaxed">
            Manual watch schedules break quickly. Crew go on leave. Charters interrupt the rotation. Weekend duties become uneven. Bad watches repeat. Then the captain is left rebuilding the rota manually.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {items.map((it, idx) => (
            <div key={it.t} className="bg-white p-7">
              <div className="font-mono text-[11px] text-mute-2">0{idx + 1}</div>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{it.t}</h3>
              <p className="mt-2 text-[14px] text-mute-2 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Snap crew list", d: "Upload or photograph the crew list. The system reads names and positions." },
    { n: "02", t: "Confirm departments", d: "Review Deck, Interior, Engineering, and Command allocations before saving." },
    { n: "03", t: "Generate rota", d: "Choose Solo, Dual, or Triple Watch and generate a balanced schedule." },
    { n: "04", t: "Confirm and export", d: "Review changes, confirm the schedule, then export a professional PDF." },
  ];
  return (
    <section id="how" className="bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 chart-grid opacity-40 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute">How it works</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            From crew list to confirmed rota.
          </h2>
          <p className="mt-5 text-[16px] text-mute leading-relaxed">
            Watch Schedule turns the usual manual rota process into a controlled, captain-approved workflow.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line-2 border border-line">
          {steps.map((s) => (
            <div key={s.n} className="bg-ink-2 p-7 relative">
              <div className="font-mono text-[11px] text-mute tracking-[0.2em]">STEP {s.n}</div>
              <h3 className="mt-6 text-[18px] font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[14px] text-mute leading-relaxed">{s.d}</p>
              <div className="mt-8 h-px bg-line"/>
              <div className="mt-3 font-mono text-[10px] text-mute-2 uppercase tracking-widest">— Process</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="bg-bone text-ink relative">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">Product</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Built for the way yacht watch schedules actually change.
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {/* Crew list import */}
          <div className="border border-border bg-white">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="eyebrow text-mute-2">Crew List Import</div>
              <Icon d={I.camera} className="h-4 w-4 text-ink"/>
            </div>
            <div className="p-5">
              <div className="border border-dashed border-border p-4 font-mono text-[12px] text-mute-2">
                crew_list_2026_w14.jpg
              </div>
              <Icon d="M12 5v14M5 12h14" className="h-4 w-4 mx-auto my-4 text-mute-2"/>
              <div className="border border-border divide-y divide-border text-[13px]">
                {[
                  ["A. Mason", "Chief Officer", "Deck"],
                  ["B. Knox", "OOW", "Deck"],
                  ["L. Stone", "Chief Stew", "Interior"],
                  ["J. Walsh", "2nd Engineer", "Engineering"],
                ].map(([n, p, d]) => (
                  <div key={n} className="grid grid-cols-[1fr_auto] px-3 py-2">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-[12px] text-mute-2">{p}</div>
                    </div>
                    <div className="font-mono text-[11px] text-mute-2 self-center uppercase tracking-widest">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charter mode */}
          <div className="bg-ink text-white border border-ink">
            <div className="p-5 border-b border-line flex items-center justify-between">
              <div className="eyebrow text-mute">Charter Mode</div>
              <Icon d={I.pause} className="h-4 w-4 text-white"/>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-mute">Before Charter</div>
                <div className="mt-2 flex items-center gap-2 text-[13px] font-mono">
                  {["Alex", "Ben", "Chris", "Daniel"].map((n, i) => (
                    <span key={n} className="flex items-center gap-2">
                      <span className="border border-line px-2 py-1">{n}</span>
                      {i < 3 && <Icon d={I.arrow} className="h-3 w-3 text-mute"/>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-line p-4 bg-ink-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-mute">Charter Mode</div>
                <div className="mt-2 text-[15px] flex items-center gap-2"><span className="h-2 w-2 bg-white rounded-full"/>Frozen · rotation paused</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-mute">After Charter</div>
                <div className="mt-2 text-[13px] font-mono">
                  Resumes with <span className="border border-line px-2 py-1 ml-1">Chris</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fairness engine */}
          <div className="border border-border bg-white">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="eyebrow text-mute-2">Fairness Engine</div>
              <Icon d={I.scale} className="h-4 w-4 text-ink"/>
            </div>
            <div className="p-5 space-y-4">
              {[
                ["Total watch balance", 94],
                ["Weekend fairness", 89],
                ["Night watch balance", 91],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="text-mute-2">{k}</span>
                    <span className="font-mono tabular-nums">{v}%</span>
                  </div>
                  <div className="h-1 bg-bone-2">
                    <div className="h-1 bg-ink" style={{ width: `${v}%` }}/>
                  </div>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between text-[12px]">
                <span className="text-mute-2">Consecutive-day risk</span>
                <span className="font-medium">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageBand() {
  return (
    <section className="bg-ink relative">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[520px]">
          <img src={yachtNight} alt="Superyacht at night in port" loading="lazy" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent"/>
        </div>
        <div className="bg-ink text-white p-10 lg:p-16 flex items-center">
          <div>
            <div className="eyebrow text-mute">Operational</div>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold tracking-tight max-w-md">
              Schedule software for a working bridge — not an HR portal.
            </h2>
            <p className="mt-5 text-mute max-w-md leading-relaxed">
              Watch Schedule is built around how watches actually run on a superyacht: shift handovers at sea, charter pauses in port, fairness across long seasons, and a printable rota the bridge can rely on.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px bg-line max-w-md border border-line">
              {[
                ["30–120m+", "Vessel size"],
                ["Solo / Dual / Triple", "Watch systems"],
                ["Weekly", "Generation cycle"],
                ["PDF", "Bridge export"],
              ].map(([a, b]) => (
                <div key={b} className="bg-ink p-4">
                  <div className="text-white text-[15px] font-medium">{a}</div>
                  <div className="text-[11px] uppercase tracking-widest text-mute mt-1">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modes() {
  const modes = [
    {
      t: "Solo Watch", p: "£29", best: "30m–50m yachts",
      d: "For vessels with one daily watchkeeper or simple port, anchor, or night watch coverage.",
      f: ["One watch rota", "Leave management", "Charter mode", "PDF export", "Fairness balancing"],
    },
    {
      t: "Dual Watch", p: "£59", best: "50m–65m yachts", featured: true,
      d: "For yachts running two simultaneous schedules, such as Watchkeeper + OOW, or day/night rotations.",
      f: ["Two simultaneous schedules", "Leave management", "Fairness balancing", "Schedule optimisation"],
    },
    {
      t: "Triple Watch", p: "£99", best: "60m–120m+ yachts",
      d: "For larger yachts operating separate Deck/OOW, Interior, and Engineering watch systems.",
      f: ["Three independent watch systems", "Department-specific rules", "Leave management", "Charter mode", "Advanced reporting"],
    },
  ];
  return (
    <section id="modes" className="bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">Watch Modes</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Choose the watch structure your vessel actually runs.
          </h2>
        </div>
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {modes.map((m) => (
            <div key={m.t} className={`border ${m.featured ? "border-ink bg-ink text-white" : "border-border bg-white"} p-7 flex flex-col`}>
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-semibold tracking-tight">{m.t}</h3>
                {m.featured && <span className="font-mono text-[10px] uppercase tracking-widest border border-line px-2 py-1 text-white">Most Popular</span>}
              </div>
              <div className={`mt-2 text-[12px] font-mono uppercase tracking-widest ${m.featured ? "text-mute" : "text-mute-2"}`}>{m.best}</div>
              <p className={`mt-5 text-[14px] leading-relaxed ${m.featured ? "text-mute" : "text-mute-2"}`}>{m.d}</p>
              <ul className="mt-6 space-y-2.5 text-[14px]">
                {m.f.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Icon d={I.check} className={`h-4 w-4 mt-0.5 ${m.featured ? "text-white" : "text-ink"}`}/>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const f = [
    { t: "Crew List Photo Import", d: "Snap a photo of the crew list. Names and positions are extracted automatically.", icon: I.camera },
    { t: "Fairness Engine", d: "Balances total watches, weekend duties, nights, and consecutive-day exposure.", icon: I.scale },
    { t: "Charter Mode", d: "Pause the rota when charter starts. Resume from the correct point afterwards.", icon: I.pause },
    { t: "Leave Management", d: "Joiners, leavers, and leave are reflected in the next generation cycle.", icon: I.users },
    { t: "Calendar View", d: "Weekly, monthly, and rotation views designed for the bridge — not for HR.", icon: I.calendar },
    { t: "PDF Export", d: "Clean, captain-ready exports that print well and read clearly on screen.", icon: I.doc },
    { t: "Regenerate & Confirm", d: "Generate a draft, review the diff, then confirm the rota for the period.", icon: I.refresh },
    { t: "Secure Vessel Data", d: "Crew data stays scoped to your vessel. Captain controls access end to end.", icon: I.shield },
  ];
  return (
    <section id="features" className="bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 chart-grid opacity-30 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute">Features</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Built around the real problems captains deal with.
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line-2 border border-line">
          {f.map((item) => (
            <div key={item.t} className="bg-ink-2 p-6 hover:bg-ink-3 transition-colors">
              <Icon d={item.icon} className="h-5 w-5 text-white"/>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{item.t}</h3>
              <p className="mt-2 text-[13px] text-mute leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fairness() {
  const stats = [
    { k: "Total watch balance", v: 94 },
    { k: "Weekend fairness", v: 89 },
    { k: "Night watch balance", v: 91 },
    { k: "Consecutive-day risk", v: "Low", text: true },
  ];
  return (
    <section className="bg-ink-2 text-white relative">
      <div className="absolute inset-0 chart-grid opacity-30 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="eyebrow text-mute">Fairness Engine</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Make the schedule fair — and easy to defend.
          </h2>
          <p className="mt-5 text-mute leading-relaxed">
            The fairness engine checks the rota before it goes live. It helps balance total watches, weekend duties, night watches, and repeated assignments across the crew.
          </p>
          <p className="mt-5 text-white text-[15px] font-medium">The captain always has final approval.</p>
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-px bg-line border border-line">
            {stats.map((s) => (
              <div key={s.k} className="bg-ink p-7">
                <div className="eyebrow text-mute">{s.k}</div>
                <div className="mt-6 text-5xl lg:text-6xl font-semibold tracking-[-0.04em] tabular-nums">
                  {s.text ? s.v : `${s.v}%`}
                </div>
                {!s.text && (
                  <div className="mt-4 h-1 bg-line-2">
                    <div className="h-1 bg-white" style={{ width: `${s.v}%` }}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CharterMode() {
  return (
    <section className="bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">Charter Mode</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Pause the rota when charter starts. Resume it properly when charter ends.
          </h2>
          <p className="mt-5 text-mute-2 leading-relaxed max-w-2xl">
            Normal watch rotations often stop making sense during charter. Watch Schedule freezes the rotation during charter mode and resumes from the correct point afterwards, so crew are not skipped, punished, or overloaded.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <div className="bg-white border border-border p-7">
            <div className="font-mono text-[10px] uppercase tracking-widest text-mute-2">01 · Before Charter</div>
            <div className="mt-5 space-y-2 text-[14px] font-mono">
              {["Alex", "Ben", "Chris", "Daniel"].map((n, i) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="text-mute-2 text-[11px] w-4">{i + 1}</span>
                  <span className="border border-border px-3 py-1.5 flex-1">{n}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-ink text-white p-7 border border-ink">
            <div className="font-mono text-[10px] uppercase tracking-widest text-mute">02 · Charter Mode</div>
            <div className="mt-12 flex flex-col items-center justify-center gap-4">
              <Icon d={I.pause} className="h-10 w-10 text-white"/>
              <div className="text-[18px] font-semibold tracking-tight">Frozen</div>
              <div className="text-[12px] text-mute font-mono">Rotation paused · Auto-resume</div>
            </div>
          </div>
          <div className="bg-white border border-border p-7">
            <div className="font-mono text-[10px] uppercase tracking-widest text-mute-2">03 · After Charter</div>
            <div className="mt-5 space-y-2 text-[14px] font-mono">
              {[
                ["Chris", true],
                ["Daniel", false],
                ["Alex", false],
                ["Ben", false],
              ].map(([n, hl], i) => (
                <div key={n as string} className="flex items-center gap-2">
                  <span className="text-mute-2 text-[11px] w-4">{i + 1}</span>
                  <span className={`px-3 py-1.5 flex-1 border ${hl ? "border-ink bg-ink text-white" : "border-border"}`}>{n}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 text-[12px] text-mute-2">Resumes with Chris — the next due crew member.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageBand2() {
  return (
    <section className="relative bg-ink text-white">
      <div className="relative">
        <img src={officerIpad} alt="Officer reviewing a watch schedule on an iPad at a chart table" loading="lazy" width={1600} height={1200} className="h-[420px] lg:h-[560px] w-full object-cover opacity-70"/>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"/>
        <div className="absolute inset-0 mx-auto max-w-7xl px-5 lg:px-8 flex items-end pb-14 lg:pb-20">
          <div className="max-w-xl">
            <div className="eyebrow text-mute">Bridge-ready</div>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold tracking-tight">
              Reviewed at the chart table. Approved by the captain. Posted on the bridge.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      t: "Solo Watch", p: "£29", best: "30m–50m",
      d: "For yachts with a single daily watchkeeper.",
      f: ["One watch rota", "Leave management", "Charter mode", "PDF export", "Fairness balancing"],
      cta: "Start Solo Watch",
    },
    {
      t: "Dual Watch", p: "£59", best: "50m–65m", featured: true,
      d: "For yachts running Watchkeeper + OOW, or Day/Night rotations.",
      f: ["Two simultaneous schedules", "Leave management", "Fairness balancing", "Schedule optimisation"],
      cta: "Start Dual Watch",
    },
    {
      t: "Triple Watch", p: "£99", best: "60m–120m+",
      d: "For yachts operating Deck/OOW, Interior, and Engineering watch systems.",
      f: ["Three independent watch systems", "Department-specific rules", "Leave management", "Charter mode", "Advanced reporting"],
      cta: "Start Triple Watch",
    },
  ];
  return (
    <section id="pricing" className="bg-ink text-white relative">
      <div className="absolute inset-0 chart-grid opacity-25 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute">Pricing</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Simple pricing by watch complexity.
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.t} className={`p-7 flex flex-col border ${t.featured ? "bg-white text-ink border-white" : "bg-ink-2 border-line"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-semibold tracking-tight">{t.t}</h3>
                {t.featured && <span className="font-mono text-[10px] uppercase tracking-widest border border-ink px-2 py-1">Most Popular</span>}
              </div>
              <div className={`mt-2 text-[12px] font-mono uppercase tracking-widest ${t.featured ? "text-mute-2" : "text-mute"}`}>Typical vessels: {t.best}</div>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">{t.p}</span>
                <span className={`text-[13px] ${t.featured ? "text-mute-2" : "text-mute"}`}>/ month</span>
              </div>
              <p className={`mt-4 text-[14px] leading-relaxed ${t.featured ? "text-mute-2" : "text-mute"}`}>{t.d}</p>
              <ul className="mt-6 space-y-2.5 text-[14px]">
                {t.f.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Icon d={I.check} className="h-4 w-4 mt-0.5"/>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-line/40 flex-1 flex items-end">
                <a href="#cta" className={`w-full text-center px-4 py-3 text-[14px] font-medium ${t.featured ? "bg-ink text-white hover:bg-ink-3" : "bg-white text-ink hover:bg-bone"} transition-colors`}>
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-mute">
          Need a fleet or management-company setup? <a href="#cta" className="text-white underline-offset-4 underline">Contact us for custom vessel pricing.</a>
        </p>
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    ["Purpose-built watch rota generation", true, false, false],
    ["Crew list photo import", true, false, false],
    ["Solo / Dual / Triple watch modes", true, false, false],
    ["Charter pause and resume", true, false, false],
    ["Fairness engine", true, false, false],
    ["Simple PDF export", true, true, true],
    ["Lightweight setup", true, true, false],
    ["Full yacht management suite", false, false, true],
  ];
  return (
    <section className="bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">Comparison</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Focused rota software, not another bloated management suite.
          </h2>
        </div>
        <div className="mt-12 border border-border bg-white overflow-x-auto">
          <table className="w-full text-[14px] min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-medium p-4 w-1/2 text-mute-2 font-mono text-[11px] uppercase tracking-widest">Capability</th>
                <th className="text-left font-medium p-4 text-[13px]">Watch Schedule</th>
                <th className="text-left font-medium p-4 text-[13px] text-mute-2">Spreadsheets</th>
                <th className="text-left font-medium p-4 text-[13px] text-mute-2">Broad yacht platforms</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, a, b, c]) => (
                <tr key={label as string} className="border-b last:border-b-0 border-border">
                  <td className="p-4">{label}</td>
                  <td className="p-4">{a ? <Icon d={I.check} className="h-4 w-4 text-ink"/> : <Icon d={I.x} className="h-4 w-4 text-mute-2"/>}</td>
                  <td className="p-4">{b ? <Icon d={I.check} className="h-4 w-4 text-mute-2"/> : <Icon d={I.x} className="h-4 w-4 text-mute-2"/>}</td>
                  <td className="p-4">{c ? <Icon d={I.check} className="h-4 w-4 text-mute-2"/> : <Icon d={I.x} className="h-4 w-4 text-mute-2"/>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Is Watch Schedule a full yacht management platform?", a: "No. Watch Schedule is a focused tool for generating fair watch rotas. It does not replace fleet management, ISM, or accounting platforms — and it is not trying to." },
    { q: "Does it replace hours-of-rest software?", a: "No. It is a watch rota generator, not an MLC hours-of-rest tracker. It is intended to sit alongside your existing compliance tooling." },
    { q: "Can the captain override the schedule?", a: "Yes. Every generated rota is a draft until the captain reviews and confirms it. Manual overrides are always available." },
    { q: "Can we pause the rota during charter?", a: "Yes. Charter Mode freezes the rotation during charter and resumes it from the correct point afterwards, so crew are not skipped." },
    { q: "Can we upload a crew list?", a: "Yes. Photograph or upload your crew list and confirm the parsed names, positions, and departments before generating." },
    { q: "Does it work for small yachts?", a: "Yes. Solo Watch is designed for 30–50m vessels running a single daily watchkeeper or simple anchor/port watch." },
    { q: "Does it support deck, interior, and engineering?", a: "Yes. Triple Watch runs three independent rotas — Deck/OOW, Interior, and Engineering — with department-specific rules." },
  ];
  return (
    <section id="faq" className="bg-ink text-white">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="eyebrow text-mute">FAQ</div>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Questions captains usually ask.
        </h2>
        <Accordion type="single" collapsible className="mt-10 border-t border-line-2">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`i${i}`} className="border-b border-line-2">
              <AccordionTrigger className="py-5 text-left text-[16px] font-medium text-white hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-mute text-[15px] leading-relaxed pb-6 pr-8">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="cta" className="bg-ink text-white relative overflow-hidden border-t border-line-2">
      <div className="absolute inset-0">
        <img src={yachtNight} alt="" width={1600} height={1200} className="h-full w-full object-cover opacity-20"/>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink"/>
        <div className="absolute inset-0 chart-grid opacity-40"/>
      </div>
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 py-24 lg:py-32 text-center">
        <div className="eyebrow text-mute">Early Access</div>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Build the next watch schedule without rebuilding the spreadsheet.
        </h2>
        <p className="mt-5 text-mute text-[16px] max-w-xl mx-auto leading-relaxed">
          Watch Schedule helps captains generate fair, professional yacht rotas in minutes.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
          className="mt-10 mx-auto max-w-md flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            required
            placeholder="captain@vessel.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 px-4 bg-ink-3 border border-line text-white placeholder:text-mute-2 focus:outline-none focus:border-white text-[14px]"
          />
          <button type="submit" className="h-12 px-6 bg-white text-ink font-medium text-[14px] hover:bg-bone transition-colors">
            {sent ? "Added to list" : "Get Early Access"}
          </button>
        </form>
        <p className="mt-4 text-[11px] text-mute-2 font-mono uppercase tracking-widest">No spam · One launch update</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-line-2">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 grid place-items-center border border-line">
              <Icon d={I.anchor} className="h-3.5 w-3.5"/>
            </span>
            <span className="font-semibold tracking-tight">Watch Schedule</span>
          </div>
          <p className="mt-4 text-mute text-[14px] max-w-sm leading-relaxed">
            Specialist watch rota software for superyacht captains and officers.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-mute-2">watchschedule.com</p>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-mute-2">Product</div>
          <ul className="mt-4 space-y-2.5 text-[14px] text-mute">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-mute-2">Company</div>
          <ul className="mt-4 space-y-2.5 text-[14px] text-mute">
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
            <li><a href="#cta" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-2">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-wrap items-center justify-between text-[11px] font-mono uppercase tracking-widest text-mute-2 gap-2">
          <div>© {new Date().getFullYear()} Watch Schedule</div>
          <div>Built for the bridge</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- root ---------- */
function Landing() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <Showcase />
      <ImageBand />
      <Modes />
      <Features />
      <Fairness />
      <CharterMode />
      <ImageBand2 />
      <Pricing />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
