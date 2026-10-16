import "./style.css";
import { addDays, daysInMonth, inMonth, isoDate, monthKey, pad, parseMonthKey, weekDates } from "./dates";
import { esc } from "./escape";
import { compressImage } from "./image";
import { ensureMonth, exportPlan, exportTimeline, importBundle, load, monthPlan, save, uid } from "./store";
import { timelineSvg } from "./timelineChart";
import {
  EVENT_STATUSES,
  EVENT_TYPES,
  IDENTITIES,
  MODULES,
  RESUME_KINDS,
  SUBJECTS,
  TRACKS,
  type AppData,
  type EventStatus,
  type EventType,
  type ResumeKind,
  type ScoreKind,
  type Subject,
} from "./types";

const app = document.querySelector<HTMLElement>("#app");
if (!app) throw new Error("缺少页面根节点");

const pages = [
  ["home", "首页"],
  ["profile", "资料"],
  ["timeline", "时间线"],
  ["plan", "计划"],
  ["study", "学习"],
] as const;

const EXAM_NAMES = ["国考", "湖北省考", "湖北普通选调", "湖北事业编", "武汉事业编", "军队文职"] as const;
const EXAM_PLACES = ["考点在武汉", "地点在武汉", "主考区在武汉", "湖北考区在武汉", "考点含武汉"] as const;

function route(): string {
  return location.hash.replace("#", "") || "home";
}

function paint(): void {
  const data = load();
  const [page, arg = "", extra = ""] = route().split("/");
  const active = page === "scores" || page === "board" ? "study" : page;
  app!.innerHTML = `
    <header class="top">
      <button class="brand" type="button" data-go="home">${bow()}RUO的求职系统</button>
      <nav class="nav">${pages
        .map(([id, label]) => `<button data-go="${id}" class="${active === id ? "active" : ""}">${label}</button>`)
        .join("")}</nav>
    </header>
    <main class="wrap">${body(data, page, arg, extra)}</main>`;
  app!.querySelectorAll<HTMLButtonElement>("[data-go]").forEach((button) => {
    button.onclick = () => {
      location.hash = button.dataset.go ?? "profile";
    };
  });
  bind(data, page, arg, extra);
}

function commit(update: (data: AppData) => AppData): void {
  save(update(load()));
}

function bow(): string {
  return `<svg class="bow" viewBox="0 0 22 16" aria-hidden="true"><path d="M11 8 C8 2 2 2 2 8 C2 14 8 14 11 8 C14 2 20 2 20 8 C20 14 14 14 11 8" fill="#8ec8ea"/><circle cx="11" cy="8" r="2" fill="#fff"/></svg>`;
}

function body(data: AppData, page: string, arg: string, extra: string): string {
  if (page === "home") return homePage(data);
  if (page === "timeline") return timelinePage(data);
  if (page === "plan") return planPage(data, arg, extra);
  if (page === "study" || page === "scores" || page === "board") return studyPage(data);
  return profilePage(data);
}

function homePage(data: AppData): string {
  const today = isoDate(new Date());
  const next = [...data.events].filter((event) => event.end >= today).sort((a, b) => a.start.localeCompare(b.start))[0];
  const days = weekDates(today);
  const weekTasks = data.tasks.filter((task) => days.includes(task.date));
  const latest = [...data.scores].sort((a, b) => a.date.localeCompare(b.date)).at(-1);
  const photos = data.resume.filter((item) => item.image);
  const hello = data.profile.name ? `${data.profile.name}，今天也要加油！Offer来来来` : "今天也要加油！Offer来来来";
  return `
    <h1>${bow()} ${esc(hello)}</h1>
    <p class="sub">${esc(data.profile.gradSchool)} ${esc(data.profile.gradMajor)} · ${esc(data.profile.gradYear)}届</p>
    <div class="home-grid">
      <section class="card">
        <h2>下一场</h2>
        ${
          next
            ? `<div class="stat">${esc(next.name)} ${esc(next.type)}</div><p class="muted">${esc(next.start)} · ${esc(next.place)} · ${esc(next.identity)}</p><button class="btn" data-go="timeline">看时间线</button>`
            : `<p class="muted">时间线上还没有今天之后的考试。</p>`
        }
      </section>
      <section class="card">
        <h2>本周</h2>
        <div class="stat">${rate(weekTasks)}</div>
        <p class="muted">任务完成</p>
        <button class="btn" data-go="plan">去日历</button>
      </section>
    </div>
    <div class="home-grid">
      <section class="card">
        <h2>最近一次分数</h2>
        ${
          latest
            ? `<div class="stat">${latest.score}/${latest.full}</div><p class="muted">${esc(latest.date)} ${esc(latest.subject)} ${esc(latest.module)} ${esc(latest.kind)}</p>${lineChart([latest.score / latest.full], [latest.date.slice(5)])}`
            : `<p class="muted">还没有分数。</p>`
        }
        <button class="btn" data-go="study">看学习</button>
      </section>
      <section class="card">
        <h2>奖项和证明</h2>
        ${
          photos.length
            ? `<div class="gallery">${photos.map((item) => `<img src="${item.image}" alt="${esc(item.title)}"/>`).join("")}</div>`
            : `<p class="muted">在资料页给奖项或证明加上图片后，会显示在这里。</p>`
        }
      </section>
    </div>`;
}

