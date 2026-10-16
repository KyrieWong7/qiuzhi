export const SUBJECTS = ["行测", "申论", "面试"] as const;
export type Subject = (typeof SUBJECTS)[number];

export const MODULES: Record<Subject, string[]> = {
  行测: ["言语", "数量", "判断", "资料", "常识"],
  申论: ["归纳概括", "综合分析", "提出对策", "应用文", "大作文"],
  面试: ["综合分析", "组织计划", "应急应变", "人际关系", "岗位匹配"],
};

export const TRACKS = ["国考", "省考", "事业编", "选调"] as const;
export const RESUME_KINDS = ["教育", "实习", "奖项", "技能"] as const;
export const IDENTITIES = ["应届公务员", "普通选调", "文职人员", "事业编制", "服务基层"] as const;
export const EVENT_TYPES = ["报名", "缴费", "笔试", "面试"] as const;
export const EVENT_STATUSES = ["已公布", "对标去年"] as const;

export type ResumeKind = (typeof RESUME_KINDS)[number];
export type Identity = (typeof IDENTITIES)[number];
export type EventType = (typeof EVENT_TYPES)[number];
export type EventStatus = (typeof EVENT_STATUSES)[number];

export type Profile = {
  name: string;
  gender: string;
  politics: string;
  undergradSchool: string;
  undergradMajor: string;
  gradSchool: string;
  gradMajor: string;
  gradYear: string;
  hukou: string;
  english: string;
  cities: string;
  tracks: string[];
};

export type ResumeItem = {
  id: string;
  kind: ResumeKind;
  title: string;
  detail: string;
  time: string;
  image?: string;
};

export type TimelineEvent = {
  id: string;
  name: string;
  identity: string;
  place: string;
  start: string;
  end: string;
  type: EventType;
  status: EventStatus;
};

export type MonthGoal = {
  subject: Subject;
  targetHours: number;
  note: string;
};

export type MonthPlan = {
  year: number;
  month: number;
  goals: MonthGoal[];
};

export type Task = {
  id: string;
  date: string;
  subject: Subject;
  module: string;
  title: string;
  minutes: number;
  done: boolean;
};

export type ScoreKind = "模考" | "练习";

export type Score = {
  id: string;
  date: string;
  kind: ScoreKind;
  subject: Subject;
  module: string;
  score: number;
  full: number;
  minutes: number;
};

export type AppData = {
  profile: Profile;
  resume: ResumeItem[];
  events: TimelineEvent[];
  months: MonthPlan[];
  tasks: Task[];
  scores: Score[];
};

export type TimelineExport = {
  kind: "qiuzhi-timeline";
  version: 1;
  events: TimelineEvent[];
};

export type PlanExport = {
  kind: "qiuzhi-plan";
  version: 1;
  year: number;
  month: number;
  goals: MonthGoal[];
  tasks: Array<Pick<Task, "date" | "subject" | "module" | "title" | "minutes">>;
};
