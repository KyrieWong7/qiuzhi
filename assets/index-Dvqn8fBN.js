(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();function N(e){return String(e).padStart(2,"0")}function D(e){return`${e.getFullYear()}-${N(e.getMonth()+1)}-${N(e.getDate())}`}function z(e){const[n,t,s]=e.split("-").map(Number);return new Date(n,t-1,s)}function C(e,n){return`${e}-${N(n)}`}function K(e){const[n,t]=e.split("-").map(Number);return{year:n,month:t}}function Z(e,n){return new Date(e,n,0).getDate()}function tt(e){const n=z(e),t=(n.getDay()+6)%7;return n.setDate(n.getDate()-t),n}function J(e,n){const t=z(e);return t.setDate(t.getDate()+n),D(t)}function U(e){const n=D(tt(e));return Array.from({length:7},(t,s)=>J(n,s))}function F(e,n,t){const s=z(e);return s.getFullYear()===n&&s.getMonth()+1===t}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}async function et(e){const n=await createImageBitmap(e),t=Math.min(1,800/Math.max(n.width,n.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(n.width*t)),s.height=Math.max(1,Math.round(n.height*t));const o=s.getContext("2d");if(!o)throw new Error("无法处理这张图片");return o.drawImage(n,0,0,s.width,s.height),n.close(),s.toDataURL("image/jpeg",.72)}function k(e,n,t,s,o,r,a){return{id:crypto.randomUUID(),name:e,identity:n,place:t,start:s,end:o,type:r,status:a}}function L(){return{profile:{name:"",gender:"女",politics:"共青团员",undergradSchool:"中南财经政法大学",undergradMajor:"经济学",gradSchool:"中南财经政法大学",gradMajor:"数字经济",gradYear:"2027",hukou:"湖北黄冈",english:"CET-6 500",cities:"武汉",tracks:["国考","省考","事业编","选调"]},resume:[],events:[k("国考","应届公务员","考点在武汉","2026-10-15","2026-10-24","报名","已公布"),k("国考","应届公务员","考点在武汉","2026-11-01","2026-11-06","缴费","已公布"),k("国考","应届公务员","考点在武汉","2026-11-29","2026-11-29","笔试","已公布"),k("军队文职","文职人员","湖北考区在武汉","2026-11-03","2026-11-09","报名","对标去年"),k("军队文职","文职人员","湖北考区在武汉","2026-12-14","2026-12-14","笔试","对标去年"),k("湖北省考","应届公务员","主考区在武汉","2027-01-13","2027-01-19","报名","对标去年"),k("湖北省考","应届公务员","主考区在武汉","2027-03-14","2027-03-15","笔试","对标去年"),k("湖北普通选调","普通选调","考点在武汉","2027-01-13","2027-01-20","报名","对标去年"),k("湖北普通选调","普通选调","考点在武汉","2027-03-14","2027-03-14","笔试","对标去年"),k("湖北事业编","事业编制","考点含武汉","2027-02-03","2027-02-10","报名","对标去年"),k("湖北事业编","事业编制","考点含武汉","2027-03-28","2027-03-29","笔试","对标去年"),k("武汉事业编","事业编制","地点在武汉","2027-09-15","2027-09-22","报名","对标去年"),k("武汉事业编","事业编制","地点在武汉","2027-10-25","2027-10-25","笔试","对标去年")],months:[],tasks:[],scores:[]}}const A=["行测","申论","面试"],q={行测:["言语","数量","判断","资料","常识"],申论:["归纳概括","综合分析","提出对策","应用文","大作文"],面试:["综合分析","组织计划","应急应变","人际关系","岗位匹配"]},nt=["国考","省考","事业编","选调","国央企"],st=["教育","实习","奖项","技能"],ot=["应届公务员","普通选调","文职人员","事业编制","服务基层"],rt=["报名","缴费","笔试","面试"],at=["已公布","对标去年"],I="qiuzhi-v1";function ct(){const e=localStorage.getItem(I);if(!e){const t=L();return localStorage.setItem(I,JSON.stringify(t)),t}const n=JSON.parse(e);return{...L(),...n,profile:{...L().profile,...n.profile},resume:n.resume??[],events:n.events??[],months:n.months??[],tasks:n.tasks??[],scores:n.scores??[]}}function v(e){localStorage.setItem(I,JSON.stringify(e))}function E(){return crypto.randomUUID()}function H(e,n,t){return e.months.find(s=>s.year===n&&s.month===t)??{year:n,month:t,goals:A.map(s=>({subject:s,targetHours:0,note:""}))}}function O(e,n,t){return e.months.some(s=>s.year===n&&s.month===t)?e:{...e,months:[...e.months,{year:n,month:t,goals:A.map(s=>({subject:s,targetHours:0,note:""}))}]}}function it(e){return{kind:"qiuzhi-timeline",version:1,events:e.events}}function lt(e,n,t){const s=H(e,n,t),o=`${n}-${String(t).padStart(2,"0")}`;return{kind:"qiuzhi-plan",version:1,year:n,month:t,goals:s.goals,tasks:e.tasks.filter(r=>r.date.startsWith(o)).map(({date:r,subject:a,module:l,title:i,minutes:u})=>({date:r,subject:a,module:l,title:i,minutes:u}))}}function dt(e,n){if(!n||typeof n!="object")throw new Error("文件不是求职系统导出的内容");const t=n;if(t.kind==="qiuzhi-timeline"&&t.version===1&&Array.isArray(t.events)){const s=t.events.map(o=>({...o,id:E()}));return{...e,events:[...e.events,...s]}}if(t.kind==="qiuzhi-plan"&&t.version===1){const s=O(e,t.year,t.month),o=s.months.map(a=>a.year===t.year&&a.month===t.month?{...a,goals:t.goals}:a),r=t.tasks.map(a=>({...a,id:E(),done:!1}));return{...s,months:o,tasks:[...s.tasks,...r]}}throw new Error("文件不是时间线或复习计划")}function R(e,n){return e*12+n}function ut(e){if(e.length===0)return'<p class="muted">还没有考试节点。</p>';const t=[...new Set(e.map(d=>d.start.slice(0,7)))].sort().map(d=>{const[m,b]=d.split("-").map(Number);return{year:m,month:b,days:new Date(m,b,0).getDate()}}),s=[];t.forEach((d,m)=>{if(m>0){const b=t[m-1];R(d.year,d.month)-R(b.year,b.month)>1&&s.push({gap:!0})}s.push(d)});const o=132,r=28,a=108,l=o+s.reduce((d,m)=>d+("gap"in m?r:a),0)+16,i=[...new Set(e.map(d=>d.name))],u=46,f=28,y=f+i.length*u+36,g=[];let S=o;for(const d of s)"gap"in d?(g.push({kind:"gap",x:S,width:r}),S+=r):(g.push({kind:"month",...d,x:S,width:a}),S+=a);const c=d=>{const[m,b,M]=d.split("-").map(Number),T=g.find(x=>x.kind==="month"&&x.year===m&&x.month===b);return T?T.x+(M-1)/T.days*T.width:o},h=e.map(d=>{const m=f+i.indexOf(d.name)*u+8,b=c(d.start),M=Math.max(c(d.end)+4,b+3),x=d.type==="笔试"||d.type==="面试"?"#b23a3a":"#1e3a5f",Y=d.status==="对标去年",B=M-b>36?d.type:"",Q=B===""?`<text x="${M+4}" y="${m+14}" font-size="11" fill="${x}">${p(d.type)}</text>`:`<text x="${(b+M)/2}" y="${m+13}" text-anchor="middle" font-size="11" fill="${Y?x:"#fff"}">${p(B)}</text>`;return(Y?`<rect x="${b}" y="${m}" width="${M-b}" height="18" rx="2" fill="none" stroke="${x}" stroke-dasharray="3 2"/>`:`<rect x="${b}" y="${m}" width="${M-b}" height="18" rx="2" fill="${x}"/>`)+Q}).join(""),w=g.map(d=>{if(d.kind==="gap")return`<text x="${d.x+d.width/2}" y="${y-8}" text-anchor="middle" font-size="10" fill="#8b97a3">空档</text>`;const m=d.month===1||d.month===10?`${d.year}年${d.month}月`:`${d.month}月`;return`<text x="${d.x+d.width/2}" y="${y-8}" text-anchor="middle" font-size="12" fill="#3e4c59">${m}</text>`}).join(""),j=i.map((d,m)=>`<text x="0" y="${f+m*u+22}" font-size="13" fill="#1c2834">${p(d)}</text>`).join("");return`<svg class="chart" viewBox="0 0 ${l} ${y}" role="img" aria-label="岗位时间线">${j}${w}${h}</svg>`}const P=document.querySelector("#app");if(!P)throw new Error("缺少页面根节点");const pt=[["home","首页"],["profile","资料"],["timeline","时间线"],["plan","计划"],["scores","记分"],["board","学习"]];function mt(){return location.hash.replace("#","")||"home"}function $(){const e=ct(),[n,t="",s=""]=mt().split("/");P.innerHTML=`
    <header class="top">
      <div class="brand">${_()}RUO的求职系统</div>
      <nav class="nav">${pt.map(([o,r])=>`<button data-go="${o}" class="${n===o?"active":""}">${r}</button>`).join("")}</nav>
    </header>
    <main class="wrap">${ht(e,n,t,s)}</main>`,P.querySelectorAll("[data-go]").forEach(o=>{o.onclick=()=>{location.hash=o.dataset.go??"profile"}}),xt(e,n,t,s)}function _(){return'<svg class="bow" viewBox="0 0 22 16" aria-hidden="true"><path d="M11 8 C8 2 2 2 2 8 C2 14 8 14 11 8 C14 2 20 2 20 8 C20 14 14 14 11 8" fill="#8ec8ea"/><circle cx="11" cy="8" r="2" fill="#fff"/></svg>'}function ht(e,n,t,s){return n==="home"?ft(e):n==="timeline"?bt(e):n==="plan"?$t(e,t,s):n==="scores"?vt(e):n==="board"?St(e):gt(e)}function ft(e){const n=D(new Date),t=[...e.events].filter(i=>i.end>=n).sort((i,u)=>i.start.localeCompare(u.start))[0],s=U(n),o=e.tasks.filter(i=>s.includes(i.date)),r=[...e.scores].sort((i,u)=>i.date.localeCompare(u.date)).at(-1),a=e.resume.filter(i=>i.image),l=e.profile.name?`${e.profile.name}，今天也要加油！Offer来来来`:"今天也要加油！Offer来来来";return`
    <h1>${_()} ${p(l)}</h1>
    <p class="sub">${p(e.profile.gradSchool)} ${p(e.profile.gradMajor)} · ${p(e.profile.gradYear)}届</p>
    <div class="home-grid">
      <section class="card">
        <h2>下一场</h2>
        ${t?`<div class="stat">${p(t.name)} ${p(t.type)}</div><p class="muted">${p(t.start)} · ${p(t.place)} · ${p(t.identity)}</p><button class="btn" data-go="timeline">看时间线</button>`:'<p class="muted">时间线上还没有今天之后的考试。</p>'}
      </section>
      <section class="card">
        <h2>本周</h2>
        <div class="stat">${W(o)}</div>
        <p class="muted">任务完成</p>
        <button class="btn" data-go="plan">去日历</button>
      </section>
    </div>
    <div class="home-grid">
      <section class="card">
        <h2>最近一次分数</h2>
        ${r?`<div class="stat">${r.score}/${r.full}</div><p class="muted">${p(r.date)} ${p(r.subject)} ${p(r.module)} ${p(r.kind)}</p>${X([r.score/r.full],[r.date.slice(5)])}`:'<p class="muted">还没有分数。</p>'}
        <button class="btn" data-go="board">看学习面板</button>
      </section>
      <section class="card">
        <h2>奖项和证明</h2>
        ${a.length?`<div class="gallery">${a.map(i=>`<img src="${i.image}" alt="${p(i.title)}"/>`).join("")}</div>`:'<p class="muted">在资料页给奖项或证明加上图片后，会显示在这里。</p>'}
      </section>
    </div>`}function gt(e){const n=e.profile,t=(s,o,r)=>`<label>${o}<input name="${s}" value="${p(r)}"/></label>`;return`
    <h1>资料与简历</h1>
    <p class="sub">存在这台浏览器里。导出计划时不会带上姓名和简历。</p>
    <form id="profile" class="card grid">
      ${t("name","姓名",n.name)}
      ${t("gender","性别",n.gender)}
      ${t("politics","政治面貌",n.politics)}
      ${t("undergradSchool","本科院校",n.undergradSchool)}
      ${t("undergradMajor","本科专业",n.undergradMajor)}
      ${t("gradSchool","硕士院校",n.gradSchool)}
      ${t("gradMajor","硕士专业",n.gradMajor)}
      ${t("gradYear","毕业年份",n.gradYear)}
      ${t("hukou","户籍",n.hukou)}
      ${t("english","英语",n.english)}
      ${t("cities","目标城市",n.cities)}
      <label>求职方向
        <span class="checks">${nt.map(s=>`<label><input type="checkbox" name="track" value="${s}" ${n.tracks.includes(s)?"checked":""}/> ${s}</label>`).join("")}</span>
      </label>
      <div class="row"><button class="btn primary" type="submit">保存资料</button></div>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${st.map(s=>`<option>${s}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <label>奖项或证明图片<input name="image" type="file" accept="image/*"/></label>
        <div class="row"><button class="btn primary" type="submit">添加</button></div>
        <p id="resume-msg" class="error"></p>
      </form>
      <table>
        <thead><tr><th></th><th>类型</th><th>时间</th><th>标题</th><th>说明</th><th></th></tr></thead>
        <tbody>${e.resume.length?e.resume.map(s=>`<tr>
                    <td>${s.image?`<img class="thumb" src="${s.image}" alt=""/>`:""}</td>
                    <td>${p(s.kind)}</td><td>${p(s.time)}</td><td>${p(s.title)}</td><td>${p(s.detail)}</td>
                    <td><button class="btn danger" data-del-resume="${s.id}">删除</button></td>
                  </tr>`).join(""):'<tr><td colspan="6" class="muted">还没有简历条目。</td></tr>'}</tbody>
      </table>
    </section>`}function bt(e){const n=(t,s="")=>t.map(o=>`<option ${o===s?"selected":""}>${o}</option>`).join("");return`
    <h1>岗位时间线</h1>
    <p class="sub">只放你要考的节点。条的长短是天数，笔试为红色，对标去年为虚线。</p>
    <div class="card">${ut(e.events)}</div>
    <form id="event" class="card grid">
      <label>考试<input name="name" required placeholder="国考"/></label>
      <label>身份<select name="identity">${n(ot)}</select></label>
      <label>地点或考点<input name="place" placeholder="考点在武汉"/></label>
      <label>类型<select name="type">${n(rt)}</select></label>
      <label>状态<select name="status">${n(at)}</select></label>
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
      <tbody>${e.events.map(t=>`<tr>
            <td>${p(t.name)}</td><td>${p(t.identity)}</td><td>${p(t.place)}</td>
            <td>${p(t.type)}</td><td>${p(t.start)} 至 ${p(t.end)}</td><td>${p(t.status)}</td>
            <td><button class="btn danger" data-del-event="${t.id}">删除</button></td>
          </tr>`).join("")}</tbody>
    </table>`}function $t(e,n,t){const s=D(new Date),o=n||s.slice(0,7),{year:r,month:a}=K(o),l=t||s,i=H(e,r,a),u=U(l),y=e.tasks.filter(c=>F(c.date,r,a)).filter(c=>c.done).reduce((c,h)=>c+h.minutes,0)/60,g=i.goals.reduce((c,h)=>c+h.targetHours,0),S=W(e.tasks.filter(c=>u.includes(c.date)));return`
    <div class="row">
      <h1>${r}年${a}月</h1>
      <label>月份<input id="month-pick" type="month" value="${C(r,a)}"/></label>
      <button class="btn" id="export-plan" type="button">导出</button>
      <button class="btn" id="import-plan" type="button">导入</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">本月 ${y.toFixed(1)} / ${g} 小时 · 本周 ${S}。深蓝点是行测，浅蓝点是申论，黄点是面试。</p>
    <p id="plan-msg" class="error"></p>
    <div class="split">
      <section class="card">
        ${yt(e,r,a,l)}
      </section>
      <aside class="card">
        <h2>${l.slice(5)} 的任务</h2>
        ${kt(e,l)}
        <h2>加上一项</h2>
        <div class="chips" id="subject-chips">${A.map(c=>`<button type="button" class="btn" data-pick-subject="${c}">${c}</button>`).join("")}</div>
        <div class="chips" id="module-chips"></div>
        <div class="chips">${[20,40,60].map(c=>`<button type="button" class="btn" data-pick-minutes="${c}">${c}分钟</button>`).join("")}</div>
        <button class="btn primary" type="button" id="add-task">加到这一天</button>
        <h2>月目标</h2>
        ${i.goals.map(c=>`<div class="row"><span>${c.subject}</span>${[2,4,8,12].map(h=>`<button type="button" class="btn ${c.targetHours===h?"primary":""}" data-hours="${h}" data-subject="${c.subject}">${h}</button>`).join("")}</div>`).join("")}
        <button class="btn" type="button" id="split-week">拆到本周工作日</button>
      </aside>
    </div>`}function yt(e,n,t,s){const o=(new Date(n,t-1,1).getDay()+6)%7,r=D(new Date),a=Array.from({length:o},()=>'<div class="cal empty"></div>').join(""),l=Array.from({length:Z(n,t)},(i,u)=>{const f=u+1,y=`${n}-${N(t)}-${N(f)}`,g=[...new Set(e.tasks.filter(c=>c.date===y).map(c=>c.subject))];return`<button class="cal ${[y===s?"selected":"",y===r?"today":""].filter(Boolean).join(" ")}" data-day="${y}"><span>${f}</span><span class="dots">${g.map(c=>`<i class="dot ${c}"></i>`).join("")}</span></button>`}).join("");return`<div class="cal-head">${"一二三四五六日".split("").map(i=>`<span>周${i}</span>`).join("")}</div><div class="cal-grid">${a}${l}</div>`}function kt(e,n){const t=e.tasks.filter(s=>s.date===n);return t.length?t.map(s=>`<div class="row">
        <label class="task ${s.done?"done":""}"><input type="checkbox" data-task="${s.id}" ${s.done?"checked":""}/> ${p(s.subject)} ${p(s.module)} ${s.minutes}分钟</label>
        <button class="btn danger" data-del-task="${s.id}">删除</button>
      </div>`).join(""):'<p class="muted">这一天还没有任务。</p>'}function W(e){return e.length?`${e.filter(t=>t.done).length}/${e.length}`:"还没有任务"}function vt(e){const n=new Date,t=e.scores.filter(o=>F(o.date,n.getFullYear(),n.getMonth()+1));return`
    <h1>模考和练习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <div class="panels">${A.map(o=>{const r=t.filter(i=>i.subject===o&&i.full>0),a=r.length?r.reduce((i,u)=>i+u.score/u.full,0)/r.length:0,l=[...e.scores].filter(i=>i.subject===o).sort((i,u)=>u.date.localeCompare(i.date))[0];return{subject:o,average:a,latest:l}}).map(o=>`<section class="card"><h2>${o.subject}</h2><div class="stat">${o.latest?`${o.latest.score}/${o.latest.full}`:"—"}</div><p class="muted">最近一次 · 本月平均 ${o.average?Math.round(o.average*100)+"%":"还没有"}</p></section>`).join("")}</div>
    <div class="split">
      <section class="card">
        <h2>分数</h2>
        ${e.scores.length?[...e.scores].sort((o,r)=>r.date.localeCompare(o.date)).map(o=>`<div class="score-line"><span>${p(o.date)} ${p(o.kind)} ${p(o.subject)} ${p(o.module)}</span><span>${o.score}/${o.full} <button class="btn danger" data-del-score="${o.id}">删除</button></span></div>`).join(""):'<p class="muted">还没有分数。</p>'}
      </section>
      <aside class="card">
        <h2>记一笔</h2>
        <div class="chips" id="score-kind">${["模考","练习"].map(o=>`<button type="button" class="btn" data-score-kind="${o}">${o}</button>`).join("")}</div>
        <div class="chips" id="score-subject">${A.map(o=>`<button type="button" class="btn" data-score-subject="${o}">${o}</button>`).join("")}</div>
        <div class="chips" id="score-module"></div>
        <div class="row">
          <label>得分<input id="score-value" type="number" min="0" step="0.1"/></label>
          <label>满分<input id="score-full" type="number" min="1" step="0.1" value="100"/></label>
        </div>
        <button class="btn primary" type="button" id="save-score">记下</button>
      </aside>
    </div>`}function St(e){const n=A.map(a=>{const l=e.scores.filter(i=>i.subject===a).sort((i,u)=>i.date.localeCompare(u.date));return{subject:a,rows:l}}),t=wt(e),s=new Date,o=e.tasks.filter(a=>F(a.date,s.getFullYear(),s.getMonth()+1)),r=o.filter(a=>a.done).length;return`
    <h1>学习效果</h1>
    <div class="panels">
      <section class="card"><div class="stat">${o.length?Math.round(r/o.length*100):0}%</div><div class="muted">本月完成 ${r}/${o.length}</div></section>
      ${n.map(a=>`<section class="card"><h2>${a.subject}</h2>${a.rows.length?X(a.rows.map(l=>l.score/l.full),a.rows.map(l=>l.date.slice(5))):'<p class="muted">还没有分数。</p>'}</section>`).join("")}
    </div>
    <section class="card">
      <h2>模块得分率</h2>
      ${t.length?`<ol>${t.slice(0,2).map(a=>`<li>${p(a.subject)} / ${p(a.module)}：最近平均 ${Math.round(a.ratio*100)}%</li>`).join("")}</ol>${jt(t)}`:'<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>'}
    </section>`}function X(e,n){const r=e.map((l,i)=>{const u=28+i*464/Math.max(e.length-1,1),f=20+(1-l)*110;return`${u},${f}`}),a=r.map((l,i)=>{const[u,f]=l.split(",");return`<circle cx="${u}" cy="${f}" r="3" fill="#1e3a5f"/><text x="${u}" y="152" text-anchor="middle" font-size="10" fill="#5c6b7a">${p(n[i]??"")}</text>`}).join("");return`<svg viewBox="0 0 520 160" class="chart" role="img" aria-label="分数折线"><polyline fill="none" stroke="#1e3a5f" stroke-width="2" points="${r.join(" ")}"/>${a}</svg>`}function jt(e){const t=e.length*36+10,s=e.map((o,r)=>{const a=10+r*36,l=Math.max(4,o.ratio*280);return`<text x="0" y="${a+14}" font-size="12" fill="#1c2834">${p(o.module)}</text>
        <rect x="90" y="${a}" width="${l}" height="16" fill="${r<2?"#b23a3a":"#1e3a5f"}"/>
        <text x="${96+l}" y="${a+13}" font-size="12" fill="#5c6b7a">${Math.round(o.ratio*100)}%</text>`}).join("");return`<svg viewBox="0 0 420 ${t}" class="chart" role="img" aria-label="模块正确率">${s}</svg>`}function wt(e){const n=new Map;for(const t of e.scores){if(!t.module||t.full<=0)continue;const s=`${t.subject}	${t.module}`,o=n.get(s)??[];o.push(t.score/t.full),n.set(s,o)}return[...n.entries()].map(([t,s])=>{const[o,r]=t.split("	"),a=s.slice(-3),l=a.reduce((i,u)=>i+u,0)/a.length;return{subject:o,module:r,ratio:l}}).sort((t,s)=>t.ratio-s.ratio)}function xt(e,n,t,s){n==="profile"&&Mt(e),n==="timeline"&&qt(e),n==="plan"&&Et(e,t,s),n==="scores"&&Dt(e)}function Mt(e){document.querySelector("#profile").onsubmit=n=>{n.preventDefault();const t=new FormData(n.currentTarget),s=t.getAll("track").map(String);v({...e,profile:{...e.profile,name:String(t.get("name")??""),gender:String(t.get("gender")??""),politics:String(t.get("politics")??""),undergradSchool:String(t.get("undergradSchool")??""),undergradMajor:String(t.get("undergradMajor")??""),gradSchool:String(t.get("gradSchool")??""),gradMajor:String(t.get("gradMajor")??""),gradYear:String(t.get("gradYear")??""),hukou:String(t.get("hukou")??""),english:String(t.get("english")??""),cities:String(t.get("cities")??""),tracks:s}}),$()},document.querySelector("#resume").onsubmit=async n=>{n.preventDefault();const t=new FormData(n.currentTarget),s=t.get("image");let o="";try{s instanceof File&&s.size>0&&(o=await et(s)),v({...e,resume:[...e.resume,{id:E(),kind:String(t.get("kind")),time:String(t.get("time")??""),title:String(t.get("title")??""),detail:String(t.get("detail")??""),image:o}]}),$()}catch(r){const a=document.querySelector("#resume-msg");a&&(a.textContent=r instanceof Error?r.message:"图片没有存上，换一张小一点的试试")}},document.querySelectorAll("[data-del-resume]").forEach(n=>{n.onclick=()=>{v({...e,resume:e.resume.filter(t=>t.id!==n.dataset.delResume)}),$()}})}function qt(e){document.querySelector("#event").onsubmit=n=>{n.preventDefault();const t=new FormData(n.currentTarget);v({...e,events:[...e.events,{id:E(),name:String(t.get("name")??""),identity:String(t.get("identity")??""),place:String(t.get("place")??""),type:String(t.get("type")),status:String(t.get("status")),start:String(t.get("start")??""),end:String(t.get("end")??"")}]}),$()},document.querySelectorAll("[data-del-event]").forEach(n=>{n.onclick=()=>{v({...e,events:e.events.filter(t=>t.id!==n.dataset.delEvent)}),$()}}),document.querySelector("#export-timeline").onclick=()=>V("时间线.json",it(e)),G("#import-timeline","#timeline-file","#timeline-msg",e)}function Et(e,n,t){const s=D(new Date),o=n||s.slice(0,7),{year:r,month:a}=K(o),l=t||s;document.querySelector("#month-pick").onchange=c=>{location.hash=`plan/${c.currentTarget.value}`},document.querySelectorAll("[data-day]").forEach(c=>{c.onclick=()=>{location.hash=`plan/${C(r,a)}/${c.dataset.day}`}});let i="行测",u=q.行测[0],f=40;const y=document.querySelector("#module-chips"),g=(c,h,w)=>{document.querySelectorAll(c).forEach(j=>{j.classList.toggle("primary",j.dataset[w]===h)})},S=()=>{y.innerHTML=q[i].map(c=>`<button type="button" class="btn" data-pick-module="${c}">${c}</button>`).join(""),y.querySelectorAll("[data-pick-module]").forEach(c=>{c.onclick=()=>{u=c.dataset.pickModule??u,g("[data-pick-module]",u,"pickModule")}}),g("[data-pick-module]",u,"pickModule")};document.querySelectorAll("[data-pick-subject]").forEach(c=>{c.onclick=()=>{i=c.dataset.pickSubject,u=q[i][0],g("[data-pick-subject]",i,"pickSubject"),S()}}),document.querySelectorAll("[data-pick-minutes]").forEach(c=>{c.onclick=()=>{f=Number(c.dataset.pickMinutes),g("[data-pick-minutes]",String(f),"pickMinutes")}}),g("[data-pick-subject]",i,"pickSubject"),g("[data-pick-minutes]",String(f),"pickMinutes"),S(),document.querySelectorAll("[data-hours]").forEach(c=>{c.onclick=()=>{const h=c.dataset.subject,w=Number(c.dataset.hours),j=O(e,r,a);v({...j,months:j.months.map(d=>d.year===r&&d.month===a?{...d,goals:d.goals.map(m=>m.subject===h?{...m,targetHours:w}:m)}:d)}),$()}}),document.querySelector("#split-week").onclick=()=>{const c=O(e,r,a),h=H(c,r,a),w=[0,1,2,3,4].map(d=>J(U(l)[0],d)),j=h.goals.filter(d=>d.targetHours>0).flatMap(d=>w.map(m=>({id:E(),date:m,subject:d.subject,module:q[d.subject][0],title:d.note||`${d.subject}练习`,minutes:Math.max(20,Math.round(d.targetHours*60/4/w.length)),done:!1})));v({...c,tasks:[...c.tasks,...j]}),$()},document.querySelector("#add-task").onclick=()=>{v({...O(e,r,a),tasks:[...e.tasks,{id:E(),date:l,subject:i,module:u,title:`${u}练习`,minutes:f,done:!1}]}),$()},document.querySelectorAll("[data-task]").forEach(c=>{c.onchange=()=>{v({...e,tasks:e.tasks.map(h=>h.id===c.dataset.task?{...h,done:c.checked}:h)}),$()}}),document.querySelectorAll("[data-del-task]").forEach(c=>{c.onclick=()=>{v({...e,tasks:e.tasks.filter(h=>h.id!==c.dataset.delTask)}),$()}}),document.querySelector("#export-plan").onclick=()=>V(`计划-${C(r,a)}.json`,lt(e,r,a)),G("#import-plan","#plan-file","#plan-msg",e)}function Dt(e){let n="模考",t="行测",s=q.行测[0];const o=document.querySelector("#score-module"),r=(l,i,u)=>{document.querySelectorAll(l).forEach(f=>{f.classList.toggle("primary",f.dataset[u]===i)})},a=()=>{o.innerHTML=q[t].map(l=>`<button type="button" class="btn" data-score-module="${l}">${l}</button>`).join(""),o.querySelectorAll("[data-score-module]").forEach(l=>{l.onclick=()=>{s=l.dataset.scoreModule??s,r("[data-score-module]",s,"scoreModule")}}),r("[data-score-module]",s,"scoreModule")};document.querySelectorAll("[data-score-kind]").forEach(l=>{l.onclick=()=>{n=l.dataset.scoreKind,r("[data-score-kind]",n,"scoreKind")}}),document.querySelectorAll("[data-score-subject]").forEach(l=>{l.onclick=()=>{t=l.dataset.scoreSubject,s=q[t][0],r("[data-score-subject]",t,"scoreSubject"),a()}}),r("[data-score-kind]",n,"scoreKind"),r("[data-score-subject]",t,"scoreSubject"),a(),document.querySelector("#save-score").onclick=()=>{const l=Number(document.querySelector("#score-value").value),i=Number(document.querySelector("#score-full").value||100);!Number.isFinite(l)||!Number.isFinite(i)||i<=0||(v({...e,scores:[...e.scores,{id:E(),date:D(new Date),kind:n,subject:t,module:s,score:l,full:i,minutes:0}]}),$())},document.querySelectorAll("[data-del-score]").forEach(l=>{l.onclick=()=>{v({...e,scores:e.scores.filter(i=>i.id!==l.dataset.delScore)}),$()}})}function V(e,n){const t=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(t),s.download=e,s.click(),URL.revokeObjectURL(s.href)}function G(e,n,t,s){const o=document.querySelector(e),r=document.querySelector(n),a=document.querySelector(t);!o||!r||!a||(o.onclick=()=>r.click(),r.onchange=async()=>{var i;const l=(i=r.files)==null?void 0:i[0];if(l)try{const u=JSON.parse(await l.text());v(dt(s,u)),$()}catch(u){a.textContent=u instanceof Error?u.message:"导入失败"}})}window.addEventListener("hashchange",$);$();
