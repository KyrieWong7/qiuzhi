import type { AppData, TimelineEvent } from "./types";

function event(
  name: string,
  identity: string,
  place: string,
  start: string,
  end: string,
  type: TimelineEvent["type"],
  status: TimelineEvent["status"],
): TimelineEvent {
  return { id: crypto.randomUUID(), name, identity, place, start, end, type, status };
}

export function freshData(): AppData {
  return {
    profile: {
      name: "",
      gender: "女",
      politics: "共青团员",
      undergradSchool: "中南财经政法大学",
      undergradMajor: "经济学",
      gradSchool: "中南财经政法大学",
      gradMajor: "数字经济",
      gradYear: "2027",
      hukou: "湖北黄冈",
      english: "CET-6 500",
      cities: "武汉",
      tracks: ["国考", "省考", "事业编", "选调"],
    },
    resume: [],
    events: [
      event("国考", "应届公务员", "考点在武汉", "2026-10-15", "2026-10-24", "报名", "已公布"),
      event("国考", "应届公务员", "考点在武汉", "2026-11-01", "2026-11-06", "缴费", "已公布"),
      event("国考", "应届公务员", "考点在武汉", "2026-11-29", "2026-11-29", "笔试", "已公布"),
      event("军队文职", "文职人员", "湖北考区在武汉", "2026-11-03", "2026-11-09", "报名", "对标去年"),
      event("军队文职", "文职人员", "湖北考区在武汉", "2026-12-14", "2026-12-14", "笔试", "对标去年"),
      event("湖北省考", "应届公务员", "主考区在武汉", "2027-01-13", "2027-01-19", "报名", "对标去年"),
      event("湖北省考", "应届公务员", "主考区在武汉", "2027-03-14", "2027-03-15", "笔试", "对标去年"),
      event("湖北普通选调", "普通选调", "考点在武汉", "2027-01-13", "2027-01-20", "报名", "对标去年"),
      event("湖北普通选调", "普通选调", "考点在武汉", "2027-03-14", "2027-03-14", "笔试", "对标去年"),
      event("湖北事业编", "事业编制", "考点含武汉", "2027-02-03", "2027-02-10", "报名", "对标去年"),
      event("湖北事业编", "事业编制", "考点含武汉", "2027-03-28", "2027-03-29", "笔试", "对标去年"),
      event("武汉事业编", "事业编制", "地点在武汉", "2027-09-15", "2027-09-22", "报名", "对标去年"),
      event("武汉事业编", "事业编制", "地点在武汉", "2027-10-25", "2027-10-25", "笔试", "对标去年"),
    ],
    months: [],
    tasks: [],
    scores: [],
  };
}
