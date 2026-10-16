import "./style.css";
import { addDays, daysInMonth, inMonth, isoDate, monthKey, pad, parseMonthKey, weekDates, weekdayLabel, weeksInMonth } from "./dates";
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
  ["scores", "记分"],
  ["board", "学习"],
] as const;

function route(): string {
  return location.hash.replace("#", "") || "home";
}

function paint(): void {
  const data = load();
  const [page, arg = "", extra = ""] = route().split("/");
  app!.innerHTML = `
    <header class="top">
      <div class="brand">${bow()}RUO的求职系统</div>
      <nav class="nav">${pages
        .map(([id, label]) => `<button data-go="${id}" class="${page === id ? "active" : ""}">${label}</button>`)
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

function bow(): string {
  return `<svg class="bow" viewBox="0 0 22 16" aria-hidden="true"><path d="M11 8 C8 2 2 2 2 8 C2 14 8 14 11 8 C14 2 20 2 20 8 C20 14 14 14 11 8" fill="#f4a7c1"/><circle cx="11" cy="8" r="2" fill="#fff"/></svg>`;
}

function body(data: AppData, page: string, arg: string, extra: string): string {
  if (page === "home") return homePage(data);
  if (page === "timeline") return timelinePage(data);
  if (page === "plan") return planPage(data, arg, extra);
  if (page === "scores") return scorePage(data);
  if (page === "board") return boardPage(data);
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
        <button class="btn" data-go="board">看学习面板</button>
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
      <label>求职方向
        <span class="checks">${TRACKS.map(
          (track) =>
            `<label><input type="checkbox" name="track" value="${track}" ${profile.tracks.includes(track) ? "checked" : ""}/> ${track}</label>`,
        ).join("")}</span>
      </label>
      <div class="row"><button class="btn primary" type="submit">保存资料</button></div>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${RESUME_KINDS.map((kind) => `<option>${kind}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <label>奖项或证明图片<input name="image" type="file" accept="image/*"/></label>
        <div class="row"><button class="btn primary" type="submit">添加</button></div>
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
                    <td><button class="btn danger" data-del-resume="${item.id}">删除</button></td>
                  </tr>`,
                )
                .join("")
            : `<tr><td colspan="6" class="muted">还没有简历条目。</td></tr>`
        }</tbody>
      </table>
    </section>`;
}

function timelinePage(data: AppData): string {
  const options = (list: readonly string[], selected = "") =>
    list.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
  return `
    <h1>岗位时间线</h1>
    <p class="sub">只放你要考的节点。条的长短是天数，笔试为红色，对标去年为虚线。</p>
    <div class="card">${timelineSvg(data.events)}</div>
    <form id="event" class="card grid">
      <label>考试<input name="name" required placeholder="国考"/></label>
      <label>身份<select name="identity">${options(IDENTITIES)}</select></label>
      <label>地点或考点<input name="place" placeholder="考点在武汉"/></label>
      <label>类型<select name="type">${options(EVENT_TYPES)}</select></label>
      <label>状态<select name="status">${options(EVENT_STATUSES)}</select></label>
      <label>开始<input name="start" type="date" required/></label>
      <label>结束<input name="end" type="date" required/></label>
      <div class="row">
        <button class="btn primary" type="submit">添加节点</button>
        <button class="btn" type="button" id="export-timeline">导出时间线</button>
        <button class="btn" type="button" id="import-timeline">导入时间线</button>
        <input id="timeline-file" type="file" accept="application/json" hidden/>
      </div>
      <p id="timeline-msg" class="error"></p>
    </form>
    <table>
      <thead><tr><th>考试</th><th>身份</th><th>地点</th><th>类型</th><th>日期</th><th>状态</th><th></th></tr></thead>
      <tbody>${data.events
        .map(
          (event) => `<tr>
            <td>${esc(event.name)}</td><td>${esc(event.identity)}</td><td>${esc(event.place)}</td>
            <td>${esc(event.type)}</td><td>${esc(event.start)} 至 ${esc(event.end)}</td><td>${esc(event.status)}</td>
            <td><button class="btn danger" data-del-event="${event.id}">删除</button></td>
          </tr>`,
        )
        .join("")}</tbody>
    </table>`;
}

