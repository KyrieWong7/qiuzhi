import { esc } from "./escape";
import type { TimelineEvent } from "./types";

type Column =
  | { kind: "month"; year: number; month: number; days: number; x: number; width: number }
  | { kind: "gap"; x: number; width: number };

function monthIndex(year: number, month: number): number {
  return year * 12 + month;
}

export function timelineSvg(events: TimelineEvent[]): string {
  if (events.length === 0) return `<p class="muted">还没有考试节点。</p>`;
  const keys = [...new Set(events.map((event) => event.start.slice(0, 7) ))].sort();
  const parsed = keys.map((key) => {
    const [year, month] = key.split("-").map(Number);
    return { year, month, days: new Date(year, month, 0).getDate() };
  });
  const months: Array<{ year: number; month: number; days: number } | { gap: true }> = [];
  parsed.forEach((item, index) => {
    if (index > 0) {
      const prev = parsed[index - 1];
      if (monthIndex(item.year, item.month) - monthIndex(prev.year, prev.month) > 1) months.push({ gap: true });
    }
    months.push(item);
  });

  const left = 132;
  const gapW = 28;
  const colW = 108;
  const width = left + months.reduce((sum, item) => sum + ("gap" in item ? gapW : colW), 0) + 16;
  const names = [...new Set(events.map((event) => event.name))];
  const rowH = 46;
  const top = 28;
  const height = top + names.length * rowH + 36;
  const columns: Column[] = [];
  let x = left;
  for (const item of months) {
    if ("gap" in item) {
      columns.push({ kind: "gap", x, width: gapW });
      x += gapW;
    } else {
      columns.push({ kind: "month", ...item, x, width: colW });
      x += colW;
    }
  }

  const locate = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    const column = columns.find(
      (item): item is Extract<Column, { kind: "month" }> =>
        item.kind === "month" && item.year === year && item.month === month,
    );
    if (!column) return left;
    return column.x + ((day - 1) / column.days) * column.width;
  };

  const bars = events
    .map((event) => {
      const y = top + names.indexOf(event.name) * rowH + 8;
      const x1 = locate(event.start);
      const x2 = Math.max(locate(event.end) + 4, x1 + 3);
      const exam = event.type === "笔试" || event.type === "面试";
      const color = exam ? "#b23a3a" : "#1e3a5f";
      const dashed = event.status === "对标去年";
      const label = x2 - x1 > 36 ? event.type : "";
      const text =
        label === ""
          ? `<text x="${x2 + 4}" y="${y + 14}" font-size="11" fill="${color}">${esc(event.type)}</text>`
          : `<text x="${(x1 + x2) / 2}" y="${y + 13}" text-anchor="middle" font-size="11" fill="${dashed ? color : "#fff"}">${esc(label)}</text>`;
      const rect = dashed
        ? `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="18" rx="2" fill="none" stroke="${color}" stroke-dasharray="3 2"/>`
        : `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="18" rx="2" fill="${color}"/>`;
      return rect + text;
    })
    .join("");

  const heads = columns
    .map((column) => {
      if (column.kind === "gap") {
        return `<text x="${column.x + column.width / 2}" y="${height - 8}" text-anchor="middle" font-size="10" fill="#8b97a3">空档</text>`;
      }
      const name = column.month === 1 || column.month === 10 ? `${column.year}年${column.month}月` : `${column.month}月`;
      return `<text x="${column.x + column.width / 2}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#3e4c59">${name}</text>`;
    })
    .join("");
  const labels = names
    .map((name, index) => `<text x="0" y="${top + index * rowH + 22}" font-size="13" fill="#1c2834">${esc(name)}</text>`)
    .join("");
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="岗位时间线">${labels}${heads}${bars}</svg>`;
}
