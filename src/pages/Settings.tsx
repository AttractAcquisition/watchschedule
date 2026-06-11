import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RefreshCcw, Save } from "lucide-react";
import { toast } from "sonner";

import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DevSubscriptionPanel } from "@/components/DevSubscriptionPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCrew,
  useCrewFairnessScores,
  useExports,
  useInvalidateVesselData,
  useLeaveRequests,
  useLatestScheduleRun,
  useManualOverrides,
  useScheduleExplanations,
  useScheduleHealth,
  useWatchTemplates,
  useWatchSettings,
} from "@/hooks/data";
import { useAuth } from "@/lib/auth";
import {
  archiveCrew,
  confirmScheduleRun,
  createCrew,
  createLeaveRequest,
  updateCrew,
  updateLeaveRequest,
  updateProfile,
  updateVessel,
  upsertWatchSettings,
} from "@/lib/api";
import { calculateLeaveImpact, generateSchedule, regenerateSchedule } from "@/lib/edgeFunctions";
import { PLAN_LABEL } from "@/lib/constants";
import { addMonths, toISODate, type DailyWatchAssignment } from "@/lib/dailySchedule";
import { calculateFairnessEngine, DEFAULT_DUTY_WEIGHTING } from "@/lib/fairnessEngine";
import type { CrewMemberRow, LeaveRequestRow } from "@/lib/database.types";
import type { Department } from "@/lib/types";
import type { PlanType } from "@/lib/types";

type WeekendMode = "standard" | "heavy" | "friday_sunday" | "saturday_sunday" | "custom";
const EMPTY_CREW: CrewMemberRow[] = [];
const EMPTY_DAILY_ASSIGNMENTS: DailyWatchAssignment[] = [];

interface CrewDraft {
  fullName: string;
  position: string;
  rank: string;
  department: string;
  watchEligible: boolean;
  isRotational: boolean;
  isRelief: boolean;
  lifecycleStatus: string;
  onRota: boolean;
}

interface LeaveDraft {
  crewMemberId: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: string;
  notes: string;
}

function monthRange() {
  const start = new Date();
  start.setDate(1);
  const end = addMonths(start, 1);
  end.setDate(0);
  return { start: toISODate(start), end: toISODate(end) };
}