function planPage(data: AppData, arg: string, extra: string): string {
  const today = isoDate(new Date());
  const current = arg || today.slice(0, 7);
  const { year, month } = parseMonthKey(current);
  const focus = extra || today;
  const plan = monthPlan(data, year, month);
  const weeks = weeksInMonth(year, month);
  const weekStart = weekDates(focus)[0];
  const days = weekDates(focus);
  const monthTasks = data.tasks.filter((task) => inMonth(task.date, year, month));
  const doneHours = monthTasks.filter((task) => task.done).reduce((sum, task) => sum + task.minutes, 0) / 60;
  const target = plan.goals.reduce((sum, goal) => sum + goal.targetHours, 0);
  return `
    <h1>${year}年${month}月计划</h1>
    <p class="sub">行测、申论、面试的月目标会落到周和日。勾选日后，月课时和周完成率一起变。</p>
    <div class="row">
      <label>月份<input id="month-pick" type="month" value="${monthKey(year, month)}"/></label>
      <button class="btn" id="export-plan" type="button">导出本月计划</button>
      <button class="btn" id="import-plan" type="button">导入计划</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p id="plan-msg" class="error"></p>
    <section class="card">
      <h2>月目标</h2>
      <p class="muted">已完成 ${doneHours.toFixed(1)} / ${target} 小时</p>
      <form id="goals">
        ${plan.goals
          .map(
            (goal) => `<div class="grid">
              <strong>${goal.subject}</strong>
              <label>目标课时<input name="hours-${goal.subject}" type="number" min="0" step="0.5" value="${goal.targetHours}"/></label>
              <label>说明<input name="note-${goal.subject}" value="${esc(goal.note)}"/></label>
            </div>`,
          )
          .join("")}
        <div class="row">
          <button class="btn primary" type="submit">保存月目标</button>
          <button class="btn" type="button" id="split-week">把目标拆到本周工作日</button>
        </div>
      </form>
    </section>
    <section class="card">
      <h2>月历</h2>
      <p class="muted">粉点是行测，蓝点是申论，黄点是面试。点日期看当天任务。</p>
      ${calendar(data, year, month, focus)}
      <div class="row" style="margin-top:10px">${weeks
        .map(
          (start) =>
            `<button class="btn ${start === weekStart ? "primary" : ""}" data-week="${start}">${start.slice(5)} 那周</button>`,
        )
        .join("")}</div>
    </section>
    <section class="card">
      <h2>一周 · ${weekStart}</h2>
      <p class="muted">本周完成 ${rate(data.tasks.filter((task) => days.includes(task.date)))}</p>
      <div class="week">${days
        .map((date) => {
          const tasks = data.tasks.filter((task) => task.date === date);
          return `<div class="day">
            <button class="link" data-day="${date}">周${weekdayLabel(date)} ${date.slice(8)}</button>
            ${tasks
              .map(
                (task) => `<label class="task ${task.done ? "done" : ""}">
                  <input type="checkbox" data-task="${task.id}" ${task.done ? "checked" : ""}/>
                  ${esc(task.subject)} ${esc(task.module)} ${esc(task.title)} ${task.minutes}分钟
                </label>`,
              )
              .join("")}
          </div>`;
        })
        .join("")}</div>
    </section>
    <section class="card">
      <h2>${focus} 的任务</h2>
      <form id="task" class="grid">
        <input type="hidden" name="date" value="${focus}"/>
        <label>科目<select name="subject" id="task-subject">${SUBJECTS.map((subject) => `<option>${subject}</option>`).join("")}</select></label>
        <label>模块<select name="module" id="task-module">${MODULES.行测.map((item) => `<option>${item}</option>`).join("")}</select></label>
        <label>内容<input name="title" required placeholder="言语 20 题"/></label>
        <label>分钟<input name="minutes" type="number" min="10" value="40"/></label>
        <div class="row"><button class="btn primary">加到这一天</button></div>
      </form>
      ${dayTaskList(data, focus)}
    </section>`;
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
        <span class="${task.done ? "done" : ""}">${esc(task.subject)} / ${esc(task.module)} / ${esc(task.title)}</span>
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

function scorePage(data: AppData): string {
  const now = new Date();
  const monthScores = data.scores.filter((item) => inMonth(item.date, now.getFullYear(), now.getMonth() + 1));
  const averages = SUBJECTS.map((subject) => {
    const rows = monthScores.filter((item) => item.subject === subject && item.full > 0);
    const average = rows.length ? rows.reduce((sum, item) => sum + item.score / item.full, 0) / rows.length : 0;
    const latest = [...data.scores].filter((item) => item.subject === subject).sort((a, b) => b.date.localeCompare(a.date))[0];
    return { subject, average, latest };
  });
  return `
    <h1>模考和练习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <div class="panels">${averages
      .map(
        (item) => `<section class="card"><h2>${item.subject}</h2><div class="stat">${item.latest ? `${item.latest.score}/${item.latest.full}` : "—"}</div><p class="muted">最近一次 · 本月平均 ${item.average ? Math.round(item.average * 100) + "%" : "还没有"}</p></section>`,
      )
      .join("")}</div>
    <form id="score" class="card grid">
      <label>日期<input name="date" type="date" value="${isoDate(new Date())}" required/></label>
      <label>类型<select name="kind"><option>模考</option><option>练习</option></select></label>
      <label>科目<select name="subject" id="score-subject">${SUBJECTS.map((subject) => `<option>${subject}</option>`).join("")}</select></label>
      <label>模块<select name="module" id="score-module">${MODULES.行测.map((item) => `<option>${item}</option>`).join("")}</select></label>
      <label>得分<input name="score" type="number" min="0" step="0.1" required/></label>
      <label>满分<input name="full" type="number" min="1" step="0.1" value="100" required/></label>
      <label>用时（分钟）<input name="minutes" type="number" min="0" value="0"/></label>
      <div class="row"><button class="btn primary">记下这次</button></div>
    </form>
    <table>
      <thead><tr><th>日期</th><th>类型</th><th>科目</th><th>模块</th><th>分数</th><th></th></tr></thead>
      <tbody>${
        data.scores.length
          ? [...data.scores]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map(
                (item) => `<tr>
                  <td>${esc(item.date)}</td><td>${esc(item.kind)}</td><td>${esc(item.subject)}</td>
                  <td>${esc(item.module)}</td><td>${item.score}/${item.full}</td>
                  <td><button class="btn danger" data-del-score="${item.id}">删除</button></td>
                </tr>`,
              )
              .join("")
          : `<tr><td colspan="6" class="muted">还没有分数。</td></tr>`
      }</tbody>
    </table>`;
}

function boardPage(data: AppData): string {
  const bySubject = SUBJECTS.map((subject) => {
    const rows = data.scores.filter((item) => item.subject === subject).sort((a, b) => a.date.localeCompare(b.date));
    return { subject, rows };
  });
  const weak = weakness(data);
  const now = new Date();
  const tasks = data.tasks.filter((task) => inMonth(task.date, now.getFullYear(), now.getMonth() + 1));
  const done = tasks.filter((task) => task.done).length;
  return `
    <h1>学习效果</h1>
    <p class="sub">看分数变化，以及最近练习里相对低的模块。</p>
    <div class="card"><div class="stat">${tasks.length ? Math.round((done / tasks.length) * 100) : 0}%</div><div class="muted">本月任务完成率 ${done}/${tasks.length}</div></div>
    ${bySubject
      .map(
        (group) => `<section class="card"><h2>${group.subject}分数</h2>${
          group.rows.length ? lineChart(group.rows.map((item) => item.score / item.full), group.rows.map((item) => item.date.slice(5))) : `<p class="muted">还没有${group.subject}分数。</p>`
        }</section>`,
      )
      .join("")}
    <section class="card">
      <h2>相对低的模块</h2>
      ${
        weak.length
          ? `<ol>${weak
              .slice(0, 2)
              .map((item) => `<li>${esc(item.subject)} / ${esc(item.module)}：最近平均 ${Math.round(item.ratio * 100)}%</li>`)
              .join("")}</ol>${barChart(weak)}`
          : `<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>`
      }
    </section>`;
}

function lineChart(values: number[], labels: string[]): string {
  const w = 520;
  const h = 160;
  const padX = 28;
  const coords = values.map((value, index) => {
    const x = padX + (index * (w - padX * 2)) / Math.max(values.length - 1, 1);
    const y = 20 + (1 - value) * 110;
    return `${x},${y}`;
  });
  const dots = coords
    .map((point, index) => {
      const [x, y] = point.split(",");
      return `<circle cx="${x}" cy="${y}" r="3" fill="#1e3a5f"/><text x="${x}" y="152" text-anchor="middle" font-size="10" fill="#5c6b7a">${esc(labels[index] ?? "")}</text>`;
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
  if (page === "scores") bindScores(data);
}

function bindProfile(data: AppData): void {
  document.querySelector<HTMLFormElement>("#profile")!.onsubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const tracks = form.getAll("track").map(String);
    save({
      ...data,
      profile: {
        ...data.profile,
        name: String(form.get("name") ?? ""),
        gender: String(form.get("gender") ?? ""),
        politics: String(form.get("politics") ?? ""),
        undergradSchool: String(form.get("undergradSchool") ?? ""),
        undergradMajor: String(form.get("undergradMajor") ?? ""),
        gradSchool: String(form.get("gradSchool") ?? ""),
        gradMajor: String(form.get("gradMajor") ?? ""),
        gradYear: String(form.get("gradYear") ?? ""),
        hukou: String(form.get("hukou") ?? ""),
        english: String(form.get("english") ?? ""),
        cities: String(form.get("cities") ?? ""),
        tracks,
      },
    });
    paint();
  };
  document.querySelector<HTMLFormElement>("#resume")!.onsubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const file = form.get("image");
    let image = "";
    try {
      if (file instanceof File && file.size > 0) image = await compressImage(file);
      save({
        ...data,
        resume: [
          ...data.resume,
          {
            id: uid(),
            kind: String(form.get("kind")) as ResumeKind,
            time: String(form.get("time") ?? ""),
            title: String(form.get("title") ?? ""),
            detail: String(form.get("detail") ?? ""),
            image,
          },
        ],
      });
      paint();
    } catch (error) {
      const message = document.querySelector<HTMLElement>("#resume-msg");
      if (message) message.textContent = error instanceof Error ? error.message : "图片没有存上，换一张小一点的试试";
    }
  };
  document.querySelectorAll<HTMLButtonElement>("[data-del-resume]").forEach((button) => {
    button.onclick = () => {
      save({ ...data, resume: data.resume.filter((item) => item.id !== button.dataset.delResume) });
      paint();
    };
  });
}

function bindTimeline(data: AppData): void {
  document.querySelector<HTMLFormElement>("#event")!.onsubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    save({
      ...data,
      events: [
        ...data.events,
        {
          id: uid(),
          name: String(form.get("name") ?? ""),
          identity: String(form.get("identity") ?? ""),
          place: String(form.get("place") ?? ""),
          type: String(form.get("type")) as EventType,
          status: String(form.get("status")) as EventStatus,
          start: String(form.get("start") ?? ""),
          end: String(form.get("end") ?? ""),
        },
      ],
    });
    paint();
  };
  document.querySelectorAll<HTMLButtonElement>("[data-del-event]").forEach((button) => {
    button.onclick = () => {
      save({ ...data, events: data.events.filter((item) => item.id !== button.dataset.delEvent) });
      paint();
    };
  });
  document.querySelector<HTMLButtonElement>("#export-timeline")!.onclick = () =>
    download("时间线.json", exportTimeline(data));
  wireImport("#import-timeline", "#timeline-file", "#timeline-msg", data);
}

