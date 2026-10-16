(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();function x(t){return String(t).padStart(2,"0")}function M(t){return`${t.getFullYear()}-${x(t.getMonth()+1)}-${x(t.getDate())}`}function L(t){const[n,e,s]=t.split("-").map(Number);return new Date(n,e-1,s)}function O(t,n){return`${t}-${x(n)}`}function J(t){const[n,e]=t.split("-").map(Number);return{year:n,month:e}}function K(t,n){return new Date(t,n,0).getDate()}function _(t){const n=L(t),e=(n.getDay()+6)%7;return n.setDate(n.getDate()-e),n}function W(t,n){const e=L(t);return e.setDate(e.getDate()+n),M(e)}function C(t){const n=M(_(t));return Array.from({length:7},(e,s)=>W(n,s))}function nt(t,n){`${t}${x(n)}`;const e=K(t,n),s=new Set,o=[];for(let r=1;r<=e;r+=1){const a=M(_(`${t}-${x(n)}-${x(r)}`));s.has(a)||(s.add(a),o.push(a))}return o}function F(t,n,e){const s=L(t);return s.getFullYear()===n&&s.getMonth()+1===e}function st(t){return"一二三四五六日"[(L(t).getDay()+6)%7]}function c(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}async function ot(t){const n=await createImageBitmap(t),e=Math.min(1,800/Math.max(n.width,n.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(n.width*e)),s.height=Math.max(1,Math.round(n.height*e));const o=s.getContext("2d");if(!o)throw new Error("无法处理这张图片");return o.drawImage(n,0,0,s.width,s.height),n.close(),s.toDataURL("image/jpeg",.72)}function S(t,n,e,s,o,r,a){return{id:crypto.randomUUID(),name:t,identity:n,place:e,start:s,end:o,type:r,status:a}}function P(){return{profile:{name:"",gender:"女",politics:"共青团员",undergradSchool:"中南财经政法大学",undergradMajor:"经济学",gradSchool:"中南财经政法大学",gradMajor:"数字经济",gradYear:"2027",hukou:"湖北黄冈",english:"CET-6 500",cities:"武汉",tracks:["国考","省考","事业编","选调"]},resume:[],events:[S("国考","应届公务员","考点在武汉","2026-10-15","2026-10-24","报名","已公布"),S("国考","应届公务员","考点在武汉","2026-11-01","2026-11-06","缴费","已公布"),S("国考","应届公务员","考点在武汉","2026-11-29","2026-11-29","笔试","已公布"),S("军队文职","文职人员","湖北考区在武汉","2026-11-03","2026-11-09","报名","对标去年"),S("军队文职","文职人员","湖北考区在武汉","2026-12-14","2026-12-14","笔试","对标去年"),S("湖北省考","应届公务员","主考区在武汉","2027-01-13","2027-01-19","报名","对标去年"),S("湖北省考","应届公务员","主考区在武汉","2027-03-14","2027-03-15","笔试","对标去年"),S("湖北普通选调","普通选调","考点在武汉","2027-01-13","2027-01-20","报名","对标去年"),S("湖北普通选调","普通选调","考点在武汉","2027-03-14","2027-03-14","笔试","对标去年"),S("湖北事业编","事业编制","考点含武汉","2027-02-03","2027-02-10","报名","对标去年"),S("湖北事业编","事业编制","考点含武汉","2027-03-28","2027-03-29","笔试","对标去年"),S("武汉事业编","事业编制","地点在武汉","2027-09-15","2027-09-22","报名","对标去年"),S("武汉事业编","事业编制","地点在武汉","2027-10-25","2027-10-25","笔试","对标去年")],months:[],tasks:[],scores:[]}}const E=["行测","申论","面试"],A={行测:["言语","数量","判断","资料","常识"],申论:["归纳概括","综合分析","提出对策","应用文","大作文"],面试:["综合分析","组织计划","应急应变","人际关系","岗位匹配"]},rt=["国考","省考","事业编","选调","国央企"],at=["教育","实习","奖项","技能"],lt=["应届公务员","普通选调","文职人员","事业编制","服务基层"],ct=["报名","缴费","笔试","面试"],it=["已公布","对标去年"],z="qiuzhi-v1";function dt(){const t=localStorage.getItem(z);if(!t){const e=P();return localStorage.setItem(z,JSON.stringify(e)),e}const n=JSON.parse(t);return{...P(),...n,profile:{...P().profile,...n.profile},resume:n.resume??[],events:n.events??[],months:n.months??[],tasks:n.tasks??[],scores:n.scores??[]}}function k(t){localStorage.setItem(z,JSON.stringify(t))}function T(){return crypto.randomUUID()}function Y(t,n,e){return t.months.find(s=>s.year===n&&s.month===e)??{year:n,month:e,goals:E.map(s=>({subject:s,targetHours:0,note:""}))}}function I(t,n,e){return t.months.some(s=>s.year===n&&s.month===e)?t:{...t,months:[...t.months,{year:n,month:e,goals:E.map(s=>({subject:s,targetHours:0,note:""}))}]}}function ut(t){return{kind:"qiuzhi-timeline",version:1,events:t.events}}function pt(t,n,e){const s=Y(t,n,e),o=`${n}-${String(e).padStart(2,"0")}`;return{kind:"qiuzhi-plan",version:1,year:n,month:e,goals:s.goals,tasks:t.tasks.filter(r=>r.date.startsWith(o)).map(({date:r,subject:a,module:u,title:l,minutes:p})=>({date:r,subject:a,module:u,title:l,minutes:p}))}}function mt(t,n){if(!n||typeof n!="object")throw new Error("文件不是求职系统导出的内容");const e=n;if(e.kind==="qiuzhi-timeline"&&e.version===1&&Array.isArray(e.events)){const s=e.events.map(o=>({...o,id:T()}));return{...t,events:[...t.events,...s]}}if(e.kind==="qiuzhi-plan"&&e.version===1){const s=I(t,e.year,e.month),o=s.months.map(a=>a.year===e.year&&a.month===e.month?{...a,goals:e.goals}:a),r=e.tasks.map(a=>({...a,id:T(),done:!1}));return{...s,months:o,tasks:[...s.tasks,...r]}}throw new Error("文件不是时间线或复习计划")}function R(t,n){return t*12+n}function ht(t){if(t.length===0)return'<p class="muted">还没有考试节点。</p>';const e=[...new Set(t.map(d=>d.start.slice(0,7)))].sort().map(d=>{const[g,$]=d.split("-").map(Number);return{year:g,month:$,days:new Date(g,$,0).getDate()}}),s=[];e.forEach((d,g)=>{if(g>0){const $=e[g-1];R(d.year,d.month)-R($.year,$.month)>1&&s.push({gap:!0})}s.push(d)});const o=132,r=28,a=108,u=o+s.reduce((d,g)=>d+("gap"in g?r:a),0)+16,l=[...new Set(t.map(d=>d.name))],p=46,i=28,h=i+l.length*p+36,b=[];let v=o;for(const d of s)"gap"in d?(b.push({kind:"gap",x:v,width:r}),v+=r):(b.push({kind:"month",...d,x:v,width:a}),v+=a);const f=d=>{const[g,$,q]=d.split("-").map(Number),N=b.find(j=>j.kind==="month"&&j.year===g&&j.month===$);return N?N.x+(q-1)/N.days*N.width:o},m=t.map(d=>{const g=i+l.indexOf(d.name)*p+8,$=f(d.start),q=Math.max(f(d.end)+4,$+3),j=d.type==="笔试"||d.type==="面试"?"#b23a3a":"#1e3a5f",H=d.status==="对标去年",B=q-$>36?d.type:"",et=B===""?`<text x="${q+4}" y="${g+14}" font-size="11" fill="${j}">${c(d.type)}</text>`:`<text x="${($+q)/2}" y="${g+13}" text-anchor="middle" font-size="11" fill="${H?j:"#fff"}">${c(B)}</text>`;return(H?`<rect x="${$}" y="${g}" width="${q-$}" height="18" rx="2" fill="none" stroke="${j}" stroke-dasharray="3 2"/>`:`<rect x="${$}" y="${g}" width="${q-$}" height="18" rx="2" fill="${j}"/>`)+et}).join(""),D=b.map(d=>{if(d.kind==="gap")return`<text x="${d.x+d.width/2}" y="${h-8}" text-anchor="middle" font-size="10" fill="#8b97a3">空档</text>`;const g=d.month===1||d.month===10?`${d.year}年${d.month}月`:`${d.month}月`;return`<text x="${d.x+d.width/2}" y="${h-8}" text-anchor="middle" font-size="12" fill="#3e4c59">${g}</text>`}).join(""),w=l.map((d,g)=>`<text x="0" y="${i+g*p+22}" font-size="13" fill="#1c2834">${c(d)}</text>`).join("");return`<svg class="chart" viewBox="0 0 ${u} ${h}" role="img" aria-label="岗位时间线">${w}${D}${m}</svg>`}const U=document.querySelector("#app");if(!U)throw new Error("缺少页面根节点");const ft=[["home","首页"],["profile","资料"],["timeline","时间线"],["plan","计划"],["scores","记分"],["board","学习"]];function gt(){return location.hash.replace("#","")||"home"}function y(){const t=dt(),[n,e="",s=""]=gt().split("/");U.innerHTML=`
    <header class="top">
      <div class="brand">${X()}RUO的求职系统</div>
      <nav class="nav">${ft.map(([o,r])=>`<button data-go="${o}" class="${n===o?"active":""}">${r}</button>`).join("")}</nav>
    </header>
    <main class="wrap">${bt(t,n,e,s)}</main>`,U.querySelectorAll("[data-go]").forEach(o=>{o.onclick=()=>{location.hash=o.dataset.go??"profile"}}),qt(t,n,e,s)}function X(){return'<svg class="bow" viewBox="0 0 22 16" aria-hidden="true"><path d="M11 8 C8 2 2 2 2 8 C2 14 8 14 11 8 C14 2 20 2 20 8 C20 14 14 14 11 8" fill="#8ec8ea"/><circle cx="11" cy="8" r="2" fill="#fff"/></svg>'}function bt(t,n,e,s){return n==="home"?$t(t):n==="timeline"?vt(t):n==="plan"?St(t,e,s):n==="scores"?jt(t):n==="board"?xt(t):yt(t)}function $t(t){const n=M(new Date),e=[...t.events].filter(l=>l.end>=n).sort((l,p)=>l.start.localeCompare(p.start))[0],s=C(n),o=t.tasks.filter(l=>s.includes(l.date)),r=[...t.scores].sort((l,p)=>l.date.localeCompare(p.date)).at(-1),a=t.resume.filter(l=>l.image),u=t.profile.name?`${t.profile.name}，今天也要加油！Offer来来来`:"今天也要加油！Offer来来来";return`
    <h1>${X()} ${c(u)}</h1>
    <p class="sub">${c(t.profile.gradSchool)} ${c(t.profile.gradMajor)} · ${c(t.profile.gradYear)}届</p>
    <div class="home-grid">
      <section class="card">
        <h2>下一场</h2>
        ${e?`<div class="stat">${c(e.name)} ${c(e.type)}</div><p class="muted">${c(e.start)} · ${c(e.place)} · ${c(e.identity)}</p><button class="btn" data-go="timeline">看时间线</button>`:'<p class="muted">时间线上还没有今天之后的考试。</p>'}
      </section>
      <section class="card">
        <h2>本周</h2>
        <div class="stat">${V(o)}</div>
        <p class="muted">任务完成</p>
        <button class="btn" data-go="plan">去日历</button>
      </section>
    </div>
    <div class="home-grid">
      <section class="card">
        <h2>最近一次分数</h2>
        ${r?`<div class="stat">${r.score}/${r.full}</div><p class="muted">${c(r.date)} ${c(r.subject)} ${c(r.module)} ${c(r.kind)}</p>${G([r.score/r.full],[r.date.slice(5)])}`:'<p class="muted">还没有分数。</p>'}
        <button class="btn" data-go="board">看学习面板</button>
      </section>
      <section class="card">
        <h2>奖项和证明</h2>
        ${a.length?`<div class="gallery">${a.map(l=>`<img src="${l.image}" alt="${c(l.title)}"/>`).join("")}</div>`:'<p class="muted">在资料页给奖项或证明加上图片后，会显示在这里。</p>'}
      </section>
    </div>`}function yt(t){const n=t.profile,e=(s,o,r)=>`<label>${o}<input name="${s}" value="${c(r)}"/></label>`;return`
    <h1>资料与简历</h1>
    <p class="sub">存在这台浏览器里。导出计划时不会带上姓名和简历。</p>
    <form id="profile" class="card grid">
      ${e("name","姓名",n.name)}
      ${e("gender","性别",n.gender)}
      ${e("politics","政治面貌",n.politics)}
      ${e("undergradSchool","本科院校",n.undergradSchool)}
      ${e("undergradMajor","本科专业",n.undergradMajor)}
      ${e("gradSchool","硕士院校",n.gradSchool)}
      ${e("gradMajor","硕士专业",n.gradMajor)}
      ${e("gradYear","毕业年份",n.gradYear)}
      ${e("hukou","户籍",n.hukou)}
      ${e("english","英语",n.english)}
      ${e("cities","目标城市",n.cities)}
      <label>求职方向
        <span class="checks">${rt.map(s=>`<label><input type="checkbox" name="track" value="${s}" ${n.tracks.includes(s)?"checked":""}/> ${s}</label>`).join("")}</span>
      </label>
      <div class="row"><button class="btn primary" type="submit">保存资料</button></div>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${at.map(s=>`<option>${s}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <label>奖项或证明图片<input name="image" type="file" accept="image/*"/></label>
        <div class="row"><button class="btn primary" type="submit">添加</button></div>
        <p id="resume-msg" class="error"></p>
      </form>
      <table>
        <thead><tr><th></th><th>类型</th><th>时间</th><th>标题</th><th>说明</th><th></th></tr></thead>
        <tbody>${t.resume.length?t.resume.map(s=>`<tr>
                    <td>${s.image?`<img class="thumb" src="${s.image}" alt=""/>`:""}</td>
                    <td>${c(s.kind)}</td><td>${c(s.time)}</td><td>${c(s.title)}</td><td>${c(s.detail)}</td>
                    <td><button class="btn danger" data-del-resume="${s.id}">删除</button></td>
                  </tr>`).join(""):'<tr><td colspan="6" class="muted">还没有简历条目。</td></tr>'}</tbody>
      </table>
    </section>`}function vt(t){const n=(e,s="")=>e.map(o=>`<option ${o===s?"selected":""}>${o}</option>`).join("");return`
    <h1>岗位时间线</h1>
    <p class="sub">只放你要考的节点。条的长短是天数，笔试为红色，对标去年为虚线。</p>
    <div class="card">${ht(t.events)}</div>
    <form id="event" class="card grid">
      <label>考试<input name="name" required placeholder="国考"/></label>
      <label>身份<select name="identity">${n(lt)}</select></label>
      <label>地点或考点<input name="place" placeholder="考点在武汉"/></label>
      <label>类型<select name="type">${n(ct)}</select></label>
      <label>状态<select name="status">${n(it)}</select></label>
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
      <tbody>${t.events.map(e=>`<tr>
            <td>${c(e.name)}</td><td>${c(e.identity)}</td><td>${c(e.place)}</td>
            <td>${c(e.type)}</td><td>${c(e.start)} 至 ${c(e.end)}</td><td>${c(e.status)}</td>
            <td><button class="btn danger" data-del-event="${e.id}">删除</button></td>
          </tr>`).join("")}</tbody>
    </table>`}function St(t,n,e){const s=M(new Date),o=n||s.slice(0,7),{year:r,month:a}=J(o),u=e||s,l=Y(t,r,a),p=nt(r,a),i=C(u)[0],h=C(u),v=t.tasks.filter(m=>F(m.date,r,a)).filter(m=>m.done).reduce((m,D)=>m+D.minutes,0)/60,f=l.goals.reduce((m,D)=>m+D.targetHours,0);return`
    <h1>${r}年${a}月计划</h1>
    <p class="sub">行测、申论、面试的月目标会落到周和日。勾选日后，月课时和周完成率一起变。</p>
    <div class="row">
      <label>月份<input id="month-pick" type="month" value="${O(r,a)}"/></label>
      <button class="btn" id="export-plan" type="button">导出本月计划</button>
      <button class="btn" id="import-plan" type="button">导入计划</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p id="plan-msg" class="error"></p>
    <section class="card">
      <h2>月目标</h2>
      <p class="muted">已完成 ${v.toFixed(1)} / ${f} 小时</p>
      <form id="goals">
        ${l.goals.map(m=>`<div class="grid">
              <strong>${m.subject}</strong>
              <label>目标课时<input name="hours-${m.subject}" type="number" min="0" step="0.5" value="${m.targetHours}"/></label>
              <label>说明<input name="note-${m.subject}" value="${c(m.note)}"/></label>
            </div>`).join("")}
        <div class="row">
          <button class="btn primary" type="submit">保存月目标</button>
          <button class="btn" type="button" id="split-week">把目标拆到本周工作日</button>
        </div>
      </form>
    </section>
    <section class="card">
      <h2>月历</h2>
      <p class="muted">粉点是行测，蓝点是申论，黄点是面试。点日期看当天任务。</p>
      ${kt(t,r,a,u)}
      <div class="row" style="margin-top:10px">${p.map(m=>`<button class="btn ${m===i?"primary":""}" data-week="${m}">${m.slice(5)} 那周</button>`).join("")}</div>
    </section>
    <section class="card">
      <h2>一周 · ${i}</h2>
      <p class="muted">本周完成 ${V(t.tasks.filter(m=>h.includes(m.date)))}</p>
      <div class="week">${h.map(m=>{const D=t.tasks.filter(w=>w.date===m);return`<div class="day">
            <button class="link" data-day="${m}">周${st(m)} ${m.slice(8)}</button>
            ${D.map(w=>`<label class="task ${w.done?"done":""}">
                  <input type="checkbox" data-task="${w.id}" ${w.done?"checked":""}/>
                  ${c(w.subject)} ${c(w.module)} ${c(w.title)} ${w.minutes}分钟
                </label>`).join("")}
          </div>`}).join("")}</div>
    </section>
    <section class="card">
      <h2>${u} 的任务</h2>
      <form id="task" class="grid">
        <input type="hidden" name="date" value="${u}"/>
        <label>科目<select name="subject" id="task-subject">${E.map(m=>`<option>${m}</option>`).join("")}</select></label>
        <label>模块<select name="module" id="task-module">${A.行测.map(m=>`<option>${m}</option>`).join("")}</select></label>
        <label>内容<input name="title" required placeholder="言语 20 题"/></label>
        <label>分钟<input name="minutes" type="number" min="10" value="40"/></label>
        <div class="row"><button class="btn primary">加到这一天</button></div>
      </form>
      ${wt(t,u)}
    </section>`}function kt(t,n,e,s){const o=(new Date(n,e-1,1).getDay()+6)%7,r=M(new Date),a=Array.from({length:o},()=>'<div class="cal empty"></div>').join(""),u=Array.from({length:K(n,e)},(l,p)=>{const i=p+1,h=`${n}-${x(e)}-${x(i)}`,b=[...new Set(t.tasks.filter(f=>f.date===h).map(f=>f.subject))];return`<button class="cal ${[h===s?"selected":"",h===r?"today":""].filter(Boolean).join(" ")}" data-day="${h}"><span>${i}</span><span class="dots">${b.map(f=>`<i class="dot ${f}"></i>`).join("")}</span></button>`}).join("");return`<div class="cal-head">${"一二三四五六日".split("").map(l=>`<span>周${l}</span>`).join("")}</div><div class="cal-grid">${a}${u}</div>`}function wt(t,n){const e=t.tasks.filter(s=>s.date===n);return e.length?e.map(s=>`<div class="row">
        <span class="${s.done?"done":""}">${c(s.subject)} / ${c(s.module)} / ${c(s.title)}</span>
        <button class="btn danger" data-del-task="${s.id}">删除</button>
      </div>`).join(""):'<p class="muted">这一天还没有任务。</p>'}function V(t){return t.length?`${t.filter(e=>e.done).length}/${t.length}`:"还没有任务"}function jt(t){const n=new Date,e=t.scores.filter(o=>F(o.date,n.getFullYear(),n.getMonth()+1));return`
    <h1>模考和练习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <div class="panels">${E.map(o=>{const r=e.filter(l=>l.subject===o&&l.full>0),a=r.length?r.reduce((l,p)=>l+p.score/p.full,0)/r.length:0,u=[...t.scores].filter(l=>l.subject===o).sort((l,p)=>p.date.localeCompare(l.date))[0];return{subject:o,average:a,latest:u}}).map(o=>`<section class="card"><h2>${o.subject}</h2><div class="stat">${o.latest?`${o.latest.score}/${o.latest.full}`:"—"}</div><p class="muted">最近一次 · 本月平均 ${o.average?Math.round(o.average*100)+"%":"还没有"}</p></section>`).join("")}</div>
    <form id="score" class="card grid">
      <label>日期<input name="date" type="date" value="${M(new Date)}" required/></label>
      <label>类型<select name="kind"><option>模考</option><option>练习</option></select></label>
      <label>科目<select name="subject" id="score-subject">${E.map(o=>`<option>${o}</option>`).join("")}</select></label>
      <label>模块<select name="module" id="score-module">${A.行测.map(o=>`<option>${o}</option>`).join("")}</select></label>
      <label>得分<input name="score" type="number" min="0" step="0.1" required/></label>
      <label>满分<input name="full" type="number" min="1" step="0.1" value="100" required/></label>
      <label>用时（分钟）<input name="minutes" type="number" min="0" value="0"/></label>
      <div class="row"><button class="btn primary">记下这次</button></div>
    </form>
    <table>
      <thead><tr><th>日期</th><th>类型</th><th>科目</th><th>模块</th><th>分数</th><th></th></tr></thead>
      <tbody>${t.scores.length?[...t.scores].sort((o,r)=>r.date.localeCompare(o.date)).map(o=>`<tr>
                  <td>${c(o.date)}</td><td>${c(o.kind)}</td><td>${c(o.subject)}</td>
                  <td>${c(o.module)}</td><td>${o.score}/${o.full}</td>
                  <td><button class="btn danger" data-del-score="${o.id}">删除</button></td>
                </tr>`).join(""):'<tr><td colspan="6" class="muted">还没有分数。</td></tr>'}</tbody>
    </table>`}function xt(t){const n=E.map(a=>{const u=t.scores.filter(l=>l.subject===a).sort((l,p)=>l.date.localeCompare(p.date));return{subject:a,rows:u}}),e=Dt(t),s=new Date,o=t.tasks.filter(a=>F(a.date,s.getFullYear(),s.getMonth()+1)),r=o.filter(a=>a.done).length;return`
    <h1>学习效果</h1>
    <p class="sub">看分数变化，以及最近练习里相对低的模块。</p>
    <div class="card"><div class="stat">${o.length?Math.round(r/o.length*100):0}%</div><div class="muted">本月任务完成率 ${r}/${o.length}</div></div>
    ${n.map(a=>`<section class="card"><h2>${a.subject}分数</h2>${a.rows.length?G(a.rows.map(u=>u.score/u.full),a.rows.map(u=>u.date.slice(5))):`<p class="muted">还没有${a.subject}分数。</p>`}</section>`).join("")}
    <section class="card">
      <h2>相对低的模块</h2>
      ${e.length?`<ol>${e.slice(0,2).map(a=>`<li>${c(a.subject)} / ${c(a.module)}：最近平均 ${Math.round(a.ratio*100)}%</li>`).join("")}</ol>${Mt(e)}`:'<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>'}
    </section>`}function G(t,n){const r=t.map((u,l)=>{const p=28+l*464/Math.max(t.length-1,1),i=20+(1-u)*110;return`${p},${i}`}),a=r.map((u,l)=>{const[p,i]=u.split(",");return`<circle cx="${p}" cy="${i}" r="3" fill="#1e3a5f"/><text x="${p}" y="152" text-anchor="middle" font-size="10" fill="#5c6b7a">${c(n[l]??"")}</text>`}).join("");return`<svg viewBox="0 0 520 160" class="chart" role="img" aria-label="分数折线"><polyline fill="none" stroke="#1e3a5f" stroke-width="2" points="${r.join(" ")}"/>${a}</svg>`}function Mt(t){const e=t.length*36+10,s=t.map((o,r)=>{const a=10+r*36,u=Math.max(4,o.ratio*280);return`<text x="0" y="${a+14}" font-size="12" fill="#1c2834">${c(o.module)}</text>
        <rect x="90" y="${a}" width="${u}" height="16" fill="${r<2?"#b23a3a":"#1e3a5f"}"/>
        <text x="${96+u}" y="${a+13}" font-size="12" fill="#5c6b7a">${Math.round(o.ratio*100)}%</text>`}).join("");return`<svg viewBox="0 0 420 ${e}" class="chart" role="img" aria-label="模块正确率">${s}</svg>`}function Dt(t){const n=new Map;for(const e of t.scores){if(!e.module||e.full<=0)continue;const s=`${e.subject}	${e.module}`,o=n.get(s)??[];o.push(e.score/e.full),n.set(s,o)}return[...n.entries()].map(([e,s])=>{const[o,r]=e.split("	"),a=s.slice(-3),u=a.reduce((l,p)=>l+p,0)/a.length;return{subject:o,module:r,ratio:u}}).sort((e,s)=>e.ratio-s.ratio)}function qt(t,n,e,s){n==="profile"&&Et(t),n==="timeline"&&Tt(t),n==="plan"&&Nt(t,e,s),n==="scores"&&At(t)}function Et(t){document.querySelector("#profile").onsubmit=n=>{n.preventDefault();const e=new FormData(n.currentTarget),s=e.getAll("track").map(String);k({...t,profile:{...t.profile,name:String(e.get("name")??""),gender:String(e.get("gender")??""),politics:String(e.get("politics")??""),undergradSchool:String(e.get("undergradSchool")??""),undergradMajor:String(e.get("undergradMajor")??""),gradSchool:String(e.get("gradSchool")??""),gradMajor:String(e.get("gradMajor")??""),gradYear:String(e.get("gradYear")??""),hukou:String(e.get("hukou")??""),english:String(e.get("english")??""),cities:String(e.get("cities")??""),tracks:s}}),y()},document.querySelector("#resume").onsubmit=async n=>{n.preventDefault();const e=new FormData(n.currentTarget),s=e.get("image");let o="";try{s instanceof File&&s.size>0&&(o=await ot(s)),k({...t,resume:[...t.resume,{id:T(),kind:String(e.get("kind")),time:String(e.get("time")??""),title:String(e.get("title")??""),detail:String(e.get("detail")??""),image:o}]}),y()}catch(r){const a=document.querySelector("#resume-msg");a&&(a.textContent=r instanceof Error?r.message:"图片没有存上，换一张小一点的试试")}},document.querySelectorAll("[data-del-resume]").forEach(n=>{n.onclick=()=>{k({...t,resume:t.resume.filter(e=>e.id!==n.dataset.delResume)}),y()}})}function Tt(t){document.querySelector("#event").onsubmit=n=>{n.preventDefault();const e=new FormData(n.currentTarget);k({...t,events:[...t.events,{id:T(),name:String(e.get("name")??""),identity:String(e.get("identity")??""),place:String(e.get("place")??""),type:String(e.get("type")),status:String(e.get("status")),start:String(e.get("start")??""),end:String(e.get("end")??"")}]}),y()},document.querySelectorAll("[data-del-event]").forEach(n=>{n.onclick=()=>{k({...t,events:t.events.filter(e=>e.id!==n.dataset.delEvent)}),y()}}),document.querySelector("#export-timeline").onclick=()=>Z("时间线.json",ut(t)),tt("#import-timeline","#timeline-file","#timeline-msg",t)}function Nt(t,n,e){const s=M(new Date),o=n||s.slice(0,7),{year:r,month:a}=J(o),u=e||s;document.querySelector("#month-pick").onchange=i=>{location.hash=`plan/${i.currentTarget.value}`},document.querySelectorAll("[data-week]").forEach(i=>{i.onclick=()=>{location.hash=`plan/${O(r,a)}/${i.dataset.week}`}}),document.querySelectorAll("[data-day]").forEach(i=>{i.onclick=()=>{location.hash=`plan/${O(r,a)}/${i.dataset.day}`}});const l=document.querySelector("#task-subject"),p=document.querySelector("#task-module");l.onchange=()=>Q(p,l.value),document.querySelector("#goals").onsubmit=i=>{i.preventDefault();const h=new FormData(i.currentTarget),b=I(t,r,a);k({...b,months:b.months.map(v=>v.year===r&&v.month===a?{...v,goals:E.map(f=>({subject:f,targetHours:Number(h.get(`hours-${f}`)??0),note:String(h.get(`note-${f}`)??"")}))}:v)}),y()},document.querySelector("#split-week").onclick=()=>{const i=I(t,r,a),h=Y(i,r,a),b=[0,1,2,3,4].map(f=>W(C(u)[0],f)),v=h.goals.filter(f=>f.targetHours>0).flatMap(f=>b.map(m=>({id:T(),date:m,subject:f.subject,module:A[f.subject][0],title:f.note||`${f.subject}练习`,minutes:Math.max(20,Math.round(f.targetHours*60/4/b.length)),done:!1})));k({...i,tasks:[...i.tasks,...v]}),y()},document.querySelector("#task").onsubmit=i=>{i.preventDefault();const h=new FormData(i.currentTarget),b=String(h.get("subject"));k({...I(t,r,a),tasks:[...t.tasks,{id:T(),date:String(h.get("date")),subject:b,module:String(h.get("module")??A[b][0]),title:String(h.get("title")??""),minutes:Number(h.get("minutes")??40),done:!1}]}),y()},document.querySelectorAll("[data-task]").forEach(i=>{i.onchange=()=>{k({...t,tasks:t.tasks.map(h=>h.id===i.dataset.task?{...h,done:i.checked}:h)}),y()}}),document.querySelectorAll("[data-del-task]").forEach(i=>{i.onclick=()=>{k({...t,tasks:t.tasks.filter(h=>h.id!==i.dataset.delTask)}),y()}}),document.querySelector("#export-plan").onclick=()=>Z(`计划-${O(r,a)}.json`,pt(t,r,a)),tt("#import-plan","#plan-file","#plan-msg",t)}function At(t){const n=document.querySelector("#score-subject"),e=document.querySelector("#score-module");n.onchange=()=>Q(e,n.value),document.querySelector("#score").onsubmit=s=>{s.preventDefault();const o=new FormData(s.currentTarget),r=String(o.get("subject"));k({...t,scores:[...t.scores,{id:T(),date:String(o.get("date")),kind:String(o.get("kind")),subject:r,module:String(o.get("module")??""),score:Number(o.get("score")),full:Number(o.get("full")),minutes:Number(o.get("minutes")??0)}]}),y()},document.querySelectorAll("[data-del-score]").forEach(s=>{s.onclick=()=>{k({...t,scores:t.scores.filter(o=>o.id!==s.dataset.delScore)}),y()}})}function Q(t,n){t.innerHTML=A[n].map(e=>`<option>${e}</option>`).join("")}function Z(t,n){const e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(e),s.download=t,s.click(),URL.revokeObjectURL(s.href)}function tt(t,n,e,s){const o=document.querySelector(t),r=document.querySelector(n),a=document.querySelector(e);!o||!r||!a||(o.onclick=()=>r.click(),r.onchange=async()=>{var l;const u=(l=r.files)==null?void 0:l[0];if(u)try{const p=JSON.parse(await u.text());k(mt(s,p)),y()}catch(p){a.textContent=p instanceof Error?p.message:"导入失败"}})}window.addEventListener("hashchange",y);y();
