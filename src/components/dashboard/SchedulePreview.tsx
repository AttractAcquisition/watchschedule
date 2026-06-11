import { MOCK_SCHEDULE } from "@/lib/mockData";

export function SchedulePreview() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows = [
    [
      "Deck/OOW",
      [
        "Sarah Mills",
        "Alex Thomas",
        "Ben Harris",
        "Chris Morgan",
        "Charter Pause",
        "Charter Pause",
        "Chris Morgan",
      ],
    ],
    [
      "Interior",
      ["Lisa Green", "Sophie White", "Mia Brooks", "Emma Jones", "Leave", "Leave", "Sophie White"],
    ],
    [
      "Engineering",
      [
        "Marco Rossi",
        "Nathan Clarke",
        "Marco Rossi",
        "Luca Bianchi",
        "Marco Rossi",
        "Nathan Clarke",
        "Marco Rossi",
      ],
    ],
  ];
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Weekly Schedule Preview · Week of {MOCK_SCHEDULE.weekStart}
        </div>
        <div className="text-[11px] text-muted-foreground">v{MOCK_SCHEDULE.version}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-xs">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">System</th>
              {days.map((d) => (
                <th key={d} className="px-3 py-2 text-[10px] font-medium">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([system, assignments]) => (
              <tr key={system as string} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">{system}</td>
                {(assignments as string[]).map((crew, index) => (
                  <td key={days[index]} className="px-3 py-3 align-top">
                    <div className="rounded border border-primary/25 bg-primary/10 px-2 py-1.5">
                      <div className="text-[11px] text-foreground">{crew}</div>
                      <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                        20:00-00:00
                      </div>
                      <span className="mt-1 inline-flex rounded border border-border px-1 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                        {crew.includes("Pause")
                          ? "Paused"
                          : crew === "Leave"
                            ? "Conflict"
                            : index < 2
                              ? "Confirmed"
                              : "Draft"}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