function bindPlan(data: AppData, arg: string, extra: string): void {
  const today = isoDate(new Date());
  const current = arg || today.slice(0, 7);
  const { year, month } = parseMonthKey(current);
  const focus = extra || today;
  document.querySelector<HTMLInputElement>("#month-pick")!.onchange = (event) => {
    location.hash = `plan/${(event.currentTarget as HTMLInputElement).value}`;
  };
  document.querySelectorAll<HTMLButtonElement>("[data-week]").forEach((button) => {
    button.onclick = () => {
      location.hash = `plan/${monthKey(year, month)}/${button.dataset.week}`;
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-day]").forEach((button) => {
    button.onclick = () => {
      location.hash = `plan/${monthKey(year, month)}/${button.dataset.day}`;
    };
  });
  const subject = document.querySelector<HTMLSelectElement>("#task-subject")!;
  const moduleSelect = document.querySelector<HTMLSelectElement>("#task-module")!;
  subject.onchange = () => fillModules(moduleSelect, subject.value as Subject);
  document.querySelector<HTMLFormElement>("#goals")!.onsubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const next = ensureMonth(data, year, month);
    save({
      ...next,
      months: next.months.map((item) =>
        item.year === year && item.month === month
          ? {
              ...item,
              goals: SUBJECTS.map((name) => ({
                subject: name,
                targetHours: Number(form.get(`hours-${name}`) ?? 0),
                note: String(form.get(`note-${name}`) ?? ""),
              })),
            }
          : item,
      ),
    });
    paint();
  };
  document.querySelector<HTMLButtonElement>("#split-week")!.onclick = () => {
    const next = ensureMonth(data, year, month);
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
    save({ ...next, tasks: [...next.tasks, ...created] });
    paint();
  };
  document.querySelector<HTMLFormElement>("#task")!.onsubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const subjectName = String(form.get("subject")) as Subject;
    save({
      ...ensureMonth(data, year, month),
      tasks: [
        ...data.tasks,
        {
          id: uid(),
          date: String(form.get("date")),
          subject: subjectName,
          module: String(form.get("module") ?? MODULES[subjectName][0]),
          title: String(form.get("title") ?? ""),
          minutes: Number(form.get("minutes") ?? 40),
          done: false,
        },
      ],
    });
    paint();
  };
  document.querySelectorAll<HTMLInputElement>("[data-task]").forEach((box) => {
    box.onchange = () => {
      save({
        ...data,
        tasks: data.tasks.map((task) => (task.id === box.dataset.task ? { ...task, done: box.checked } : task)),
      });
      paint();
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-del-task]").forEach((button) => {
    button.onclick = () => {
      save({ ...data, tasks: data.tasks.filter((task) => task.id !== button.dataset.delTask) });
      paint();
    };
  });
  document.querySelector<HTMLButtonElement>("#export-plan")!.onclick = () =>
    download(`计划-${monthKey(year, month)}.json`, exportPlan(data, year, month));
  wireImport("#import-plan", "#plan-file", "#plan-msg", data);
}