export default function Settings() {
  const navigate = useNavigate();
  const { user, profile, subscription, vessel, signOut, refreshAppState } = useAuth();
  const crewQuery = useCrew();
  const templates = useWatchTemplates();
  const latestRun = useLatestScheduleRun();
  const watchSettings = useWatchSettings();
  const leaveRequests = useLeaveRequests();
  const persistedFairness = useCrewFairnessScores();
  const scheduleHealth = useScheduleHealth();
  const explanations = useScheduleExplanations();
  const manualOverrides = useManualOverrides();
  const exportsQuery = useExports();
  const invalidate = useInvalidateVesselData();

  const [fullName, setFullName] = useState("");
  const [vesselName, setVesselName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [crewDrafts, setCrewDrafts] = useState<Record<string, CrewDraft>>({});
  const [watchName, setWatchName] = useState("Daily watch");
  const [weekendMode, setWeekendMode] = useState<WeekendMode>("standard");
  const [dailyWatchEnabled, setDailyWatchEnabled] = useState(true);
  const [onePersonPerDay, setOnePersonPerDay] = useState(true);
  const [mondayWeighted, setMondayWeighted] = useState(true);
  const [fridayWeighted, setFridayWeighted] = useState(true);
  const [saturdayWeighted, setSaturdayWeighted] = useState(true);
  const [sundayWeighted, setSundayWeighted] = useState(true);
  const [weekdayWeight, setWeekdayWeight] = useState(
    String(DEFAULT_DUTY_WEIGHTING.standard_weekday),
  );
  const [fridayWeight, setFridayWeight] = useState(String(DEFAULT_DUTY_WEIGHTING.friday));
  const [mondayWeight, setMondayWeight] = useState(String(DEFAULT_DUTY_WEIGHTING.monday));
  const [saturdayWeight, setSaturdayWeight] = useState(String(DEFAULT_DUTY_WEIGHTING.saturday));
  const [sundayWeight, setSundayWeight] = useState(String(DEFAULT_DUTY_WEIGHTING.sunday));
  const [publicHolidayWeight, setPublicHolidayWeight] = useState(
    String(DEFAULT_DUTY_WEIGHTING.public_holiday),
  );
  const [christmasEveWeight, setChristmasEveWeight] = useState(
    String(DEFAULT_DUTY_WEIGHTING.christmas_eve),
  );
  const [christmasDayWeight, setChristmasDayWeight] = useState(
    String(DEFAULT_DUTY_WEIGHTING.christmas_day),
  );
  const [boxingDayWeight, setBoxingDayWeight] = useState(String(DEFAULT_DUTY_WEIGHTING.boxing_day));
  const [newYearsEveWeight, setNewYearsEveWeight] = useState(
    String(DEFAULT_DUTY_WEIGHTING.new_years_eve),
  );
  const [newYearsDayWeight, setNewYearsDayWeight] = useState(
    String(DEFAULT_DUTY_WEIGHTING.new_years_day),
  );
  const [watchMode, setWatchMode] = useState("solo");
  const [qualificationBased, setQualificationBased] = useState(true);
  const [availabilityAware, setAvailabilityAware] = useState(true);
  const [leaveAware, setLeaveAware] = useState(true);
  const [manualOverrideEnabled, setManualOverrideEnabled] = useState(true);
  const [avoidRepeatedFriday, setAvoidRepeatedFriday] = useState(true);
  const [avoidRepeatedSunday, setAvoidRepeatedSunday] = useState(true);
  const [avoidRepeatedHoliday, setAvoidRepeatedHoliday] = useState(true);
  const [avoidConsecutiveDuties, setAvoidConsecutiveDuties] = useState(true);
  const [preserveRotation, setPreserveRotation] = useState(true);
  const [minimiseChanges, setMinimiseChanges] = useState(true);
  const [useFairnessDebtCorrection, setUseFairnessDebtCorrection] = useState(true);
  const [prioritiseMostDue, setPrioritiseMostDue] = useState(true);
  const [pauseNormalRota, setPauseNormalRota] = useState(true);
  const [freezeRotationOrder, setFreezeRotationOrder] = useState(true);
  const [resumeWithNextPerson, setResumeWithNextPerson] = useState(true);
  const [countCharterDays, setCountCharterDays] = useState(false);
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [autoResume, setAutoResume] = useState(false);
  const [captainApprovalRequired, setCaptainApprovalRequired] = useState(true);
  const [oowApprovalRequired, setOowApprovalRequired] = useState(false);
  const [scheduleLocking, setScheduleLocking] = useState(true);
  const [versionHistory, setVersionHistory] = useState(true);
  const [auditTrail, setAuditTrail] = useState(true);
  const [crewFairnessThreshold, setCrewFairnessThreshold] = useState("85");
  const [scheduleFairnessTarget, setScheduleFairnessTarget] = useState("90");
  const [debtCorrectionStrength, setDebtCorrectionStrength] = useState("0.75");
  const [consecutiveDutyPenalty, setConsecutiveDutyPenalty] = useState("8");
  const [repeatedFridayPenalty, setRepeatedFridayPenalty] = useState("6");
  const [repeatedSundayPenalty, setRepeatedSundayPenalty] = useState("6");
  const [repeatedHolidayPenalty, setRepeatedHolidayPenalty] = useState("10");
  const [minimumHealthScore, setMinimumHealthScore] = useState("85");
  const [generateExplanations, setGenerateExplanations] = useState(true);
  const [trackOverrideImpact, setTrackOverrideImpact] = useState(true);
  const [storeAiRecommendations, setStoreAiRecommendations] = useState(false);
  const [askScheduleEnabled, setAskScheduleEnabled] = useState(false);
  const [whatIfTrackingEnabled, setWhatIfTrackingEnabled] = useState(false);
  const [fairnessAlertsEnabled, setFairnessAlertsEnabled] = useState(true);
  const [leaveDraft, setLeaveDraft] = useState<LeaveDraft>({
    crewMemberId: "",
    startDate: toISODate(new Date()),
    endDate: toISODate(new Date()),
    leaveType: "leave",
    status: "requested",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const crew = crewQuery.data ?? EMPTY_CREW;
  const planType = (subscription?.plan_type ?? vessel?.plan_type) as PlanType | null | undefined;
  const fairnessEngine = useMemo(
    () => calculateFairnessEngine(crew, EMPTY_DAILY_ASSIGNMENTS),
    [crew],
  );
  const persistedFairnessByCrew = new Map(
    (persistedFairness.data ?? []).map((score) => [score.crew_member_id, score]),
  );
  const fairnessByCrew = new Map(
    fairnessEngine.crewScores.map((score) => [score.crewMemberId, score.score]),
  );

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setVesselName(vessel?.name ?? "");
    setTimezone(vessel?.timezone ?? "UTC");
  }, [profile, vessel]);

  useEffect(() => {
    const nextDrafts: Record<string, CrewDraft> = {};
    for (const member of crew) {
      nextDrafts[member.id] = {
        fullName: member.full_name,
        position: member.position ?? "",
        rank: member.rank ?? "",
        department: member.department ?? "unassigned",
        watchEligible: member.watch_eligible,
        isRotational: member.is_rotational,
        isRelief: member.is_relief,
        lifecycleStatus: member.crew_lifecycle_status ?? "active",
        // Current schema stores rota exclusion through crew_members.status.
        // On rota maps to active; off rota maps to on_leave for now.
        onRota: member.status === "active",
      };
    }
    setCrewDrafts(nextDrafts);
  }, [crew]);

  useEffect(() => {
    const settings = watchSettings.data;
    if (!settings) return;

    setWeekendMode((settings.weekend_mode as WeekendMode | null) ?? "standard");
    const dutyWeights = (settings.duty_weights ?? {}) as Partial<
      Record<keyof typeof DEFAULT_DUTY_WEIGHTING, number>
    >;
    setWeekdayWeight(
      String(dutyWeights.standard_weekday ?? DEFAULT_DUTY_WEIGHTING.standard_weekday),
    );
    setMondayWeight(String(dutyWeights.monday ?? DEFAULT_DUTY_WEIGHTING.monday));
    setFridayWeight(String(dutyWeights.friday ?? DEFAULT_DUTY_WEIGHTING.friday));
    setSaturdayWeight(String(dutyWeights.saturday ?? DEFAULT_DUTY_WEIGHTING.saturday));
    setSundayWeight(String(dutyWeights.sunday ?? DEFAULT_DUTY_WEIGHTING.sunday));
    setPublicHolidayWeight(
      String(dutyWeights.public_holiday ?? DEFAULT_DUTY_WEIGHTING.public_holiday),
    );
    setChristmasEveWeight(
      String(dutyWeights.christmas_eve ?? DEFAULT_DUTY_WEIGHTING.christmas_eve),
    );
    setChristmasDayWeight(
      String(dutyWeights.christmas_day ?? DEFAULT_DUTY_WEIGHTING.christmas_day),
    );
    setBoxingDayWeight(String(dutyWeights.boxing_day ?? DEFAULT_DUTY_WEIGHTING.boxing_day));
    setNewYearsEveWeight(String(dutyWeights.new_years_eve ?? DEFAULT_DUTY_WEIGHTING.new_years_eve));
    setNewYearsDayWeight(String(dutyWeights.new_years_day ?? DEFAULT_DUTY_WEIGHTING.new_years_day));

    const rotationRules = (settings.rotation_rules ?? {}) as Record<string, boolean | string>;
    setDailyWatchEnabled(Boolean(rotationRules.daily_watch_enabled ?? true));
    setOnePersonPerDay(Boolean(rotationRules.one_person_per_day ?? true));
    setWatchMode(String(rotationRules.watch_mode ?? "solo"));
    setQualificationBased(Boolean(rotationRules.qualification_based_assignment ?? true));
    setAvailabilityAware(Boolean(rotationRules.availability_aware_allocation ?? true));
    setLeaveAware(Boolean(rotationRules.leave_aware_allocation ?? true));
    setManualOverrideEnabled(Boolean(rotationRules.manual_override_enabled ?? true));
    setMondayWeighted(Boolean(rotationRules.monday_weighted ?? true));
    setFridayWeighted(Boolean(rotationRules.friday_weighted ?? true));
    setSaturdayWeighted(Boolean(rotationRules.saturday_weighted ?? true));
    setSundayWeighted(Boolean(rotationRules.sunday_weighted ?? true));
    setAvoidRepeatedFriday(Boolean(rotationRules.avoid_repeated_friday ?? true));
    setAvoidRepeatedSunday(Boolean(rotationRules.avoid_repeated_sunday ?? true));
    setAvoidRepeatedHoliday(Boolean(rotationRules.avoid_repeated_holiday ?? true));
    setAvoidConsecutiveDuties(Boolean(rotationRules.avoid_consecutive_duties ?? true));
    setPreserveRotation(Boolean(rotationRules.preserve_established_rotations ?? true));
    setMinimiseChanges(Boolean(rotationRules.minimise_unnecessary_changes ?? true));
    setUseFairnessDebtCorrection(Boolean(rotationRules.use_fairness_debt_correction ?? true));
    setPrioritiseMostDue(Boolean(rotationRules.prioritise_most_due_to_serve ?? true));

    const charterRules = (settings.charter_rules ?? {}) as Record<string, boolean>;
    setPauseNormalRota(Boolean(charterRules.pause_normal_rota ?? true));
    setFreezeRotationOrder(Boolean(charterRules.freeze_rotation_order ?? true));
    setResumeWithNextPerson(Boolean(charterRules.resume_with_next_person ?? true));
    setCountCharterDays(Boolean(charterRules.count_charter_days_in_fairness ?? false));
    setRequireConfirmation(Boolean(charterRules.require_captain_confirmation ?? true));
    setAutoResume(Boolean(charterRules.auto_resume ?? false));

    const publishingRules = (settings.publishing_rules ?? {}) as Record<string, boolean>;
    setCaptainApprovalRequired(Boolean(publishingRules.captain_approval_required ?? true));
    setOowApprovalRequired(Boolean(publishingRules.oow_approval_required ?? false));
    setScheduleLocking(Boolean(publishingRules.schedule_locking ?? true));
    setVersionHistory(Boolean(publishingRules.version_history ?? true));
    setAuditTrail(Boolean(publishingRules.audit_trail ?? true));

    const fairnessRules = (settings.fairness_rules ?? {}) as Record<string, number | string>;
    setCrewFairnessThreshold(String(fairnessRules.crew_fairness_threshold ?? 85));
    setScheduleFairnessTarget(String(fairnessRules.schedule_fairness_target ?? 90));
    setDebtCorrectionStrength(String(fairnessRules.debt_correction_strength ?? 0.75));
    setConsecutiveDutyPenalty(String(fairnessRules.consecutive_duty_penalty ?? 8));
    setRepeatedFridayPenalty(String(fairnessRules.repeated_friday_penalty ?? 6));
    setRepeatedSundayPenalty(String(fairnessRules.repeated_sunday_penalty ?? 6));
    setRepeatedHolidayPenalty(String(fairnessRules.repeated_holiday_penalty ?? 10));
    setMinimumHealthScore(String(fairnessRules.minimum_health_score ?? 85));

    const intelligenceRules = (settings.intelligence_rules ?? {}) as Record<string, boolean>;
    setGenerateExplanations(Boolean(intelligenceRules.generate_schedule_explanations ?? true));
    setTrackOverrideImpact(
      Boolean(intelligenceRules.track_manual_override_fairness_impact ?? true),
    );
    setStoreAiRecommendations(Boolean(intelligenceRules.store_ai_recommendations ?? false));
    setAskScheduleEnabled(Boolean(intelligenceRules.ask_the_schedule_enabled ?? false));
    setWhatIfTrackingEnabled(Boolean(intelligenceRules.what_if_tracking_enabled ?? false));
    setFairnessAlertsEnabled(Boolean(intelligenceRules.fairness_alerts_enabled ?? true));
  }, [watchSettings.data]);

  function updateCrewDraft(id: string, patch: Partial<CrewDraft>) {
    setCrewDrafts((drafts) => ({
      ...drafts,
      [id]: { ...drafts[id], ...patch },
    }));
  }

  async function addCrewMember() {
    if (!vessel) return;
    try {
      await createCrew(vessel.id, {
        full_name: "New crew member",
        department: "unassigned",
        watch_eligible: true,
        eligible_roles: [],
        status: "active",
        crew_lifecycle_status: "active",
      });
      invalidate();
      toast.success("Crew member added.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add crew member.");
    }
  }

  async function archiveCrewMember(id: string) {
    try {
      await archiveCrew(id);
      invalidate();
      toast.success("Crew member archived.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to archive crew member.");
    }
  }

  async function addLeaveRequest() {
    if (!vessel || !leaveDraft.crewMemberId) {
      toast.error("Choose a crew member before adding leave.");
      return;
    }
    try {
      let impactScore = 0;
      let forecastResult: Record<string, unknown> = {};
      try {
        const impact = await calculateLeaveImpact({
          vessel_id: vessel.id,
          crew_member_id: leaveDraft.crewMemberId,
          start_date: leaveDraft.startDate,
          end_date: leaveDraft.endDate,
          leave_type: leaveDraft.leaveType,
        });
        impactScore = Number(impact.impact_score ?? 0);
        forecastResult = impact as unknown as Record<string, unknown>;
      } catch {
        // Leave can still be recorded if the forecasting function is not deployed yet.
      }

      await createLeaveRequest({
        vesselId: vessel.id,
        crewMemberId: leaveDraft.crewMemberId,
        startDate: leaveDraft.startDate,
        endDate: leaveDraft.endDate,
        leaveType: leaveDraft.leaveType as LeaveRequestRow["leave_type"],
        status: leaveDraft.status as LeaveRequestRow["status"],
        impact_score: impactScore,
        forecast_result: forecastResult,
        notes: leaveDraft.notes || undefined,
        requestedBy: user?.id,
      });
      invalidate();
      toast.success("Leave request added.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add leave request.");
    }
  }

  async function setLeaveStatus(id: string, status: LeaveRequestRow["status"]) {
    try {
      await updateLeaveRequest(id, {
        status,
        approved_by: status === "approved" ? (user?.id ?? null) : null,
        approved_at: status === "approved" ? new Date().toISOString() : null,
      });
      invalidate();
      toast.success(`Leave ${status}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update leave request.");
    }
  }

  async function saveSettingsOnly() {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user.id, { full_name: fullName });

      if (vessel) {
        await updateVessel(vessel.id, {
          name: vesselName,
          timezone: timezone || "UTC",
        });
      }

      await Promise.all(
        crew.map((member) => {
          const draft = crewDrafts[member.id];
          if (!draft) return Promise.resolve(member);
          const patch: Partial<CrewMemberRow> = {
            full_name: draft.fullName,
            position: draft.position || null,
            rank: draft.rank || null,
            department: draft.department as Department,
            watch_eligible: draft.watchEligible && draft.onRota,
            is_rotational: draft.isRotational,
            is_relief: draft.isRelief,
            crew_lifecycle_status: draft.lifecycleStatus as CrewMemberRow["crew_lifecycle_status"],
            status: draft.onRota ? "active" : "on_leave",
          };
          return updateCrew(member.id, patch);
        }),
      );

      if (vessel) {
        await upsertWatchSettings(vessel.id, {
          schedule_type: "daily_watch",
          weekend_mode: weekendMode,
          duty_weights: {
            standard_weekday: Number(weekdayWeight),
            monday: Number(mondayWeight),
            friday: Number(fridayWeight),
            saturday: Number(saturdayWeight),
            sunday: Number(sundayWeight),
            public_holiday: Number(publicHolidayWeight),
            christmas_eve: Number(christmasEveWeight),
            christmas_day: Number(christmasDayWeight),
            boxing_day: Number(boxingDayWeight),
            new_years_eve: Number(newYearsEveWeight),
            new_years_day: Number(newYearsDayWeight),
          },
          rotation_rules: {
            watch_name: watchName,
            daily_watch_enabled: dailyWatchEnabled,
            one_person_per_day: onePersonPerDay,
            watch_mode: watchMode,
            qualification_based_assignment: qualificationBased,
            availability_aware_allocation: availabilityAware,
            leave_aware_allocation: leaveAware,
            manual_override_enabled: manualOverrideEnabled,
            monday_weighted: mondayWeighted,
            friday_weighted: fridayWeighted,
            saturday_weighted: saturdayWeighted,
            sunday_weighted: sundayWeighted,
            avoid_repeated_friday: avoidRepeatedFriday,
            avoid_repeated_sunday: avoidRepeatedSunday,
            avoid_repeated_holiday: avoidRepeatedHoliday,
            avoid_consecutive_duties: avoidConsecutiveDuties,
            preserve_established_rotations: preserveRotation,
            minimise_unnecessary_changes: minimiseChanges,
            use_fairness_debt_correction: useFairnessDebtCorrection,
            prioritise_most_due_to_serve: prioritiseMostDue,
          },
          charter_rules: {
            pause_normal_rota: pauseNormalRota,
            freeze_rotation_order: freezeRotationOrder,
            resume_with_next_person: resumeWithNextPerson,
            count_charter_days_in_fairness: countCharterDays,
            require_captain_confirmation: requireConfirmation,
            auto_resume: autoResume,
            manual_resume_required: !autoResume,
          },
          publishing_rules: {
            captain_approval_required: captainApprovalRequired,
            oow_approval_required: oowApprovalRequired,
            schedule_locking: scheduleLocking,
            version_history: versionHistory,
            audit_trail: auditTrail,
          },
          fairness_rules: {
            crew_fairness_threshold: Number(crewFairnessThreshold),
            schedule_fairness_target: Number(scheduleFairnessTarget),
            debt_correction_strength: Number(debtCorrectionStrength),
            consecutive_duty_penalty: Number(consecutiveDutyPenalty),
            repeated_friday_penalty: Number(repeatedFridayPenalty),
            repeated_sunday_penalty: Number(repeatedSundayPenalty),
            repeated_holiday_penalty: Number(repeatedHolidayPenalty),
            minimum_health_score: Number(minimumHealthScore),
          },
          intelligence_rules: {
            generate_schedule_explanations: generateExplanations,
            track_manual_override_fairness_impact: trackOverrideImpact,
            store_ai_recommendations: storeAiRecommendations,
            ask_the_schedule_enabled: askScheduleEnabled,
            what_if_tracking_enabled: whatIfTrackingEnabled,
            fairness_alerts_enabled: fairnessAlertsEnabled,
          },
        });
      }

      await refreshAppState();
      invalidate();
      toast.success("Settings saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings.");
      throw error;
    } finally {
      setSaving(false);
    }
  }

  async function saveAndRegenerate() {
    if (!vessel || !user) {
      toast.error("Complete onboarding before generating a schedule.");
      return;
    }

    setRegenerating(true);
    try {
      await saveSettingsOnly();
      const range = monthRange();

      if (latestRun.data?.id) {
        await regenerateSchedule({
          schedule_run_id: latestRun.data.id,
          mode: "full",
          change_context: {
            daily_watch_enabled: dailyWatchEnabled,
            one_person_per_day: onePersonPerDay,
            weekday_weight: Number(weekdayWeight),
            monday_weight: Number(mondayWeight),
            friday_weight: Number(fridayWeight),
            saturday_weight: Number(saturdayWeight),
            sunday_weight: Number(sundayWeight),
            public_holiday_weight: Number(publicHolidayWeight),
            monday_weighted: mondayWeighted,
            friday_weighted: fridayWeighted,
            saturday_weighted: saturdayWeighted,
            sunday_weighted: sundayWeighted,
            weekend_mode: weekendMode,
          },
        });
      } else {
        const result = await generateSchedule({
          vessel_id: vessel.id,
          watch_template_id: templates.data?.[0]?.id,
          start_date: range.start,
          end_date: range.end,
          watch_mode: "solo",
        });
        if (result.schedule_run_id) await confirmScheduleRun(result.schedule_run_id, user.id);
      }

      invalidate();
      toast.success("Settings saved and schedule regenerated.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Schedule regeneration failed.");
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings"
        title="Rota control centre"
        description="Crew, daily watch rules, charter behaviour, and regeneration controls."
        actions={
          <>
            <Badge variant="outline" className="border-border text-[10px] uppercase tracking-wider">
              {planType ? PLAN_LABEL[planType] : "No plan"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate("/login");
              }}
            >
              Sign out
            </Button>
          </>
        }
      />

      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Captain
            </div>
            <div className="mt-4 grid gap-3">
              <div className="space-y-2">
                <Label>Full name</Label>
                <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email ?? ""} type="email" disabled />
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Vessel
            </div>
            <div className="mt-4 grid gap-3">
              <div className="space-y-2">
                <Label>Vessel name</Label>
                <Input value={vesselName} onChange={(event) => setVesselName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Input value={timezone} onChange={(event) => setTimezone(event.target.value)} />
              </div>
            </div>
          </div>
        </section>

        <section id="crew-database" className="panel p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Crew Database
              </div>
              <h2 className="text-lg font-semibold">Rota crew</h2>
            </div>
            <Button size="sm" variant="outline" onClick={addCrewMember}>
              <Plus className="h-4 w-4" /> Add crew member
            </Button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crew member name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Watchkeeper</TableHead>
                  <TableHead>Rotational</TableHead>
                  <TableHead>Relief</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fairness score</TableHead>
                  <TableHead>Fairness debt</TableHead>
                  <TableHead>Rota availability</TableHead>
                  <TableHead>Archive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crew.map((member) => {
                  const draft = crewDrafts[member.id];
                  const storedFairness = persistedFairnessByCrew.get(member.id);
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Input
                          value={draft?.fullName ?? member.full_name}
                          onChange={(event) =>
                            updateCrewDraft(member.id, { fullName: event.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={draft?.position ?? member.position ?? ""}
                          onChange={(event) =>
                            updateCrewDraft(member.id, { position: event.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={draft?.rank ?? member.rank ?? ""}
                          onChange={(event) =>
                            updateCrewDraft(member.id, { rank: event.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={draft?.department ?? member.department ?? "unassigned"}
                          onValueChange={(value) =>
                            updateCrewDraft(member.id, { department: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="command">Command</SelectItem>
                            <SelectItem value="deck">Deck</SelectItem>
                            <SelectItem value="interior">Interior</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={draft?.watchEligible ?? member.watch_eligible}
                          onCheckedChange={(checked) =>
                            updateCrewDraft(member.id, { watchEligible: checked })
                          }
                          aria-label={`${member.full_name} watchkeeper eligibility`}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={draft?.isRotational ?? member.is_rotational}
                          onCheckedChange={(checked) =>
                            updateCrewDraft(member.id, { isRotational: checked })
                          }
                          aria-label={`${member.full_name} rotational crew`}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={draft?.isRelief ?? member.is_relief}
                          onCheckedChange={(checked) =>
                            updateCrewDraft(member.id, { isRelief: checked })
                          }
                          aria-label={`${member.full_name} relief crew`}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={draft?.lifecycleStatus ?? member.crew_lifecycle_status ?? "active"}
                          onValueChange={(value) =>
                            updateCrewDraft(member.id, { lifecycleStatus: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="joiner">Joiner</SelectItem>
                            <SelectItem value="leaver">Leaver</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="font-mono">
                        {storedFairness?.crew_fairness_score ??
                          fairnessByCrew.get(member.id) ??
                          "—"}
                        %
                      </TableCell>
                      <TableCell className="font-mono">
                        {storedFairness?.fairness_debt ?? "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={draft?.onRota ?? member.status === "active"}
                            onCheckedChange={(checked) =>
                              updateCrewDraft(member.id, { onRota: checked })
                            }
                            aria-label={`${member.full_name} rota availability`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {(draft?.onRota ?? member.status === "active") ? "On rota" : "Off rota"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => archiveCrewMember(member.id)}
                        >
                          Archive
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!crew.length && (
                  <TableRow>
                    <TableCell colSpan={12} className="py-8 text-center text-muted-foreground">
                      No crew yet. Add watchkeepers here before generating the daily schedule.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        <section id="watch-database" className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Watch Database
          </div>
          <h2 className="mt-1 text-lg font-semibold">Daily watch rules</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Watch type/name</Label>
              <Input value={watchName} onChange={(event) => setWatchName(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Weekday weighting</Label>
              <Input
                value={weekdayWeight}
                onChange={(event) => setWeekdayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Monday weighting</Label>
              <Input
                value={mondayWeight}
                onChange={(event) => setMondayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Friday weighting</Label>
              <Input
                value={fridayWeight}
                onChange={(event) => setFridayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Saturday weighting</Label>
              <Input
                value={saturdayWeight}
                onChange={(event) => setSaturdayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sunday weighting</Label>
              <Input
                value={sundayWeight}
                onChange={(event) => setSundayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Public holiday weighting</Label>
              <Input
                value={publicHolidayWeight}
                onChange={(event) => setPublicHolidayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Christmas Eve weighting</Label>
              <Input
                value={christmasEveWeight}
                onChange={(event) => setChristmasEveWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Christmas Day weighting</Label>
              <Input
                value={christmasDayWeight}
                onChange={(event) => setChristmasDayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Boxing Day weighting</Label>
              <Input
                value={boxingDayWeight}
                onChange={(event) => setBoxingDayWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>New Year's Eve weighting</Label>
              <Input
                value={newYearsEveWeight}
                onChange={(event) => setNewYearsEveWeight(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>New Year's Day weighting</Label>
              <Input
                value={newYearsDayWeight}
                onChange={(event) => setNewYearsDayWeight(event.target.value)}
              />
            </div>
            <SettingSwitch
              label="Daily watch enabled"
              checked={dailyWatchEnabled}
              onChange={setDailyWatchEnabled}
            />
            <SettingSwitch
              label="One person per day"
              checked={onePersonPerDay}
              onChange={setOnePersonPerDay}
            />
            <div className="space-y-2">
              <Label>Vessel watch support</Label>
              <Select value={watchMode} onValueChange={setWatchMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Single-watch vessel</SelectItem>
                  <SelectItem value="dual">Double-watch vessel</SelectItem>
                  <SelectItem value="triple">Triple-watch vessel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Weekend mode</Label>
              <Select
                value={weekendMode}
                onValueChange={(value) => setWeekendMode(value as WeekendMode)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard weekend</SelectItem>
                  <SelectItem value="heavy">Heavy weekend</SelectItem>
                  <SelectItem value="friday_sunday">Friday-Sunday weekend</SelectItem>
                  <SelectItem value="saturday_sunday">Saturday/Sunday only</SelectItem>
                  <SelectItem value="custom">Custom weekend weighting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <SettingSwitch
              label="Monday weighted"
              checked={mondayWeighted}
              onChange={setMondayWeighted}
            />
            <SettingSwitch
              label="Friday weighted"
              checked={fridayWeighted}
              onChange={setFridayWeighted}
            />
            <SettingSwitch
              label="Saturday weighted"
              checked={saturdayWeighted}
              onChange={setSaturdayWeighted}
            />
            <SettingSwitch
              label="Sunday weighted"
              checked={sundayWeighted}
              onChange={setSundayWeighted}
            />
            <SettingSwitch
              label="Qualification-based assignment"
              checked={qualificationBased}
              onChange={setQualificationBased}
            />
            <SettingSwitch
              label="Availability-aware allocation"
              checked={availabilityAware}
              onChange={setAvailabilityAware}
            />
            <SettingSwitch
              label="Leave-aware allocation"
              checked={leaveAware}
              onChange={setLeaveAware}
            />
            <SettingSwitch
              label="Manual override capability"
              checked={manualOverrideEnabled}
              onChange={setManualOverrideEnabled}
            />
            <SettingSwitch
              label="Avoid repeated Friday allocations"
              checked={avoidRepeatedFriday}
              onChange={setAvoidRepeatedFriday}
            />
            <SettingSwitch
              label="Avoid repeated Sunday allocations"
              checked={avoidRepeatedSunday}
              onChange={setAvoidRepeatedSunday}
            />
            <SettingSwitch
              label="Avoid repeated holiday allocations"
              checked={avoidRepeatedHoliday}
              onChange={setAvoidRepeatedHoliday}
            />
            <SettingSwitch
              label="Avoid consecutive duties"
              checked={avoidConsecutiveDuties}
              onChange={setAvoidConsecutiveDuties}
            />
            <SettingSwitch
              label="Preserve established rotations"
              checked={preserveRotation}
              onChange={setPreserveRotation}
            />
            <SettingSwitch
              label="Minimise unnecessary changes"
              checked={minimiseChanges}
              onChange={setMinimiseChanges}
            />
            <SettingSwitch
              label="Use Fairness Debt correction"
              checked={useFairnessDebtCorrection}
              onChange={setUseFairnessDebtCorrection}
            />
            <SettingSwitch
              label="Prioritise Most Due To Serve"
              checked={prioritiseMostDue}
              onChange={setPrioritiseMostDue}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            These controls persist to Supabase and are used by the daily generation Edge Function
            when deployed.
          </p>
        </section>

        <section id="charter-mode-settings" className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Charter Mode Settings
          </div>
          <h2 className="mt-1 text-lg font-semibold">Charter behaviour</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <SettingSwitch
              label="Pause normal rota"
              checked={pauseNormalRota}
              onChange={setPauseNormalRota}
            />
            <SettingSwitch
              label="Freeze rotation order"
              checked={freezeRotationOrder}
              onChange={setFreezeRotationOrder}
            />
            <SettingSwitch
              label="Resume with next person"
              checked={resumeWithNextPerson}
              onChange={setResumeWithNextPerson}
            />
            <SettingSwitch
              label="Count charter days in fairness"
              checked={countCharterDays}
              onChange={setCountCharterDays}
            />
            <SettingSwitch
              label="Require captain confirmation"
              checked={requireConfirmation}
              onChange={setRequireConfirmation}
            />
            <SettingSwitch
              label={autoResume ? "Auto-resume enabled" : "Manual resume required"}
              checked={autoResume}
              onChange={setAutoResume}
            />
          </div>
        </section>

        <section id="leave-management" className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Leave Management
          </div>
          <h2 className="mt-1 text-lg font-semibold">Leave-aware rota inputs</h2>
          <div className="mt-5 grid gap-3 lg:grid-cols-6">
            <div className="space-y-2 lg:col-span-2">
              <Label>Crew member</Label>
              <Select
                value={leaveDraft.crewMemberId}
                onValueChange={(value) =>
                  setLeaveDraft((draft) => ({ ...draft, crewMemberId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crew" />
                </SelectTrigger>
                <SelectContent>
                  {crew.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start date</Label>
              <Input
                type="date"
                value={leaveDraft.startDate}
                onChange={(event) =>
                  setLeaveDraft((draft) => ({ ...draft, startDate: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End date</Label>
              <Input
                type="date"
                value={leaveDraft.endDate}
                onChange={(event) =>
                  setLeaveDraft((draft) => ({ ...draft, endDate: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Leave type</Label>
              <Select
                value={leaveDraft.leaveType}
                onValueChange={(value) =>
                  setLeaveDraft((draft) => ({ ...draft, leaveType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leave">Leave</SelectItem>
                  <SelectItem value="sick">Sick</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="off_vessel">Off vessel</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={leaveDraft.status}
                onValueChange={(value) => setLeaveDraft((draft) => ({ ...draft, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 lg:col-span-5">
              <Label>Notes</Label>
              <Input
                value={leaveDraft.notes}
                onChange={(event) =>
                  setLeaveDraft((draft) => ({ ...draft, notes: event.target.value }))
                }
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={addLeaveRequest}>
                <Plus className="h-4 w-4" /> Add leave
              </Button>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crew member</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(leaveRequests.data ?? []).map((request) => {
                  const member = crew.find((item) => item.id === request.crew_member_id);
                  return (
                    <TableRow key={request.id}>
                      <TableCell>{member?.full_name ?? "Crew member"}</TableCell>
                      <TableCell>
                        {request.start_date} to {request.end_date}
                      </TableCell>
                      <TableCell className="capitalize">
                        {request.leave_type.replace(/_/g, " ")}
                      </TableCell>
                      <TableCell className="capitalize">{request.status}</TableCell>
                      <TableCell className="font-mono">{request.impact_score ?? 0}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setLeaveStatus(request.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setLeaveStatus(request.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!leaveRequests.data?.length && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                      No leave requests yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        <section id="publishing-workflow" className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Publishing Workflow
          </div>
          <h2 className="mt-1 text-lg font-semibold">Versioning, approval, and audit controls</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <SettingSwitch
              label="Captain approval required"
              checked={captainApprovalRequired}
              onChange={setCaptainApprovalRequired}
            />
            <SettingSwitch
              label="OOW approval required"
              checked={oowApprovalRequired}
              onChange={setOowApprovalRequired}
            />
            <SettingSwitch
              label="Schedule locking"
              checked={scheduleLocking}
              onChange={setScheduleLocking}
            />
            <SettingSwitch
              label="Version history"
              checked={versionHistory}
              onChange={setVersionHistory}
            />
            <SettingSwitch label="Audit trail" checked={auditTrail} onChange={setAuditTrail} />
            <SettingSwitch
              label="Manual override tracking"
              checked={manualOverrideEnabled}
              onChange={setManualOverrideEnabled}
            />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <InfoTile label="Latest schedule" value={latestRun.data?.status ?? "No schedule"} />
            <InfoTile label="Version" value={String(latestRun.data?.version ?? "—")} />
            <InfoTile label="Recent exports" value={String(exportsQuery.data?.length ?? 0)} />
          </div>
        </section>

        <section id="fairness-engine-settings" className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Fairness Engine
          </div>
          <h2 className="mt-1 text-lg font-semibold">Scoring thresholds and correction loop</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <NumberSetting
              label="Crew Fairness Score threshold"
              value={crewFairnessThreshold}
              onChange={setCrewFairnessThreshold}
            />
            <NumberSetting
              label="Schedule Fairness Score target"
              value={scheduleFairnessTarget}
              onChange={setScheduleFairnessTarget}
            />
            <NumberSetting
              label="Fairness Debt correction strength"
              value={debtCorrectionStrength}
              onChange={setDebtCorrectionStrength}
            />
            <NumberSetting
              label="Consecutive duty penalty"
              value={consecutiveDutyPenalty}
              onChange={setConsecutiveDutyPenalty}
            />
            <NumberSetting
              label="Repeated Friday penalty"
              value={repeatedFridayPenalty}
              onChange={setRepeatedFridayPenalty}
            />
            <NumberSetting
              label="Repeated Sunday penalty"
              value={repeatedSundayPenalty}
              onChange={setRepeatedSundayPenalty}
            />
            <NumberSetting
              label="Repeated holiday penalty"
              value={repeatedHolidayPenalty}
              onChange={setRepeatedHolidayPenalty}
            />
            <NumberSetting
              label="Minimum Schedule Health Score"
              value={minimumHealthScore}
              onChange={setMinimumHealthScore}
            />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <InfoTile
              label="Rotation Stability Score"
              value={`${scheduleHealth.data?.rotation_stability_score ?? (fairnessEngine.rotationStabilityScore || "—")}%`}
            />
            <InfoTile
              label="Schedule Health Score"
              value={`${scheduleHealth.data?.schedule_health_score ?? "—"}%`}
            />
            <InfoTile label="Manual overrides" value={String(manualOverrides.data?.length ?? 0)} />
          </div>
        </section>

        <section id="intelligence-settings" className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Explainability & Intelligence
          </div>
          <h2 className="mt-1 text-lg font-semibold">Decision history and future AI layer</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <SettingSwitch
              label="Generate schedule explanations"
              checked={generateExplanations}
              onChange={setGenerateExplanations}
            />
            <SettingSwitch
              label="Track override fairness impact"
              checked={trackOverrideImpact}
              onChange={setTrackOverrideImpact}
            />
            <SettingSwitch
              label="Store AI recommendations"
              checked={storeAiRecommendations}
              onChange={setStoreAiRecommendations}
            />
            <SettingSwitch
              label="Ask the Schedule enabled"
              checked={askScheduleEnabled}
              onChange={setAskScheduleEnabled}
            />
            <SettingSwitch
              label="What-if scenario tracking"
              checked={whatIfTrackingEnabled}
              onChange={setWhatIfTrackingEnabled}
            />
            <SettingSwitch
              label="Fairness alerts"
              checked={fairnessAlertsEnabled}
              onChange={setFairnessAlertsEnabled}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Ask the Schedule and AI recommendations are disabled until a real intelligence backend
            is configured. Explanations and alerts are stored as schedule metadata.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Stored explanations: {explanations.data?.length ?? 0}
          </div>
        </section>

        <section id="regeneration" className="panel p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Regeneration
              </div>
              <h2 className="mt-1 text-lg font-semibold">Save and rebuild the daily schedule</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Generates one daily watch assignment per date using the existing scheduling
                function.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                disabled={saving || regenerating}
                onClick={saveSettingsOnly}
              >
                <Save className="h-4 w-4" /> Save Settings Only
              </Button>
              <Button disabled={saving || regenerating} onClick={saveAndRegenerate}>
                <RefreshCcw className="h-4 w-4" />
                {regenerating ? "Regenerating..." : "Save All & Regenerate Schedule"}
              </Button>
            </div>
          </div>
        </section>

        <DevSubscriptionPanel />
      </div>
    </AppShell>
  );
}

function SettingSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-border px-3 py-2">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}

function NumberSetting({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/35 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-sm text-foreground">{value}</div>
    </div>
  );
}
