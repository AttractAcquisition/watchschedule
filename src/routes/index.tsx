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
import watchScheduleLogo from "@/assets/watchschedule-logo-header-narrow.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Watch Schedule — Fair yacht watch schedules in minutes" },
      {
        name: "description",
        content:
          "Specialist superyacht watch schedule software. Snap your crew list, choose Solo, Dual or Triple Watch, and export a fair, professional schedule.",
      },
      { property: "og:title", content: "Watch Schedule — Fair yacht watch schedules in minutes" },
      {
        property: "og:description",
        content:
          "Specialist superyacht watch schedule software built for captains, officers and superyacht teams.",
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
function HeaderLogo() {
  return (
    <span className="flex flex-col items-center gap-2.5 text-center">
      <img
        src={watchScheduleLogo}
        alt="Watch Schedule"
        className="h-[13.44mm] w-auto object-contain bg-ink-3/80"
      />
      <span className="text-[11px] sm:text-[13px] font-normal text-bone">
        The Dedicated Watch Scheduling Platform for Superyachts
      </span>
      <span className="-mt-1.5 text-[8.5px] sm:text-[9.5px] font-normal uppercase tracking-[0.22em] text-mute/80">
        Built by a Superyacht Captain
      </span>
    </span>
  );
}

const menuItems = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-ink/92 backdrop-blur-md border-b border-bronze/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-3 flex items-center justify-center text-white">
        <a href="#top" className="flex items-center justify-center" aria-label="Watch Schedule home">
          <HeaderLogo />
        </a>
      </div>
      <div className="border-t border-bronze/35">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-12 grid grid-cols-[1fr_auto_1fr] items-center text-white">
          <div />
          <nav className="hidden md:flex items-center justify-center gap-9 text-[13px] font-normal text-bone">
            {menuItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-bronze transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end gap-3">
            <Button asChild variant="ghost" className="text-mute hover:bg-white/5 hover:text-bone h-9 font-normal">
              <a href="#cta">Sign In</a>
            </Button>
            <Button asChild className="bg-bronze text-ink hover:bg-bronze/90 h-9 rounded-none font-medium">
              <a href="#cta">Request Access</a>
            </Button>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden col-start-2 p-2" aria-label="Menu">
            <Icon d={open ? I.x : "M4 7h16M4 12h16M4 17h16"} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-line-2 bg-ink text-white px-5 py-4 space-y-3 text-sm">
          {menuItems.map((item) => (
            <a key={item.href} href={item.href} className="block py-1 text-mute hover:text-white" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#cta" className="block mt-3 px-4 py-2.5 border border-line text-center text-mute hover:text-white">Sign In</a>
          <a href="#cta" className="block mt-2 px-4 py-2.5 bg-bronze text-ink text-center font-medium hover:bg-bronze/90">Request Access</a>
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
        <div className="text-[10px] tracking-[0.2em] uppercase text-mute font-mono">watchschedule.com / schedule</div>
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

      {/* watch schedule */}
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
              <span className="h-px w-8 bg-line"/> Watch schedule software for superyachts
            </div>
            <h1 className="mt-6 text-[40px] leading-[1.02] sm:text-[56px] lg:text-[68px] font-semibold tracking-[-0.035em]">
              Stop Spending Hours Building Watch Schedules
            </h1>
            <p className="mt-6 text-[16px] lg:text-[17px] text-mute max-w-xl leading-relaxed">
              Generate fair, fully-covered watch schedules in seconds. Leave, charter periods and crew changes are handled automatically.
            </p>
            <div className="mt-7 max-w-xl border-l border-bronze pl-5">
              <h2 className="text-[22px] sm:text-[26px] leading-tight font-semibold tracking-tight">
                From Crew List to Published Schedule in Seconds
              </h2>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-bronze text-ink hover:bg-bronze/90 h-11 px-6 rounded-none text-[14px] font-medium">
                <a href="#cta">Request Access <Icon d={I.arrow} className="ml-1 h-4 w-4"/></a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-line text-white hover:bg-white/5 hover:text-white h-11 px-6 rounded-none text-[14px]">
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>
            <p className="mt-8 text-[12px] text-mute-2 max-w-md leading-relaxed">
              Developed from 15+ years of operational superyacht experience.
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
            ["Charter-aware", "Schedule Engine"],
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
    { t: "Hours wasted managing watch schedules", d: "Time that should be spent running the vessel is spent rebuilding schedules." },
    { t: "Crew changes create chaos", d: "One leave request can affect the entire rotation." },
    { t: "Bad watches keep repeating", d: "The same crew can end up carrying an unfair share of weekends and undesirable duties." },
    { t: "Charters break the system", d: "The rotation loses its place and fairness disappears." },
    { t: "Every change means more admin", d: "Schedules have to be checked, adjusted and redistributed manually." },
    { t: "Nobody trusts the process", d: "Without clear records, crew can question whether duties are being shared fairly." },
  ];
  return (
    <section className="bg-bone text-ink relative">
      <div className="absolute inset-0 bone-grid opacity-70 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">The problem</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Most watch schedules are one crew change away from breaking.
          </h2>
          <p className="mt-5 text-[16px] text-mute-2 leading-relaxed">
            Leave, charter periods, training, sickness, and last-minute changes quickly throw the rotation out of balance. Officers are left manually adjusting schedules, checking fairness, and fixing conflicts.
          </p>
          <p className="mt-4 text-[16px] text-mute-2 leading-relaxed">
            It's slow, repetitive, and difficult to get right consistently.
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
    { n: "03", t: "Generate watch schedule", d: "Choose Solo, Dual, or Triple Watch and generate a balanced schedule." },
    { n: "04", t: "Confirm and export", d: "Review changes, confirm the schedule, then export a professional PDF." },
  ];
  return (
    <section id="how" className="bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 chart-grid opacity-40 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute">How it works</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            From crew list to published watch schedule.
          </h2>
          <p className="mt-5 text-[16px] text-mute leading-relaxed">
            WatchSchedule transforms manual watch planning into a streamlined, controlled workflow.
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
            Because watch schedules don't stay the same for long.
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
              <div className="border-t border-border pt-3 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-mute-2">Rotation continuity</span>
                  <span className="font-medium">Intact</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mute-2">Status</span>
                  <span className="font-medium">Approved</span>
                </div>
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
              Built for the realities of superyacht watchkeeping.
            </h2>
            <p className="mt-5 text-mute max-w-md leading-relaxed">
              Crew change. Plans change. Charter periods interrupt the rotation. Watch Schedule adapts automatically, maintaining fairness and continuity while keeping the bridge supplied with a clear, reliable watch schedule.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px bg-line max-w-md border border-line">
              {[
                ["30–120m+", "Vessel size"],
                ["Solo / Dual / Triple", "Watch systems"],
                ["Custom", "Generation cycle"],
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
      t: "Solo Watch", p: "€39", best: "Most 30m–50m yachts",
      d: "For yachts running a single port watchkeeper system.",
      f: ["Monthly schedule generation", "Leave management", "Fairness balancing", "Charter mode", "PDF exports"],
    },
    {
      t: "Dual Watch", p: "€99", best: "Watchkeeper + OOW", featured: true,
      d: "For yachts running two concurrent watch systems.",
      f: ["Includes everything in Solo", "Two concurrent watch schedules", "Advanced balancing"],
    },
    {
      t: "Triple Watch", p: "€199", best: "65m+ yachts",
      d: "For larger yachts operating Deck, Interior, and Engineering watch systems.",
      f: ["Three departments", "Department-specific scheduling", "Leave rebalancing", "Coverage analytics"],
    },
  ];
  return (
    <section id="modes" className="bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 chart-grid opacity-25 pointer-events-none"/>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute">Watch Modes</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            One platform. Every watchkeeping model.
          </h2>
        </div>
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {modes.map((m) => (
            <div key={m.t} className={`border ${m.featured ? "border-bronze bg-bone text-ink" : "border-line bg-ink-2 text-white"} p-7 flex flex-col`}>
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-semibold tracking-tight">{m.t}</h3>
                {m.featured && <span className="font-mono text-[10px] uppercase tracking-widest border border-bronze bg-bronze px-2 py-1 text-ink">Most Popular</span>}
              </div>
              <div className={`mt-2 text-[12px] font-mono uppercase tracking-widest ${m.featured ? "text-mute-2" : "text-mute"}`}>{m.best}</div>
              <p className={`mt-5 text-[14px] leading-relaxed ${m.featured ? "text-mute-2" : "text-mute"}`}>{m.d}</p>
              <ul className="mt-6 space-y-2.5 text-[14px]">
                {m.f.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Icon d={I.check} className="h-4 w-4 mt-0.5 text-bronze"/>
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
    { t: "Fairness Engine", d: "Balances total watches, weekend duties, and consecutive-day exposure.", icon: I.scale },
    { t: "Charter Mode", d: "Pause the watch schedule when charter starts. Resume from the correct point afterwards.", icon: I.pause },
    { t: "Leave Management", d: "Joiners, leavers, and leave are reflected in the next generation cycle.", icon: I.users },
    { t: "Rotation Planning", d: "Plan months ahead with a clear view of crew availability.", icon: I.calendar },
    { t: "PDF Export", d: "Clean, captain-ready exports that print well and read clearly on screen.", icon: I.doc },
    { t: "Regenerate & Confirm", d: "Generate a draft, review any changes, then publish the watch schedule.", icon: I.refresh },
    { t: "Secure Vessel Data", d: "Your crew data. Secure. Controlled. Protected.", icon: I.shield },
  ];
  return (
    <section id="features" className="bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 chart-grid opacity-30 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute">Features</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Built for modern superyacht operations.
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
    { k: "Rotation continuity", v: "Intact", text: true },
    { k: "Status", v: "Approved", text: true },
  ];
  return (
    <section className="bg-ink-2 text-white relative">
      <div className="absolute inset-0 chart-grid opacity-30 pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="eyebrow text-mute">Fairness Engine</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Fair schedules. Clear reasoning.
          </h2>
          <p className="mt-5 text-mute leading-relaxed">
            The Fairness Engine reviews every draft schedule before publication, helping distribute duties fairly across the crew and prevent the same people carrying the same burdens week after week.
          </p>
          <p className="mt-5 text-mute leading-relaxed">
            The result is a schedule that's not only fair, but easy to explain and defend.
          </p>
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
            Charters shouldn't break the rotation.
          </h2>
          <p className="mt-5 text-mute-2 leading-relaxed max-w-2xl">
            When Charter Mode is enabled, the schedule is paused and later resumed from the correct point, ensuring duties remain balanced and the rotation stays intact.
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
            <div className="eyebrow text-mute">Bridge-Ready</div>
            <h2 className="mt-4 text-3xl lg:text-4xl font-semibold tracking-tight">
              Reviewed. Approved. Posted.
            </h2>
            <p className="mt-4 text-mute leading-relaxed">
              Review changes, confirm the rotation, and publish a clear, professional watch schedule ready to share with the crew.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      t: "Solo Watch", p: "€39", annual: "€390", best: "Most 30m–50m yachts",
      d: "For yachts with a single port watchkeeper.",
      f: ["Monthly schedule generation", "Leave management", "Fairness balancing", "Charter mode", "PDF exports"],
      cta: "Start Solo Watch",
    },
    {
      t: "Dual Watch", p: "€99", annual: "€990", best: "Watchkeeper + OOW", featured: true,
      d: "For yachts running Watchkeeper + OOW.",
      f: ["Includes everything in Solo", "Two concurrent watch schedules", "Advanced balancing"],
      cta: "Start Dual Watch",
    },
    {
      t: "Triple Watch", p: "€199", annual: "€1,990", best: "65m+ yachts",
      d: "For yachts operating Deck, Interior, and Engineering watch systems.",
      f: ["Three departments", "Department-specific scheduling", "Leave rebalancing", "Coverage analytics"],
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
            Only pay for the watch structure you actually run.
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
              <div className={`mt-2 text-[12px] font-mono uppercase tracking-widest ${t.featured ? "text-mute-2" : "text-mute"}`}>
                Annual: {t.annual} / year
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
          Annual plans include two months free. Pricing is based on the number of watch systems your vessel runs.
        </p>
      </div>
    </section>
  );
}

function Comparison() {
  const points = [
    "Fair rotations",
    "Charter-aware scheduling",
    "Rotation continuity",
    "Ready to Share",
    "Purpose-built for superyachts",
  ];
  return (
    <section className="bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow text-mute-2">Built for Watchkeeping</div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Most yacht software manages crews, documents and compliance.
          </h2>
          <p className="mt-5 text-[16px] text-mute-2 leading-relaxed">
            Watch Schedule does one thing: watch scheduling.
          </p>
          <p className="mt-4 text-[16px] text-mute-2 leading-relaxed">
            It creates fair, reliable watch schedules that adapt to real-world operations, helping bridge teams spend less time managing schedules and more time running the vessel.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
          {points.map((point) => (
            <div key={point} className="bg-white p-6 flex gap-3">
              <Icon d={I.check} className="h-5 w-5 text-bronze shrink-0 mt-0.5"/>
              <span className="text-[15px] leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Why not just use a spreadsheet?", a: "Spreadsheets work until crew availability changes, charter periods interrupt the rotation, or fairness becomes difficult to track. Watch Schedule automates these adjustments while preserving continuity across the watch schedule." },
    { q: "What happens when crew go on leave?", a: "Crew availability can be updated at any time, allowing schedules to adapt without manually rebuilding the rotation." },
    { q: "How are charter periods handled?", a: "Charter Mode pauses the normal rotation and resumes it from the correct point afterwards, helping maintain fairness across the season." },
    { q: "Is Watch Schedule designed specifically for superyachts?", a: "Yes. Every feature is built around the realities of superyacht watchkeeping operations." },
    { q: "How long does setup take?", a: "Most vessels can create and publish their first watch schedule within minutes." },
  ];
  return (
    <section id="faq" className="bg-ink text-white">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="eyebrow text-mute">FAQ</div>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Frequently Asked Questions
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
        <div className="eyebrow text-mute">Request Access</div>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          The dedicated watch scheduling platform for superyachts.
        </h2>
        <p className="mt-5 text-mute text-[16px] max-w-xl mx-auto leading-relaxed">
          Create fair, bridge-ready watch schedules in minutes, maintain rotation continuity, and spend less time managing watch schedules.
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
          <button type="submit" className="h-12 px-6 bg-bronze text-ink font-medium text-[14px] hover:bg-bronze/90 transition-colors">
            {sent ? "Request received" : "Request Access"}
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
          <div className="flex items-center">
            <img
              src={watchScheduleLogo}
              alt="Watch Schedule"
              className="w-[3.2cm] h-auto object-contain"
            />
          </div>
          <p className="mt-4 text-mute text-[14px] max-w-sm leading-relaxed">
            Built exclusively for superyacht watchkeeping operations.
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
          <div>Standardising watch scheduling across the world's leading superyachts.</div>
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