function bindScores(data: AppData): void {
  const subject = document.querySelector<HTMLSelectElement>("#score-subject")!;
  const moduleSelect = document.querySelector<HTMLSelectElement>("#score-module")!;
  subject.onchange = () => fillModules(moduleSelect, subject.value as Subject);
  document.querySelector<HTMLFormElement>("#score")!.onsubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const subjectName = String(form.get("subject")) as Subject;
    save({
      ...data,
      scores: [
        ...data.scores,
        {
          id: uid(),
          date: String(form.get("date")),
          kind: String(form.get("kind")) as ScoreKind,
          subject: subjectName,
          module: String(form.get("module") ?? ""),
          score: Number(form.get("score")),
          full: Number(form.get("full")),
          minutes: Number(form.get("minutes") ?? 0),
        },
      ],
    });
    paint();
  };
  document.querySelectorAll<HTMLButtonElement>("[data-del-score]").forEach((button) => {
    button.onclick = () => {
      save({ ...data, scores: data.scores.filter((item) => item.id !== button.dataset.delScore) });
      paint();
    };
  });
}

function fillModules(select: HTMLSelectElement, subject: Subject): void {
  select.innerHTML = MODULES[subject].map((item) => `<option>${item}</option>`).join("");
}

function download(filename: string, payload: unknown): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function wireImport(buttonId: string, fileId: string, messageId: string, data: AppData): void {
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
      save(importBundle(data, parsed));
      paint();
    } catch (error) {
      message.textContent = error instanceof Error ? error.message : "导入失败";
    }
  };
}

window.addEventListener("hashchange", paint);
paint();
