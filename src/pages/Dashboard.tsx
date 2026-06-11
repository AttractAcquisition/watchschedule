import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ChevronLeft, ChevronRight, Download, Pencil, ShipWheel } from "lucide-react";
import { toast } from "sonner";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { PLAN_LABEL } from "@/lib/constants";
import {
  useAssignments,
  useCharterPauses,
  useCrew,
  useCrewFairnessScores,
  useLatestScheduleRun,
  useManualOverrides,
  useScheduleExplanations,
  useScheduleHealth,
  useVesselId,
} from "@/hooks/data";
import { activateCharterMode, exportSchedule, resumeCharterMode } from "@/lib/edgeFunctions";
import type { PlanType } from "@/lib/types";
import {
  adaptDailyAssignments,
  addMonths,
  getDayWeightKind,
  monthKey,
  startOfMonth,
  toISODate,
  type DailyWatchAssignment,
} from "@/lib/dailySchedule";
import { calculateFairnessEngine } from "@/lib/fairnessEngine";
import type { CrewMemberRow, ScheduleAssignmentRow } from "@/lib/database.types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const EMPTY_CREW: CrewMemberRow[] = [];
const EMPTY_ASSIGNMENTS: ScheduleAssignmentRow[] = [];

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date);
}

function buildMonthGrid(month: Date) {
  const first = startOfMonth(month);
  const firstDay = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - firstDay);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

