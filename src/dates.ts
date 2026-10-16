export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseISO(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function monthKey(year: number, month: number): string {
  return `${year}-${pad(month)}`;
}

export function parseMonthKey(key: string): { year: number; month: number } {
  const [year, month] = key.split("-").map(Number);
  return { year, month };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function startOfWeek(value: string): Date {
  const date = parseISO(value);
  const offset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - offset);
  return date;
}

export function addDays(value: string, days: number): string {
  const date = parseISO(value);
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

export function weekDates(anchor: string): string[] {
  const start = isoDate(startOfWeek(anchor));
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export function weeksInMonth(year: number, month: number): string[] {
  const first = `${year}-${pad(month)}-01`;
  const last = daysInMonth(year, month);
  const seen = new Set<string>();
  const weeks: string[] = [];
  for (let day = 1; day <= last; day += 1) {
    const key = isoDate(startOfWeek(`${year}-${pad(month)}-${pad(day)}`));
    if (!seen.has(key)) {
      seen.add(key);
      weeks.push(key);
    }
  }
  void first;
  return weeks;
}

export function inMonth(value: string, year: number, month: number): boolean {
  const date = parseISO(value);
  return date.getFullYear() === year && date.getMonth() + 1 === month;
}

export function weekdayLabel(value: string): string {
  return "一二三四五六日"[(parseISO(value).getDay() + 6) % 7];
}