function profilePage(data: AppData): string {
  const profile = data.profile;
  const field = (key: string, label: string, value: string) =>
    `<label>${label}<input name="${key}" value="${esc(value)}"/></label>`;
  return `
    <h1>资料与简历</h1>
    <p class="sub">存在这台浏览器里。导出计划时不会带上姓名和简历。</p>
    <form id="profile" class="card grid">
      ${field("name", "姓名", profile.name)}
      ${field("gender", "性别", profile.gender)}
      ${field("politics", "政治面貌", profile.politics)}
      ${field("undergradSchool", "本科院校", profile.undergradSchool)}
      ${field("undergradMajor", "本科专业", profile.undergradMajor)}
      ${field("gradSchool", "硕士院校", profile.gradSchool)}
      ${field("gradMajor", "硕士专业", profile.gradMajor)}
      ${field("gradYear", "毕业年份", profile.gradYear)}
      ${field("hukou", "户籍", profile.hukou)}
      ${field("english", "英语", profile.english)}
      ${field("cities", "目标城市", profile.cities)}
      <div>
        <span class="muted">求职方向</span>
        <span class="checks">${TRACKS.map(
          (track) =>
            `<label><input type="checkbox" name="track" value="${track}" ${profile.tracks.includes(track) ? "checked" : ""}/> ${track}</label>`,
        ).join("")}</span>
      </div>
      <p id="profile-msg" class="muted">改完会自动保存。</p>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${RESUME_KINDS.map((kind) => `<option>${kind}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <label>奖项或证明图片<input name="image" type="file" accept="image/*"/></label>
        <div class="row"><button class="btn primary" id="resume-save" type="submit">添加</button></div>
        <p id="resume-msg" class="error"></p>
      </form>
      <table>
        <thead><tr><th></th><th>类型</th><th>时间</th><th>标题</th><th>说明</th><th></th></tr></thead>
        <tbody>${
          data.resume.length
            ? data.resume
                .map(
                  (item) => `<tr>
                    <td>${item.image ? `<img class="thumb" src="${item.image}" alt=""/>` : ""}</td>
                    <td>${esc(item.kind)}</td><td>${esc(item.time)}</td><td>${esc(item.title)}</td><td>${esc(item.detail)}</td>
                    <td><button class="btn" type="button" data-edit-resume="${item.id}">修改</button> <button class="btn danger" data-del-resume="${item.id}">删除</button></td>
                  </tr>`,
                )
                .join("")
            : `<tr><td colspan="6" class="muted">还没有简历条目。</td></tr>`
        }</tbody>
      </table>
    </section>`;
}

function chips(items: readonly string[], attr: string): string {
  return `<div class="chips">${items.map((item) => `<button type="button" class="btn" data-${attr}="${esc(item)}">${esc(item)}</button>`).join("")}</div>`;
}

function timelinePage(data: AppData): string {
  const today = isoDate(new Date());
  const names = [...new Set<string>([...EXAM_NAMES, ...data.events.map((event) => event.name)])];
  const places = [...new Set<string>([...EXAM_PLACES, ...data.events.map((event) => event.place)])];
  const rows = [...data.events].sort((a, b) => a.start.localeCompare(b.start));
  return `
    <div class="row">
      <h1>时间线</h1>
      <button class="btn" id="export-timeline" type="button">导出</button>
      <button class="btn" id="import-timeline" type="button">导入</button>
      <input id="timeline-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">条的长短是天数。实心是已公布，虚线是对标去年，红色是笔试和面试。</p>
    <p id="timeline-msg" class="error"></p>
    <section class="card timeline-chart">${timelineSvg(data.events)}</section>
    <div class="split">
      <section class="card">
        <h2>加一个节点</h2>
        ${chips(names, "exam-name")}
        <label>其他考试<input id="event-name" placeholder="不在上面就写在这里"/></label>
        ${chips(IDENTITIES, "exam-identity")}
        ${chips(EVENT_TYPES, "exam-type")}
        ${chips(EVENT_STATUSES, "exam-status")}
        ${chips(places, "exam-place")}
        <label>其他地点<input id="event-place" placeholder="不在上面就写在这里"/></label>
        <div class="row">
          <label>开始<input id="event-start" type="date" value="${today}"/></label>
          <label>结束<input id="event-end" type="date" value="${today}"/></label>
        </div>
        <button class="btn primary" type="button" id="add-event">加到时间线</button>
      </section>
      <aside class="card">
        <h2>已有节点</h2>
        ${
          rows.length
            ? rows
                .map(
                  (event) => `<div class="score-line"><button class="link" type="button" data-edit-event="${event.id}">${esc(event.start.slice(5))} ${esc(event.name)} ${esc(event.type)} ${esc(event.status)}</button><button class="btn danger" data-del-event="${event.id}">删除</button></div>`,
                )
                .join("")
            : `<p class="muted">还没有考试节点。</p>`
        }
      </aside>
    </div>`;
}

function planPage(data: AppData, arg: string, extra: string): string {
  const today = isoDate(new Date());
  const current = arg || today.slice(0, 7);
  const { year, month } = parseMonthKey(current);
  const focus = extra || today;
  const plan = monthPlan(data, year, month);
  const days = weekDates(focus);
  const monthTasks = data.tasks.filter((task) => inMonth(task.date, year, month));
  const doneHours = monthTasks.filter((task) => task.done).reduce((sum, task) => sum + task.minutes, 0) / 60;
  const target = plan.goals.reduce((sum, goal) => sum + goal.targetHours, 0);
  const weekRate = rate(data.tasks.filter((task) => days.includes(task.date)));
  return `
    <div class="row">
      <h1>${year}年${month}月</h1>
      <label>月份<input id="month-pick" type="month" value="${monthKey(year, month)}"/></label>
      <button class="btn" id="export-plan" type="button">导出</button>
      <button class="btn" id="import-plan" type="button">导入</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">本月 ${doneHours.toFixed(1)} / ${target} 小时 · 本周 ${weekRate}。深蓝点是行测，浅蓝点是申论，黄点是面试。</p>
    <p id="plan-msg" class="error"></p>
    <div class="split">
      <section class="card">
        ${calendar(data, year, month, focus)}
      </section>
      <aside class="card">
        <h2>${focus.slice(5)} 的任务</h2>
        ${dayTaskList(data, focus)}
        <h2>加上一项</h2>
        <div class="chips" id="subject-chips">${SUBJECTS.map((subject) => `<button type="button" class="btn" data-pick-subject="${subject}">${subject}</button>`).join("")}</div>
        <div class="chips" id="module-chips"></div>
        <div class="chips">${[20, 40, 60].map((minutes) => `<button type="button" class="btn" data-pick-minutes="${minutes}">${minutes}分钟</button>`).join("")}</div>
        <button class="btn primary" type="button" id="add-task">加到这一天</button>
        <h2>月目标</h2>
        ${plan.goals
          .map(
            (goal) => `<div class="row"><span>${goal.subject}</span>${[2, 4, 8, 12]
              .map(
                (hours) =>
                  `<button type="button" class="btn ${goal.targetHours === hours ? "primary" : ""}" data-hours="${hours}" data-subject="${goal.subject}">${hours}</button>`,
              )
              .join("")}</div>`,
          )
          .join("")}
        <button class="btn" type="button" id="split-week">拆到本周工作日</button>
      </aside>
    </div>`;
}

function calendar(data: AppData, year: number, month: number, focus: string): string {
  const lead = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const today = isoDate(new Date());
  const blanks = Array.from({ length: lead }, () => `<div class="cal empty"></div>`).join("");
  const cells = Array.from({ length: daysInMonth(year, month) }, (_, index) => {
    const day = index + 1;
    const date = `${year}-${pad(month)}-${pad(day)}`;
    const subjects = [...new Set(data.tasks.filter((task) => task.date === date).map((task) => task.subject))];
    const marks = [date === focus ? "selected" : "", date === today ? "today" : ""].filter(Boolean).join(" ");
    return `<button class="cal ${marks}" data-day="${date}"><span>${day}</span><span class="dots">${subjects
      .map((subject) => `<i class="dot ${subject}"></i>`)
      .join("")}</span></button>`;
  }).join("");
  return `<div class="cal-head">${"一二三四五六日".split("").map((day) => `<span>周${day}</span>`).join("")}</div><div class="cal-grid">${blanks}${cells}</div>`;
}

function dayTaskList(data: AppData, date: string): string {
  const tasks = data.tasks.filter((task) => task.date === date);
  if (!tasks.length) return `<p class="muted">这一天还没有任务。</p>`;
  return tasks
    .map(
      (task) => `<div class="row">
        <label class="task ${task.done ? "done" : ""}"><input type="checkbox" data-task="${task.id}" ${task.done ? "checked" : ""}/> ${esc(task.subject)} ${esc(task.module)} ${task.minutes}分钟</label>
        <button class="btn danger" data-del-task="${task.id}">删除</button>
      </div>`,
    )
    .join("");
}

function rate(tasks: AppData["tasks"]): string {
  if (!tasks.length) return "还没有任务";
  const done = tasks.filter((task) => task.done).length;
  return `${done}/${tasks.length}`;
}

function studyPage(data: AppData): string {
  const now = new Date();
  const monthScores = data.scores.filter((item) => inMonth(item.date, now.getFullYear(), now.getMonth() + 1));
  const averages = SUBJECTS.map((subject) => {
    const rows = monthScores.filter((item) => item.subject === subject && item.full > 0);
    const average = rows.length ? rows.reduce((sum, item) => sum + item.score / item.full, 0) / rows.length : 0;
    const latest = [...data.scores].filter((item) => item.subject === subject).sort((a, b) => b.date.localeCompare(a.date))[0];
    const series = data.scores.filter((item) => item.subject === subject).sort((a, b) => a.date.localeCompare(b.date));
    return { subject, average, latest, series };
  });
  const tasks = data.tasks.filter((task) => inMonth(task.date, now.getFullYear(), now.getMonth() + 1));
  const done = tasks.filter((task) => task.done).length;
  const weak = weakness(data);
  return `
    <h1>学习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <div class="quad">
      <section class="card"><div class="stat">${tasks.length ? Math.round((done / tasks.length) * 100) : 0}%</div><p class="muted">本月完成 ${done}/${tasks.length}</p></section>
      ${averages
        .map(
          (item) => `<section class="card"><h2>${item.subject}</h2><div class="stat">${item.latest ? `${item.latest.score}/${item.latest.full}` : "—"}</div><p class="muted">最近一次 · 本月平均 ${item.average ? Math.round(item.average * 100) + "%" : "还没有"}</p></section>`,
        )
        .join("")}
    </div>
    <div class="split">
      <section class="card">
        ${averages
          .map((item) =>
            item.series.length
              ? `<h2>${item.subject}</h2>${lineChart(
                  item.series.map((row) => row.score / row.full),
                  item.series.map((row) => row.date.slice(5)),
                  120,
                )}`
              : "",
          )
          .join("")}
        <h2>模块得分率</h2>
        ${
          weak.length
            ? barChart(weak)
            : `<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>`
        }
        <h2>分数</h2>
        ${
          data.scores.length
            ? [...data.scores]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map(
                  (item) => `<div class="score-line"><button class="link" type="button" data-edit-score="${item.id}">${esc(item.date)} ${esc(item.kind)} ${esc(item.subject)} ${esc(item.module)}</button><span>${item.score}/${item.full} <button class="btn danger" data-del-score="${item.id}">删除</button></span></div>`,
                )
                .join("")
            : `<p class="muted">还没有分数。</p>`
        }
      </section>
      <aside class="card">
        <h2>记一笔</h2>
        <div class="chips" id="score-kind">${(["模考", "练习"] as const).map((kind) => `<button type="button" class="btn" data-score-kind="${kind}">${kind}</button>`).join("")}</div>
        <div class="chips" id="score-subject">${SUBJECTS.map((subject) => `<button type="button" class="btn" data-score-subject="${subject}">${subject}</button>`).join("")}</div>
        <div class="chips" id="score-module"></div>
        <div class="row">
          <label>得分<input id="score-value" type="number" min="0" step="0.1"/></label>
          <label>满分<input id="score-full" type="number" min="1" step="0.1" value="100"/></label>
        </div>
        <button class="btn primary" type="button" id="save-score">记下</button>
      </aside>
    </div>`;
}

function lineChart(values: number[], labels: string[], h = 160): string {
  const w = 520;
  const padX = 28;
  const coords = values.map((value, index) => {
    const x = padX + (index * (w - padX * 2)) / Math.max(values.length - 1, 1);
    const y = 16 + (1 - value) * (h - 48);
    return `${x},${y}`;
  });
  const dots = coords
    .map((point, index) => {
      const [x, y] = point.split(",");
      return `<circle cx="${x}" cy="${y}" r="3" fill="#1e3a5f"/><text x="${x}" y="${h - 8}" text-anchor="middle" font-size="10" fill="#5c6b7a">${esc(labels[index] ?? "")}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="分数折线"><polyline fill="none" stroke="#1e3a5f" stroke-width="2" points="${coords.join(" ")}"/>${dots}</svg>`;
}

function barChart(items: Array<{ subject: string; module: string; ratio: number }>): string {
  const w = 420;
  const h = items.length * 36 + 10;
  const bars = items
    .map((item, index) => {
      const y = 10 + index * 36;
      const width = Math.max(4, item.ratio * 280);
      return `<text x="0" y="${y + 14}" font-size="12" fill="#1c2834">${esc(item.module)}</text>
        <rect x="90" y="${y}" width="${width}" height="16" fill="${index < 2 ? "#b23a3a" : "#1e3a5f"}"/>
        <text x="${96 + width}" y="${y + 13}" font-size="12" fill="#5c6b7a">${Math.round(item.ratio * 100)}%</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="模块正确率">${bars}</svg>`;
}

function weakness(data: AppData): Array<{ subject: string; module: string; ratio: number }> {
  const groups = new Map<string, number[]>();
  for (const score of data.scores) {
    if (!score.module || score.full <= 0) continue;
    const key = `${score.subject}\t${score.module}`;
    const list = groups.get(key) ?? [];
    list.push(score.score / score.full);
    groups.set(key, list);
  }
  return [...groups.entries()]
    .map(([key, ratios]) => {
      const [subject, module] = key.split("\t");
      const recent = ratios.slice(-3);
      const ratio = recent.reduce((sum, item) => sum + item, 0) / recent.length;
      return { subject, module, ratio };
    })
    .sort((a, b) => a.ratio - b.ratio);
}

function bind(data: AppData, page: string, arg: string, extra: string): void {
  if (page === "profile") bindProfile(data);
  if (page === "timeline") bindTimeline(data);
  if (page === "plan") bindPlan(data, arg, extra);
  if (page === "study" || page === "scores" || page === "board") bindScores(data);
}

function profileFrom(form: HTMLFormElement, data: AppData): AppData {
  const body = new FormData(form);
  return {
    ...data,
    profile: {
      ...data.profile,
      name: String(body.get("name") ?? ""),
      gender: String(body.get("gender") ?? ""),
      politics: String(body.get("politics") ?? ""),
      undergradSchool: String(body.get("undergradSchool") ?? ""),
      undergradMajor: String(body.get("undergradMajor") ?? ""),
      gradSchool: String(body.get("gradSchool") ?? ""),
      gradMajor: String(body.get("gradMajor") ?? ""),
      gradYear: String(body.get("gradYear") ?? ""),
      hukou: String(body.get("hukou") ?? ""),
      english: String(body.get("english") ?? ""),
      cities: String(body.get("cities") ?? ""),
      tracks: body.getAll("track").map(String),
    },
  };
}

function bindProfile(data: AppData): void {
  const form = document.querySelector<HTMLFormElement>("#profile")!;
  const persist = () => {
    const message = document.querySelector<HTMLElement>("#profile-msg");
    try {
      commit((current) => profileFrom(form, current));
      if (message) message.textContent = "已保存";
    } catch (error) {
      if (message) message.textContent = error instanceof Error ? error.message : "没有存上";
    }
  };
  form.addEventListener("input", persist);
  form.addEventListener("change", persist);
  form.onsubmit = (event) => {
    event.preventDefault();
    persist();
  };
  const resumeForm = document.querySelector<HTMLFormElement>("#resume")!;
  const resumeButton = document.querySelector<HTMLButtonElement>("#resume-save")!;
  let editingResume = "";
  document.querySelectorAll<HTMLButtonElement>("[data-edit-resume]").forEach((button) => {
    button.onclick = () => {
      const item = data.resume.find((row) => row.id === button.dataset.editResume);
      if (!item) return;
      editingResume = item.id;
      (resumeForm.elements.namedItem("kind") as HTMLSelectElement).value = item.kind;
      (resumeForm.elements.namedItem("time") as HTMLInputElement).value = item.time;
      (resumeForm.elements.namedItem("title") as HTMLInputElement).value = item.title;
      (resumeForm.elements.namedItem("detail") as HTMLInputElement).value = item.detail;
      resumeButton.textContent = "保存修改";
    };
  });
  resumeForm.onsubmit = async (event) => {
    event.preventDefault();
    const body = new FormData(resumeForm);
    const file = body.get("image");
    const message = document.querySelector<HTMLElement>("#resume-msg");
    try {
      let image = "";
      if (file instanceof File && file.size > 0) image = await compressImage(file);
      const title = String(body.get("title") ?? "").trim();
      if (!title) return;
      commit((current) => {
        const previous = current.resume.find((row) => row.id === editingResume);
        const next = {
          id: editingResume || uid(),
          kind: String(body.get("kind")) as ResumeKind,
          time: String(body.get("time") ?? ""),
          title,
          detail: String(body.get("detail") ?? ""),
          image: image || previous?.image || "",
        };
        const resume = editingResume
          ? current.resume.map((row) => (row.id === editingResume ? next : row))
          : [...current.resume, next];
        return { ...current, resume };
      });
      paint();
    } catch (error) {
      if (message) message.textContent = error instanceof Error ? error.message : "图片没有存上，换一张小一点的试试";
    }
  };
  document.querySelectorAll<HTMLButtonElement>("[data-del-resume]").forEach((button) => {
    button.onclick = () => {
      commit((current) => ({ ...current, resume: current.resume.filter((item) => item.id !== button.dataset.delResume) }));
      paint();
    };
  });
}

function bindTimeline(data: AppData): void {
  let name: string = EXAM_NAMES[0];
  let identity: string = IDENTITIES[0];
  let type: EventType = EVENT_TYPES[0];
  let status: EventStatus = EVENT_STATUSES[0];
  let place: string = EXAM_PLACES[0];
  const mark = (selector: string, value: string, attr: string) => {
    document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
      button.classList.toggle("primary", button.dataset[attr] === value);
    });
  };
  const pick = (selector: string, attr: string, apply: (value: string) => void, current: string) => {
    document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
      button.onclick = () => {
        const value = button.dataset[attr] ?? current;
        apply(value);
        mark(selector, value, attr);
      };
    });
    mark(selector, current, attr);
  };
  pick("[data-exam-name]", "examName", (value) => (name = value), name);
  pick("[data-exam-identity]", "examIdentity", (value) => (identity = value), identity);
  pick("[data-exam-type]", "examType", (value) => (type = value as EventType), type);
  pick("[data-exam-status]", "examStatus", (value) => (status = value as EventStatus), status);
  pick("[data-exam-place]", "examPlace", (value) => (place = value), place);
  let editingEvent = "";
  const addEvent = document.querySelector<HTMLButtonElement>("#add-event")!;
  document.querySelectorAll<HTMLButtonElement>("[data-edit-event]").forEach((button) => {
    button.onclick = () => {
      const item = data.events.find((event) => event.id === button.dataset.editEvent);
      if (!item) return;
      editingEvent = item.id;
      name = item.name;
      identity = item.identity;
      type = item.type;
      status = item.status;
      place = item.place;
      mark("[data-exam-name]", name, "examName");
      mark("[data-exam-identity]", identity, "examIdentity");
      mark("[data-exam-type]", type, "examType");
      mark("[data-exam-status]", status, "examStatus");
      mark("[data-exam-place]", place, "examPlace");
      document.querySelector<HTMLInputElement>("#event-name")!.value = "";
      document.querySelector<HTMLInputElement>("#event-place")!.value = "";
      document.querySelector<HTMLInputElement>("#event-start")!.value = item.start;
      document.querySelector<HTMLInputElement>("#event-end")!.value = item.end;
      addEvent.textContent = "保存修改";
    };
  });
  addEvent.onclick = () => {
    const customName = document.querySelector<HTMLInputElement>("#event-name")!.value.trim();
    const customPlace = document.querySelector<HTMLInputElement>("#event-place")!.value.trim();
    const start = document.querySelector<HTMLInputElement>("#event-start")!.value;
    const end = document.querySelector<HTMLInputElement>("#event-end")!.value || start;
    if (!start) return;
    const next = {
      id: editingEvent || uid(),
      name: customName || name,
      identity,
      place: customPlace || place,
      type,
      status,
      start,
      end: end < start ? start : end,
    };
    commit((current) => ({
      ...current,
      events: editingEvent ? current.events.map((event) => (event.id === editingEvent ? next : event)) : [...current.events, next],
    }));
    paint();
  };
  document.querySelectorAll<HTMLButtonElement>("[data-del-event]").forEach((button) => {
    button.onclick = () => {
      commit((current) => ({ ...current, events: current.events.filter((item) => item.id !== button.dataset.delEvent) }));
      paint();
    };
  });
  document.querySelector<HTMLButtonElement>("#export-timeline")!.onclick = () =>
    download("时间线.json", exportTimeline(data));
  wireImport("#import-timeline", "#timeline-file", "#timeline-msg");
}

function bindPlan(data: AppData, arg: string, extra: string): void {
  const today = isoDate(new Date());
  const current = arg || today.slice(0, 7);
  const { year, month } = parseMonthKey(current);
  const focus = extra || today;
  document.querySelector<HTMLInputElement>("#month-pick")!.onchange = (event) => {
    location.hash = `plan/${(event.currentTarget as HTMLInputElement).value}`;
  };
  document.querySelectorAll<HTMLButtonElement>("[data-day]").forEach((button) => {
    button.onclick = () => {
      location.hash = `plan/${monthKey(year, month)}/${button.dataset.day}`;
    };
  });
  let pickedSubject: Subject = "行测";
  let pickedModule = MODULES.行测[0];
  let pickedMinutes = 40;
  const moduleBox = document.querySelector<HTMLElement>("#module-chips")!;
  const mark = (selector: string, value: string, attr: string) => {
    document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
      button.classList.toggle("primary", button.dataset[attr] === value);
    });
  };
  const drawModules = () => {
    moduleBox.innerHTML = MODULES[pickedSubject]
      .map((item) => `<button type="button" class="btn" data-pick-module="${item}">${item}</button>`)
      .join("");
    moduleBox.querySelectorAll<HTMLButtonElement>("[data-pick-module]").forEach((button) => {
      button.onclick = () => {
        pickedModule = button.dataset.pickModule ?? pickedModule;
        mark("[data-pick-module]", pickedModule, "pickModule");
      };
    });
    mark("[data-pick-module]", pickedModule, "pickModule");
  };
  document.querySelectorAll<HTMLButtonElement>("[data-pick-subject]").forEach((button) => {
    button.onclick = () => {
      pickedSubject = button.dataset.pickSubject as Subject;
      pickedModule = MODULES[pickedSubject][0];
      mark("[data-pick-subject]", pickedSubject, "pickSubject");
      drawModules();
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-pick-minutes]").forEach((button) => {
    button.onclick = () => {
      pickedMinutes = Number(button.dataset.pickMinutes);
      mark("[data-pick-minutes]", String(pickedMinutes), "pickMinutes");
    };
  });
  mark("[data-pick-subject]", pickedSubject, "pickSubject");
  mark("[data-pick-minutes]", String(pickedMinutes), "pickMinutes");
  drawModules();
  document.querySelectorAll<HTMLButtonElement>("[data-hours]").forEach((button) => {
    button.onclick = () => {
      const name = button.dataset.subject as Subject;
      const hours = Number(button.dataset.hours);
      commit((current) => {
        const next = ensureMonth(current, year, month);
        return {
          ...next,
          months: next.months.map((item) =>
            item.year === year && item.month === month
              ? { ...item, goals: item.goals.map((goal) => (goal.subject === name ? { ...goal, targetHours: hours } : goal)) }
              : item,
          ),
        };
      });
      paint();
    };
  });
  document.querySelector<HTMLButtonElement>("#split-week")!.onclick = () => {
    const next = ensureMonth(load(), year, month);
    const plan = monthPlan(next, year, month);
    const days = [0, 1, 2, 3, 4].map((offset) => addDays(weekDates(focus)[0], offset));
    const created = plan.goals
      .filter((goal) => goal.targetHours > 0)
      .flatMap((goal) =>
        days.map((date) => ({
          id: uid(),
          date,
          subject: goal.subject,
          module: MODULES[goal.subject][0],
          title: goal.note || `${goal.subject}练习`,
          minutes: Math.max(20, Math.round((goal.targetHours * 60) / 4 / days.length)),
          done: false,
        })),
      );
    commit((current) => {
      const base = ensureMonth(current, year, month);
      return { ...base, tasks: [...base.tasks, ...created] };
    });
    paint();
  };
  document.querySelector<HTMLButtonElement>("#add-task")!.onclick = () => {
    commit((current) => {
      const next = ensureMonth(current, year, month);
      return {
        ...next,
        tasks: [
          ...next.tasks,
          {
            id: uid(),
            date: focus,
            subject: pickedSubject,
            module: pickedModule,
            title: `${pickedModule}练习`,
            minutes: pickedMinutes,
            done: false,
          },
        ],
      };
    });
    paint();
  };
  document.querySelectorAll<HTMLInputElement>("[data-task]").forEach((box) => {
    box.onchange = () => {
      commit((current) => ({
        ...current,
        tasks: current.tasks.map((task) => (task.id === box.dataset.task ? { ...task, done: box.checked } : task)),
      }));
      paint();
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-del-task]").forEach((button) => {
    button.onclick = () => {
      commit((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== button.dataset.delTask) }));
      paint();
    };
  });
  document.querySelector<HTMLButtonElement>("#export-plan")!.onclick = () =>
    download(`计划-${monthKey(year, month)}.json`, exportPlan(data, year, month));
  wireImport("#import-plan", "#plan-file", "#plan-msg");
}

function bindScores(data: AppData): void {
  let kind: ScoreKind = "模考";
  let subject: Subject = "行测";
  let moduleName = MODULES.行测[0];
  const moduleBox = document.querySelector<HTMLElement>("#score-module")!;
  const mark = (selector: string, value: string, attr: string) => {
    document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
      button.classList.toggle("primary", button.dataset[attr] === value);
    });
  };
  const drawModules = () => {
    moduleBox.innerHTML = MODULES[subject]
      .map((item) => `<button type="button" class="btn" data-score-module="${item}">${item}</button>`)
      .join("");
    moduleBox.querySelectorAll<HTMLButtonElement>("[data-score-module]").forEach((button) => {
      button.onclick = () => {
        moduleName = button.dataset.scoreModule ?? moduleName;
        mark("[data-score-module]", moduleName, "scoreModule");
      };
    });
    mark("[data-score-module]", moduleName, "scoreModule");
  };
  document.querySelectorAll<HTMLButtonElement>("[data-score-kind]").forEach((button) => {
    button.onclick = () => {
      kind = button.dataset.scoreKind as ScoreKind;
      mark("[data-score-kind]", kind, "scoreKind");
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-score-subject]").forEach((button) => {
    button.onclick = () => {
      subject = button.dataset.scoreSubject as Subject;
      moduleName = MODULES[subject][0];
      mark("[data-score-subject]", subject, "scoreSubject");
      drawModules();
    };
  });
  mark("[data-score-kind]", kind, "scoreKind");
  mark("[data-score-subject]", subject, "scoreSubject");
  drawModules();
  let editingScore = "";
  const saveScore = document.querySelector<HTMLButtonElement>("#save-score")!;
  document.querySelectorAll<HTMLButtonElement>("[data-edit-score]").forEach((button) => {
    button.onclick = () => {
      const item = data.scores.find((row) => row.id === button.dataset.editScore);
      if (!item) return;
      editingScore = item.id;
      kind = item.kind;
      subject = item.subject;
      moduleName = item.module;
      mark("[data-score-kind]", kind, "scoreKind");
      mark("[data-score-subject]", subject, "scoreSubject");
      drawModules();
      document.querySelector<HTMLInputElement>("#score-value")!.value = String(item.score);
      document.querySelector<HTMLInputElement>("#score-full")!.value = String(item.full);
      saveScore.textContent = "保存修改";
    };
  });
  saveScore.onclick = () => {
    const score = Number(document.querySelector<HTMLInputElement>("#score-value")!.value);
    const full = Number(document.querySelector<HTMLInputElement>("#score-full")!.value || 100);
    if (!Number.isFinite(score) || !Number.isFinite(full) || full <= 0) return;
    const next = {
      id: editingScore || uid(),
      date: data.scores.find((row) => row.id === editingScore)?.date ?? isoDate(new Date()),
      kind,
      subject,
      module: moduleName,
      score,
      full,
      minutes: data.scores.find((row) => row.id === editingScore)?.minutes ?? 0,
    };
    commit((current) => ({
      ...current,
      scores: editingScore ? current.scores.map((row) => (row.id === editingScore ? { ...next, date: row.date, minutes: row.minutes } : row)) : [...current.scores, next],
    }));
    paint();
  };
  document.querySelectorAll<HTMLButtonElement>("[data-del-score]").forEach((button) => {
    button.onclick = () => {
      commit((current) => ({ ...current, scores: current.scores.filter((item) => item.id !== button.dataset.delScore) }));
      paint();
    };
  });
}

function download(filename: string, payload: unknown): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function wireImport(buttonId: string, fileId: string, messageId: string): void {
  const button = document.querySelector<HTMLButtonElement>(buttonId);
  const file = document.querySelector<HTMLInputElement>(fileId);
  const message = document.querySelector<HTMLElement>(messageId);
  if (!button || !file || !message) return;
  button.onclick = () => file.click();
  file.onchange = async () => {
    const picked = file.files?.[0];
    if (!picked) return;
    try {
      const parsed = JSON.parse(await picked.text()) as unknown;
      commit((current) => importBundle(current, parsed));
      paint();
    } catch (error) {
      message.textContent = error instanceof Error ? error.message : "导入失败";
    }
  };
}

history.replaceState(null, "", `${location.pathname}${location.search}#home`);
window.addEventListener("hashchange", paint);
paint();
