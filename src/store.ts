import { freshData } from "./seed";
import type { AppData, MonthGoal, PlanExport, Task, TimelineExport } from "./types";
import { SUBJECTS } from "./types";

const KEY = "qiuzhi-v1";

export function load(): AppData {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const data = freshData();
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }
  const parsed = JSON.parse(raw) as AppData;
  return {
    ...freshData(),
    ...parsed,
    profile: { ...freshData().profile, ...parsed.profile },
    resume: parsed.resume ?? [],
    events: parsed.events ?? [],
    months: parsed.months ?? [],
    tasks: parsed.tasks ?? [],
    scores: parsed.scores ?? [],
  };
}

export function save(data: AppData): void {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function uid(): string {
  return crypto.randomUUID();
}

export function monthPlan(data: AppData, year: number, month: number) {
  return (
    data.months.find((item) => item.year === year && item.month === month) ?? {
      year,
      month,
      goals: SUBJECTS.map((subject) => ({ subject, targetHours: 0, note: "" })),
    }
  );
}

export function ensureMonth(data: AppData, year: number, month: number): AppData {
  if (data.months.some((item) => item.year === year && item.month === month)) return data;
  return {
    ...data,
    months: [
      ...data.months,
      {
        year,
        month,
        goals: SUBJECTS.map((subject): MonthGoal => ({ subject, targetHours: 0, note: "" })),
      },
    ],
  };
}

export function exportTimeline(data: AppData): TimelineExport {
  return { kind: "qiuzhi-timeline", version: 1, events: data.events };
}

export function exportPlan(data: AppData, year: number, month: number): PlanExport {
  const plan = monthPlan(data, year, month);
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return {
    kind: "qiuzhi-plan",
    version: 1,
    year,
    month,
    goals: plan.goals,
    tasks: data.tasks
      .filter((task) => task.date.startsWith(prefix))
      .map(({ date, subject, module, title, minutes }) => ({ date, subject, module, title, minutes })),
  };
}

export function importBundle(data: AppData, raw: unknown): AppData {
  if (!raw || typeof raw !== "object") throw new Error("文件不是求职系统导出的内容");
  const body = raw as TimelineExport | PlanExport;
  if (body.kind === "qiuzhi-timeline" && body.version === 1 && Array.isArray(body.events)) {
    const events = body.events.map((event) => ({ ...event, id: uid() }));
    return { ...data, events: [...data.events, ...events] };
  }
  if (body.kind === "qiuzhi-plan" && body.version === 1) {
    const next = ensureMonth(data, body.year, body.month);
    const months = next.months.map((item) =>
      item.year === body.year && item.month === body.month ? { ...item, goals: body.goals } : item,
    );
    const tasks: Task[] = body.tasks.map((task) => ({ ...task, id: uid(), done: false }));
    return { ...next, months, tasks: [...next.tasks, ...tasks] };
  }
  throw new Error("文件不是时间线或复习计划");
}