function buildCurrentWeek(month: Date) {
  const today = new Date();
  const anchor =
    today.getMonth() === month.getMonth() && today.getFullYear() === month.getFullYear()
      ? today
      : startOfMonth(month);
  const offset = (anchor.getDay() + 6) % 7;
  const start = new Date(anchor);
  start.setDate(anchor.getDate() - offset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function DailyCalendar({
  assignments,
  month,
  onMonthChange,
}: {
  assignments: DailyWatchAssignment[];
  month: Date;
  onMonthChange: (date: Date) => void;
}) {
  const [view, setView] = useState<"month" | "week">("month");
  const todayMonth = startOfMonth(new Date());
  const maxMonth = startOfMonth(addMonths(todayMonth, 3));
  const currentMonth = startOfMonth(month);
  const days = view === "month" ? buildMonthGrid(month) : buildCurrentWeek(month);
  const assignmentByDate = new Map(assignments.map((assignment) => [assignment.date, assignment]));
  const canGoBack = currentMonth > todayMonth;
  const canGoForward = currentMonth < maxMonth;
  const hasAssignments = assignments.length > 0;

  return (
    <section className="panel overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Daily Watch Calendar
          </div>
          <h2 className="mt-1 text-xl font-semibold">{formatMonth(month)}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={view} onValueChange={(value) => setView(value as "month" | "week")}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            size="icon"
            variant="outline"
            disabled={!canGoBack}
            onClick={() => onMonthChange(addMonths(month, -1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            disabled={!canGoForward}
            onClick={() => onMonthChange(addMonths(month, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-border bg-background/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <div key={day} className="px-3 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const iso = toISODate(day);
          const assignment = assignmentByDate.get(iso);
          const inMonth = day.getMonth() === month.getMonth();
          const kind = getDayWeightKind(day);
          const isWeekend = kind === "saturday" || kind === "sunday";
          const isTransition = kind === "monday" || kind === "friday";

          return (
            <div
              key={iso}
              className={
                "min-h-28 border-b border-r border-border p-3 text-sm " +
                (!inMonth && view === "month" ? "bg-background/40 text-muted-foreground/50 " : "") +
                (isWeekend ? "bg-warning/10 " : "") +
                (isTransition ? "bg-primary/10 " : "")
              }
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs text-muted-foreground">{day.getDate()}</span>
              </div>
              <div className="mt-5 min-h-8">
                {assignment ? (
                  <div>
                    <div className="text-sm font-medium text-foreground">{assignment.crewName}</div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground/70">Unassigned</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!hasAssignments && (
        <div className="border-t border-border px-4 py-5 text-sm text-muted-foreground">
          No schedule generated yet. Configure watch settings and regenerate from Settings.
        </div>
      )}
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const vesselId = useVesselId();
  const { subscription, vessel } = useAuth();
  const crewQuery = useCrew();
  const latestRun = useLatestScheduleRun();
  const assignmentsQuery = useAssignments(latestRun.data?.id);
  const charter = useCharterPauses();
  const persistedFairness = useCrewFairnessScores();
  const scheduleHealth = useScheduleHealth();
  const explanations = useScheduleExplanations();
  const manualOverrides = useManualOverrides();

  const [calendarMonth, setCalendarMonth] = useState(startOfMonth(new Date()));
  const [charterBusy, setCharterBusy] = useState(false);

  const crew = crewQuery.data ?? EMPTY_CREW;
  const assignments = assignmentsQuery.data ?? EMPTY_ASSIGNMENTS;
  const dailyAssignments = useMemo(
    () => adaptDailyAssignments(assignments, crew),
    [assignments, crew],
  );
  const visibleAssignments = useMemo(
    () =>
      dailyAssignments.filter((assignment) => assignment.date.startsWith(monthKey(calendarMonth))),
    [dailyAssignments, calendarMonth],
  );
  const fairnessEngine = useMemo(
    () => calculateFairnessEngine(crew, dailyAssignments),
    [crew, dailyAssignments],
  );
  const persistedFairnessByCrew = new Map(
    (persistedFairness.data ?? []).map((score) => [score.crew_member_id, score]),
  );
  const crewFairnessRows = fairnessEngine.crewScores.map((score) => {
    const stored = persistedFairnessByCrew.get(score.crewMemberId);
    return {
      crewMemberId: score.crewMemberId,
      crewName: score.crewName,
      score: stored?.crew_fairness_score ?? score.score,
      fairnessDebt: stored?.fairness_debt ?? score.fairnessDebt,
    };
  });
  const scheduleFairnessScore =
    latestRun.data?.fairness_score ?? fairnessEngine.scheduleFairnessScore;
  const averageCrewFairnessScore =
    crewFairnessRows.length > 0
      ? Math.round(
          crewFairnessRows.reduce((sum, row) => sum + row.score, 0) / crewFairnessRows.length,
        )
      : fairnessEngine.averageCrewFairnessScore;
  const highestFairnessDebt =
    crewFairnessRows.length > 0
      ? Math.max(...crewFairnessRows.map((row) => row.fairnessDebt), 0)
      : fairnessEngine.highestFairnessDebt;
  const lowestFairnessScore =
    crewFairnessRows.length > 0
      ? Math.min(...crewFairnessRows.map((row) => row.score))
      : fairnessEngine.lowestFairnessScore;
  const rotationStabilityScore =
    scheduleHealth.data?.rotation_stability_score ?? fairnessEngine.rotationStabilityScore;
  const scheduleHealthScore = scheduleHealth.data?.schedule_health_score ?? scheduleFairnessScore;
  const runWarnings = Array.isArray(latestRun.data?.warnings)
    ? (latestRun.data.warnings.filter((item) => typeof item === "string") as string[])
    : [];
  const alerts = [
    ...runWarnings,
    ...(explanations.data ?? [])
      .filter((item) => item.explanation_type === "alert")
      .map((item) => item.explanation_text),
  ];
  const activeCharter = (charter.data ?? []).find((item) => item.status === "active");
  const planType = (subscription?.plan_type ?? vessel?.plan_type) as PlanType | null | undefined;

  async function handleExport() {
    if (!latestRun.data?.id) {
      toast("No schedule generated yet. Regenerate from Settings first.");
      return;
    }

    try {
      const result = await exportSchedule({
        schedule_run_id: latestRun.data.id,
        export_type: "bridge",
      });
      toast.success(result.file_url ? "Schedule PDF exported." : "Export started.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Export failed.");
    }
  }

  async function handleCharterToggle(next: boolean) {
    if (!vesselId) return;
    setCharterBusy(true);
    try {
      if (next) {
        const today = toISODate(new Date());
        const end = toISODate(addMonths(new Date(), 1));
        await activateCharterMode({
          vessel_id: vesselId,
          schedule_run_id: latestRun.data?.id,
          start_date: today,
          end_date: end,
          pause_all_watches: true,
          keep_engineering_watch_active: false,
          keep_security_watch_active: false,
          resume_mode: "manual",
        });
        toast.success("Charter Mode active.");
      } else {
        await resumeCharterMode({
          vessel_id: vesselId,
          schedule_run_id: latestRun.data?.id,
          resume_mode: "manual",
        });
        toast.success("Normal rotation active.");
      }
    } catch (error) {
      // TODO(charter-mode): keep this optimistic fallback until the daily
      // charter mode edge-function contract is finalized.
      toast.error(error instanceof Error ? error.message : "Charter Mode update failed.");
    } finally {
      setCharterBusy(false);
      charter.refetch();
    }
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Captain Dashboard"
        title={vessel?.name ?? "Your vessel"}
        description="Daily watch rota, crew balance, and captain actions."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-border text-[10px] uppercase tracking-wider">
              {planType ? PLAN_LABEL[planType] : "No plan"}
            </Badge>
            <div className="flex items-center gap-3 rounded-md border border-border px-3 py-2">
              <Switch
                checked={!!activeCharter}
                disabled={charterBusy}
                onCheckedChange={handleCharterToggle}
                aria-label="Toggle Charter Mode"
              />
              <div className="text-xs">
                <div className="font-medium">
                  {activeCharter ? "Charter Mode active" : "Normal rotation active"}
                </div>
              </div>
            </div>
            <Button size="sm" onClick={handleExport}>
              <Download className="h-3.5 w-3.5" /> Export Schedule PDF
            </Button>
          </div>
        }
      />

      <section className="grid gap-3 md:grid-cols-3">
        <Button className="h-14 justify-start" onClick={handleExport}>
          <Download className="h-4 w-4" /> Export Schedule PDF
        </Button>
        <Button
          variant="outline"
          className="h-14 justify-start"
          disabled={charterBusy}
          onClick={() => handleCharterToggle(!activeCharter)}
        >
          <ShipWheel className="h-4 w-4" /> Pause for Charter
        </Button>
        <Button
          variant="outline"
          className="h-14 justify-start"
          onClick={() => navigate("/settings#crew-database")}
        >
          <Pencil className="h-4 w-4" /> Edit Crew
        </Button>
      </section>

      <section className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Schedule Fairness Score" value={`${scheduleFairnessScore || "—"}%`} />
        <MetricCard
          label="Average Crew Fairness Score"
          value={`${averageCrewFairnessScore || "—"}%`}
        />
        <MetricCard label="Highest Fairness Debt" value={String(highestFairnessDebt || "—")} />
        <MetricCard label="Lowest Fairness Score" value={`${lowestFairnessScore || "—"}%`} />
        <MetricCard label="Rotation Stability Score" value={`${rotationStabilityScore || "—"}%`} />
        <MetricCard label="Schedule Health Score" value={`${scheduleHealthScore || "—"}%`} />
      </section>

      <div className="mt-6 grid gap-5 xl:grid-cols-[360px_1fr]">
        <section className="panel order-2 p-5 xl:order-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Crew Fairness
              </div>
              <h2 className="mt-1 text-lg font-semibold">
                {scheduleFairnessScore || "—"}% schedule score
              </h2>
            </div>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border bg-background/35 p-3">
              <div className="text-muted-foreground">Highest debt</div>
              <div className="mt-1 font-mono text-primary">{highestFairnessDebt || "—"}</div>
            </div>
            <div className="rounded-md border border-border bg-background/35 p-3">
              <div className="text-muted-foreground">Rotation stability</div>
              <div className="mt-1 font-mono text-success">{rotationStabilityScore || "—"}%</div>
            </div>
          </div>
          {fairnessEngine.mostDueToServe && (
            <div className="mt-3 rounded-md border border-primary/30 bg-primary/10 p-3 text-xs">
              <div className="text-muted-foreground">Most due to serve</div>
              <div className="mt-1 font-medium">{fairnessEngine.mostDueToServe.crewName}</div>
            </div>
          )}
          <div className="mt-5 divide-y divide-border">
            {crewFairnessRows.length ? (
              crewFairnessRows.map((score) => (
                <div key={score.crewMemberId} className="flex items-center justify-between py-3">
                  <span className="text-sm">{score.crewName}</span>
                  <span className="font-mono text-sm text-primary">
                    {score.score}% · debt {score.fairnessDebt}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-4 text-sm text-muted-foreground">
                Add active crew in Settings to calculate fairness.
              </div>
            )}
          </div>
          <div className="mt-5 rounded-md border border-border bg-background/35 p-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Alerts & Explainability
            </div>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              {alerts.length ? (
                alerts.slice(0, 4).map((alert, index) => <div key={index}>{alert}</div>)
              ) : (
                <div>No fairness alerts yet.</div>
              )}
              {!!manualOverrides.data?.length && (
                <div>{manualOverrides.data.length} recent manual override records.</div>
              )}
            </div>
            <Button
              className="mt-3 w-full justify-start"
              variant="outline"
              size="sm"
              onClick={() => navigate("/settings#intelligence-settings")}
            >
              Explain schedule
            </Button>
          </div>
        </section>

        <div className="order-1 xl:order-2">
          <DailyCalendar
            assignments={visibleAssignments}
            month={calendarMonth}
            onMonthChange={(date) => setCalendarMonth(startOfMonth(date))}
          />
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-mono text-xl text-foreground">{value}</div>
    </div>
  );
}
