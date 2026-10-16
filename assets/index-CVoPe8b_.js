(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();function T(e){return String(e).padStart(2,"0")}function M(e){return`${e.getFullYear()}-${T(e.getMonth()+1)}-${T(e.getDate())}`}function H(e){const[s,t,n]=e.split("-").map(Number);return new Date(s,t-1,n)}function I(e,s){return`${e}-${T(s)}`}function _(e){const[s,t]=e.split("-").map(Number);return{year:s,month:t}}function ae(e,s){return new Date(e,s,0).getDate()}function ce(e){const s=H(e),t=(s.getDay()+6)%7;return s.setDate(s.getDate()-t),s}function J(e,s){const t=H(e);return t.setDate(t.getDate()+s),M(t)}function Y(e){const s=M(ce(e));return Array.from({length:7},(t,n)=>J(s,n))}function P(e,s,t){const n=H(e);return n.getFullYear()===s&&n.getMonth()+1===t}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}async function re(e){const s=await createImageBitmap(e),t=Math.min(1,800/Math.max(s.width,s.height)),n=document.createElement("canvas");n.width=Math.max(1,Math.round(s.width*t)),n.height=Math.max(1,Math.round(s.height*t));const r=n.getContext("2d");if(!r)throw new Error("无法处理这张图片");return r.drawImage(s,0,0,n.width,n.height),s.close(),n.toDataURL("image/jpeg",.72)}function k(e,s,t,n,r,o,l){return{id:crypto.randomUUID(),name:e,identity:s,place:t,start:n,end:r,type:o,status:l}}function C(){return{profile:{name:"",gender:"女",politics:"共青团员",undergradSchool:"中南财经政法大学",undergradMajor:"经济学",gradSchool:"中南财经政法大学",gradMajor:"数字经济",gradYear:"2027",hukou:"湖北黄冈",english:"CET-6 500",cities:"武汉",tracks:["国考","省考","事业编","选调"]},resume:[],events:[k("国考","应届公务员","考点在武汉","2026-10-15","2026-10-24","报名","已公布"),k("国考","应届公务员","考点在武汉","2026-11-01","2026-11-06","缴费","已公布"),k("国考","应届公务员","考点在武汉","2026-11-29","2026-11-29","笔试","已公布"),k("军队文职","文职人员","湖北考区在武汉","2026-11-03","2026-11-09","报名","对标去年"),k("军队文职","文职人员","湖北考区在武汉","2026-12-14","2026-12-14","笔试","对标去年"),k("湖北省考","应届公务员","主考区在武汉","2027-01-13","2027-01-19","报名","对标去年"),k("湖北省考","应届公务员","主考区在武汉","2027-03-14","2027-03-15","笔试","对标去年"),k("湖北普通选调","普通选调","考点在武汉","2027-01-13","2027-01-20","报名","对标去年"),k("湖北普通选调","普通选调","考点在武汉","2027-03-14","2027-03-14","笔试","对标去年"),k("湖北事业编","事业编制","考点含武汉","2027-02-03","2027-02-10","报名","对标去年"),k("湖北事业编","事业编制","考点含武汉","2027-03-28","2027-03-29","笔试","对标去年"),k("武汉事业编","事业编制","地点在武汉","2027-09-15","2027-09-22","报名","对标去年"),k("武汉事业编","事业编制","地点在武汉","2027-10-25","2027-10-25","笔试","对标去年")],months:[],tasks:[],scores:[]}}const L=["行测","申论","面试"],E={行测:["言语","数量","判断","资料","常识"],申论:["归纳概括","综合分析","提出对策","应用文","大作文"],面试:["综合分析","组织计划","应急应变","人际关系","岗位匹配"]},le=["国考","省考","事业编","选调","国央企"],ie=["教育","实习","奖项","技能"],X=["应届公务员","普通选调","文职人员","事业编制","服务基层"],W=["报名","缴费","笔试","面试"],V=["已公布","对标去年"],z="qiuzhi-v1";function de(){const e=localStorage.getItem(z);if(!e){const t=C();return localStorage.setItem(z,JSON.stringify(t)),t}const s=JSON.parse(e);return{...C(),...s,profile:{...C().profile,...s.profile},resume:s.resume??[],events:s.events??[],months:s.months??[],tasks:s.tasks??[],scores:s.scores??[]}}function S(e){localStorage.setItem(z,JSON.stringify(e))}function A(){return crypto.randomUUID()}function B(e,s,t){return e.months.find(n=>n.year===s&&n.month===t)??{year:s,month:t,goals:L.map(n=>({subject:n,targetHours:0,note:""}))}}function O(e,s,t){return e.months.some(n=>n.year===s&&n.month===t)?e:{...e,months:[...e.months,{year:s,month:t,goals:L.map(n=>({subject:n,targetHours:0,note:""}))}]}}function ue(e){return{kind:"qiuzhi-timeline",version:1,events:e.events}}function pe(e,s,t){const n=B(e,s,t),r=`${s}-${String(t).padStart(2,"0")}`;return{kind:"qiuzhi-plan",version:1,year:s,month:t,goals:n.goals,tasks:e.tasks.filter(o=>o.date.startsWith(r)).map(({date:o,subject:l,module:a,title:c,minutes:u})=>({date:o,subject:l,module:a,title:c,minutes:u}))}}function me(e,s){if(!s||typeof s!="object")throw new Error("文件不是求职系统导出的内容");const t=s;if(t.kind==="qiuzhi-timeline"&&t.version===1&&Array.isArray(t.events)){const n=t.events.map(r=>({...r,id:A()}));return{...e,events:[...e.events,...n]}}if(t.kind==="qiuzhi-plan"&&t.version===1){const n=O(e,t.year,t.month),r=n.months.map(l=>l.year===t.year&&l.month===t.month?{...l,goals:t.goals}:l),o=t.tasks.map(l=>({...l,id:A(),done:!1}));return{...n,months:r,tasks:[...n.tasks,...o]}}throw new Error("文件不是时间线或复习计划")}function K(e,s){return e*12+s}function he(e){if(e.length===0)return'<p class="muted">还没有考试节点。</p>';const t=[...new Set(e.map(d=>d.start.slice(0,7)))].sort().map(d=>{const[g,y]=d.split("-").map(Number);return{year:g,month:y,days:new Date(g,y,0).getDate()}}),n=[];t.forEach((d,g)=>{if(g>0){const y=t[g-1];K(d.year,d.month)-K(y.year,y.month)>1&&n.push({gap:!0})}n.push(d)});const r=148,o=36,l=108,a=r+n.reduce((d,g)=>d+("gap"in g?o:l),0)+16,c=[...new Set(e.map(d=>d.name))],u=72,m=36,f=m+c.length*u+36,h=[];let b=r;for(const d of n)"gap"in d?(h.push({kind:"gap",x:b,width:o}),b+=o):(h.push({kind:"month",...d,x:b,width:l}),b+=l);const i=d=>{const[g,y,q]=d.split("-").map(Number),D=h.find(w=>w.kind==="month"&&w.year===g&&w.month===y);return D?D.x+(q-1)/D.days*D.width:r},$=e.map(d=>{const g=m+c.indexOf(d.name)*u+16,y=i(d.start),q=Math.max(i(d.end)+4,y+3),w=d.type==="笔试"||d.type==="面试"?"#b23a3a":"#1e3a5f",F=d.status==="对标去年",R=q-y>36?d.type:"",oe=R===""?`<text x="${(y+q)/2}" y="${g-6}" text-anchor="middle" font-size="13" fill="${w}">${p(d.type)}</text>`:`<text x="${(y+q)/2}" y="${g+19}" text-anchor="middle" font-size="14" fill="${F?w:"#fff"}">${p(R)}</text>`;return(F?`<rect x="${y}" y="${g}" width="${q-y}" height="28" rx="4" fill="none" stroke="${w}" stroke-width="2" stroke-dasharray="4 3"/>`:`<rect x="${y}" y="${g}" width="${q-y}" height="28" rx="4" fill="${w}"/>`)+oe}).join(""),j=h.map(d=>{if(d.kind==="gap")return`<text x="${d.x+d.width/2}" y="${f-10}" text-anchor="middle" font-size="13" fill="#8b97a3">空档</text>`;const g=d.month===1||d.month===10?`${d.year}年${d.month}月`:`${d.month}月`;return`<text x="${d.x+d.width/2}" y="${f-10}" text-anchor="middle" font-size="14" fill="#3e4c59">${g}</text>`}).join(""),x=c.map((d,g)=>`<text x="0" y="${m+g*u+36}" font-size="16" fill="#1c2834">${p(d)}</text>`).join("");return`<svg class="chart" viewBox="0 0 ${a} ${f}" role="img" aria-label="岗位时间线">${x}${j}${$}</svg>`}const U=document.querySelector("#app");if(!U)throw new Error("缺少页面根节点");const fe=[["home","首页"],["profile","资料"],["timeline","时间线"],["plan","计划"],["study","学习"]],G=["国考","湖北省考","湖北普通选调","湖北事业编","武汉事业编","军队文职"],Q=["考点在武汉","地点在武汉","主考区在武汉","湖北考区在武汉","考点含武汉"];function ge(){return location.hash.replace("#","")||"home"}function v(){const e=de(),[s,t="",n=""]=ge().split("/"),r=s==="scores"||s==="board"?"study":s;U.innerHTML=`
    <header class="top">
      <div class="brand">${Z()}RUO的求职系统</div>
      <nav class="nav">${fe.map(([o,l])=>`<button data-go="${o}" class="${r===o?"active":""}">${l}</button>`).join("")}</nav>
    </header>
    <main class="wrap">${$e(e,s,t,n)}</main>`,U.querySelectorAll("[data-go]").forEach(o=>{o.onclick=()=>{location.hash=o.dataset.go??"profile"}}),qe(e,s,t,n)}function Z(){return'<svg class="bow" viewBox="0 0 22 16" aria-hidden="true"><path d="M11 8 C8 2 2 2 2 8 C2 14 8 14 11 8 C14 2 20 2 20 8 C20 14 14 14 11 8" fill="#8ec8ea"/><circle cx="11" cy="8" r="2" fill="#fff"/></svg>'}function $e(e,s,t,n){return s==="home"?be(e):s==="timeline"?ve(e):s==="plan"?ke(e,t,n):s==="study"||s==="scores"||s==="board"?je(e):ye(e)}function be(e){const s=M(new Date),t=[...e.events].filter(c=>c.end>=s).sort((c,u)=>c.start.localeCompare(u.start))[0],n=Y(s),r=e.tasks.filter(c=>n.includes(c.date)),o=[...e.scores].sort((c,u)=>c.date.localeCompare(u.date)).at(-1),l=e.resume.filter(c=>c.image),a=e.profile.name?`${e.profile.name}，今天也要加油！Offer来来来`:"今天也要加油！Offer来来来";return`
    <h1>${Z()} ${p(a)}</h1>
    <p class="sub">${p(e.profile.gradSchool)} ${p(e.profile.gradMajor)} · ${p(e.profile.gradYear)}届</p>
    <div class="home-grid">
      <section class="card">
        <h2>下一场</h2>
        ${t?`<div class="stat">${p(t.name)} ${p(t.type)}</div><p class="muted">${p(t.start)} · ${p(t.place)} · ${p(t.identity)}</p><button class="btn" data-go="timeline">看时间线</button>`:'<p class="muted">时间线上还没有今天之后的考试。</p>'}
      </section>
      <section class="card">
        <h2>本周</h2>
        <div class="stat">${ee(r)}</div>
        <p class="muted">任务完成</p>
        <button class="btn" data-go="plan">去日历</button>
      </section>
    </div>
    <div class="home-grid">
      <section class="card">
        <h2>最近一次分数</h2>
        ${o?`<div class="stat">${o.score}/${o.full}</div><p class="muted">${p(o.date)} ${p(o.subject)} ${p(o.module)} ${p(o.kind)}</p>${te([o.score/o.full],[o.date.slice(5)])}`:'<p class="muted">还没有分数。</p>'}
        <button class="btn" data-go="study">看学习</button>
      </section>
      <section class="card">
        <h2>奖项和证明</h2>
        ${l.length?`<div class="gallery">${l.map(c=>`<img src="${c.image}" alt="${p(c.title)}"/>`).join("")}</div>`:'<p class="muted">在资料页给奖项或证明加上图片后，会显示在这里。</p>'}
      </section>
    </div>`}function ye(e){const s=e.profile,t=(n,r,o)=>`<label>${r}<input name="${n}" value="${p(o)}"/></label>`;return`
    <h1>资料与简历</h1>
    <p class="sub">存在这台浏览器里。导出计划时不会带上姓名和简历。</p>
    <form id="profile" class="card grid">
      ${t("name","姓名",s.name)}
      ${t("gender","性别",s.gender)}
      ${t("politics","政治面貌",s.politics)}
      ${t("undergradSchool","本科院校",s.undergradSchool)}
      ${t("undergradMajor","本科专业",s.undergradMajor)}
      ${t("gradSchool","硕士院校",s.gradSchool)}
      ${t("gradMajor","硕士专业",s.gradMajor)}
      ${t("gradYear","毕业年份",s.gradYear)}
      ${t("hukou","户籍",s.hukou)}
      ${t("english","英语",s.english)}
      ${t("cities","目标城市",s.cities)}
      <label>求职方向
        <span class="checks">${le.map(n=>`<label><input type="checkbox" name="track" value="${n}" ${s.tracks.includes(n)?"checked":""}/> ${n}</label>`).join("")}</span>
      </label>
      <div class="row"><button class="btn primary" type="submit">保存资料</button></div>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${ie.map(n=>`<option>${n}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <label>奖项或证明图片<input name="image" type="file" accept="image/*"/></label>
        <div class="row"><button class="btn primary" type="submit">添加</button></div>
        <p id="resume-msg" class="error"></p>
      </form>
      <table>
        <thead><tr><th></th><th>类型</th><th>时间</th><th>标题</th><th>说明</th><th></th></tr></thead>
        <tbody>${e.resume.length?e.resume.map(n=>`<tr>
                    <td>${n.image?`<img class="thumb" src="${n.image}" alt=""/>`:""}</td>
                    <td>${p(n.kind)}</td><td>${p(n.time)}</td><td>${p(n.title)}</td><td>${p(n.detail)}</td>
                    <td><button class="btn danger" data-del-resume="${n.id}">删除</button></td>
                  </tr>`).join(""):'<tr><td colspan="6" class="muted">还没有简历条目。</td></tr>'}</tbody>
      </table>
    </section>`}function N(e,s){return`<div class="chips">${e.map(t=>`<button type="button" class="btn" data-${s}="${p(t)}">${p(t)}</button>`).join("")}</div>`}function ve(e){const s=M(new Date),t=[...new Set([...G,...e.events.map(o=>o.name)])],n=[...new Set([...Q,...e.events.map(o=>o.place)])],r=[...e.events].sort((o,l)=>o.start.localeCompare(l.start));return`
    <div class="row">
      <h1>时间线</h1>
      <button class="btn" id="export-timeline" type="button">导出</button>
      <button class="btn" id="import-timeline" type="button">导入</button>
      <input id="timeline-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">条的长短是天数。实心是已公布，虚线是对标去年，红色是笔试和面试。</p>
    <p id="timeline-msg" class="error"></p>
    <section class="card timeline-chart">${he(e.events)}</section>
    <div class="split">
      <section class="card">
        <h2>加一个节点</h2>
        ${N(t,"exam-name")}
        <label>其他考试<input id="event-name" placeholder="不在上面就写在这里"/></label>
        ${N(X,"exam-identity")}
        ${N(W,"exam-type")}
        ${N(V,"exam-status")}
        ${N(n,"exam-place")}
        <label>其他地点<input id="event-place" placeholder="不在上面就写在这里"/></label>
        <div class="row">
          <label>开始<input id="event-start" type="date" value="${s}"/></label>
          <label>结束<input id="event-end" type="date" value="${s}"/></label>
        </div>
        <button class="btn primary" type="button" id="add-event">加到时间线</button>
      </section>
      <aside class="card">
        <h2>已有节点</h2>
        ${r.length?r.map(o=>`<div class="score-line"><span>${p(o.start.slice(5))} ${p(o.name)} ${p(o.type)} ${p(o.status)}</span><button class="btn danger" data-del-event="${o.id}">删除</button></div>`).join(""):'<p class="muted">还没有考试节点。</p>'}
      </aside>
    </div>`}function ke(e,s,t){const n=M(new Date),r=s||n.slice(0,7),{year:o,month:l}=_(r),a=t||n,c=B(e,o,l),u=Y(a),f=e.tasks.filter(i=>P(i.date,o,l)).filter(i=>i.done).reduce((i,$)=>i+$.minutes,0)/60,h=c.goals.reduce((i,$)=>i+$.targetHours,0),b=ee(e.tasks.filter(i=>u.includes(i.date)));return`
    <div class="row">
      <h1>${o}年${l}月</h1>
      <label>月份<input id="month-pick" type="month" value="${I(o,l)}"/></label>
      <button class="btn" id="export-plan" type="button">导出</button>
      <button class="btn" id="import-plan" type="button">导入</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">本月 ${f.toFixed(1)} / ${h} 小时 · 本周 ${b}。深蓝点是行测，浅蓝点是申论，黄点是面试。</p>
    <p id="plan-msg" class="error"></p>
    <div class="split">
      <section class="card">
        ${Se(e,o,l,a)}
      </section>
      <aside class="card">
        <h2>${a.slice(5)} 的任务</h2>
        ${xe(e,a)}
        <h2>加上一项</h2>
        <div class="chips" id="subject-chips">${L.map(i=>`<button type="button" class="btn" data-pick-subject="${i}">${i}</button>`).join("")}</div>
        <div class="chips" id="module-chips"></div>
        <div class="chips">${[20,40,60].map(i=>`<button type="button" class="btn" data-pick-minutes="${i}">${i}分钟</button>`).join("")}</div>
        <button class="btn primary" type="button" id="add-task">加到这一天</button>
        <h2>月目标</h2>
        ${c.goals.map(i=>`<div class="row"><span>${i.subject}</span>${[2,4,8,12].map($=>`<button type="button" class="btn ${i.targetHours===$?"primary":""}" data-hours="${$}" data-subject="${i.subject}">${$}</button>`).join("")}</div>`).join("")}
        <button class="btn" type="button" id="split-week">拆到本周工作日</button>
      </aside>
    </div>`}function Se(e,s,t,n){const r=(new Date(s,t-1,1).getDay()+6)%7,o=M(new Date),l=Array.from({length:r},()=>'<div class="cal empty"></div>').join(""),a=Array.from({length:ae(s,t)},(c,u)=>{const m=u+1,f=`${s}-${T(t)}-${T(m)}`,h=[...new Set(e.tasks.filter(i=>i.date===f).map(i=>i.subject))];return`<button class="cal ${[f===n?"selected":"",f===o?"today":""].filter(Boolean).join(" ")}" data-day="${f}"><span>${m}</span><span class="dots">${h.map(i=>`<i class="dot ${i}"></i>`).join("")}</span></button>`}).join("");return`<div class="cal-head">${"一二三四五六日".split("").map(c=>`<span>周${c}</span>`).join("")}</div><div class="cal-grid">${l}${a}</div>`}function xe(e,s){const t=e.tasks.filter(n=>n.date===s);return t.length?t.map(n=>`<div class="row">
        <label class="task ${n.done?"done":""}"><input type="checkbox" data-task="${n.id}" ${n.done?"checked":""}/> ${p(n.subject)} ${p(n.module)} ${n.minutes}分钟</label>
        <button class="btn danger" data-del-task="${n.id}">删除</button>
      </div>`).join(""):'<p class="muted">这一天还没有任务。</p>'}function ee(e){return e.length?`${e.filter(t=>t.done).length}/${e.length}`:"还没有任务"}function je(e){const s=new Date,t=e.scores.filter(a=>P(a.date,s.getFullYear(),s.getMonth()+1)),n=L.map(a=>{const c=t.filter(h=>h.subject===a&&h.full>0),u=c.length?c.reduce((h,b)=>h+b.score/b.full,0)/c.length:0,m=[...e.scores].filter(h=>h.subject===a).sort((h,b)=>b.date.localeCompare(h.date))[0],f=e.scores.filter(h=>h.subject===a).sort((h,b)=>h.date.localeCompare(b.date));return{subject:a,average:u,latest:m,series:f}}),r=e.tasks.filter(a=>P(a.date,s.getFullYear(),s.getMonth()+1)),o=r.filter(a=>a.done).length,l=Me(e);return`
    <h1>学习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <div class="quad">
      <section class="card"><div class="stat">${r.length?Math.round(o/r.length*100):0}%</div><p class="muted">本月完成 ${o}/${r.length}</p></section>
      ${n.map(a=>`<section class="card"><h2>${a.subject}</h2><div class="stat">${a.latest?`${a.latest.score}/${a.latest.full}`:"—"}</div><p class="muted">最近一次 · 本月平均 ${a.average?Math.round(a.average*100)+"%":"还没有"}</p></section>`).join("")}
    </div>
    <div class="split">
      <section class="card">
        ${n.map(a=>a.series.length?`<h2>${a.subject}</h2>${te(a.series.map(c=>c.score/c.full),a.series.map(c=>c.date.slice(5)),120)}`:"").join("")}
        <h2>模块得分率</h2>
        ${l.length?we(l):'<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>'}
        <h2>分数</h2>
        ${e.scores.length?[...e.scores].sort((a,c)=>c.date.localeCompare(a.date)).map(a=>`<div class="score-line"><span>${p(a.date)} ${p(a.kind)} ${p(a.subject)} ${p(a.module)}</span><span>${a.score}/${a.full} <button class="btn danger" data-del-score="${a.id}">删除</button></span></div>`).join(""):'<p class="muted">还没有分数。</p>'}
      </section>
      <aside class="card">
        <h2>记一笔</h2>
        <div class="chips" id="score-kind">${["模考","练习"].map(a=>`<button type="button" class="btn" data-score-kind="${a}">${a}</button>`).join("")}</div>
        <div class="chips" id="score-subject">${L.map(a=>`<button type="button" class="btn" data-score-subject="${a}">${a}</button>`).join("")}</div>
        <div class="chips" id="score-module"></div>
        <div class="row">
          <label>得分<input id="score-value" type="number" min="0" step="0.1"/></label>
          <label>满分<input id="score-full" type="number" min="1" step="0.1" value="100"/></label>
        </div>
        <button class="btn primary" type="button" id="save-score">记下</button>
      </aside>
    </div>`}function te(e,s,t=160){const o=e.map((a,c)=>{const u=28+c*464/Math.max(e.length-1,1),m=16+(1-a)*(t-48);return`${u},${m}`}),l=o.map((a,c)=>{const[u,m]=a.split(",");return`<circle cx="${u}" cy="${m}" r="3" fill="#1e3a5f"/><text x="${u}" y="${t-8}" text-anchor="middle" font-size="10" fill="#5c6b7a">${p(s[c]??"")}</text>`}).join("");return`<svg viewBox="0 0 520 ${t}" class="chart" role="img" aria-label="分数折线"><polyline fill="none" stroke="#1e3a5f" stroke-width="2" points="${o.join(" ")}"/>${l}</svg>`}function we(e){const t=e.length*36+10,n=e.map((r,o)=>{const l=10+o*36,a=Math.max(4,r.ratio*280);return`<text x="0" y="${l+14}" font-size="12" fill="#1c2834">${p(r.module)}</text>
        <rect x="90" y="${l}" width="${a}" height="16" fill="${o<2?"#b23a3a":"#1e3a5f"}"/>
        <text x="${96+a}" y="${l+13}" font-size="12" fill="#5c6b7a">${Math.round(r.ratio*100)}%</text>`}).join("");return`<svg viewBox="0 0 420 ${t}" class="chart" role="img" aria-label="模块正确率">${n}</svg>`}function Me(e){const s=new Map;for(const t of e.scores){if(!t.module||t.full<=0)continue;const n=`${t.subject}	${t.module}`,r=s.get(n)??[];r.push(t.score/t.full),s.set(n,r)}return[...s.entries()].map(([t,n])=>{const[r,o]=t.split("	"),l=n.slice(-3),a=l.reduce((c,u)=>c+u,0)/l.length;return{subject:r,module:o,ratio:a}}).sort((t,n)=>t.ratio-n.ratio)}function qe(e,s,t,n){s==="profile"&&Ee(e),s==="timeline"&&Ae(e),s==="plan"&&De(e,t,n),(s==="study"||s==="scores"||s==="board")&&Ne(e)}function Ee(e){document.querySelector("#profile").onsubmit=s=>{s.preventDefault();const t=new FormData(s.currentTarget),n=t.getAll("track").map(String);S({...e,profile:{...e.profile,name:String(t.get("name")??""),gender:String(t.get("gender")??""),politics:String(t.get("politics")??""),undergradSchool:String(t.get("undergradSchool")??""),undergradMajor:String(t.get("undergradMajor")??""),gradSchool:String(t.get("gradSchool")??""),gradMajor:String(t.get("gradMajor")??""),gradYear:String(t.get("gradYear")??""),hukou:String(t.get("hukou")??""),english:String(t.get("english")??""),cities:String(t.get("cities")??""),tracks:n}}),v()},document.querySelector("#resume").onsubmit=async s=>{s.preventDefault();const t=new FormData(s.currentTarget),n=t.get("image");let r="";try{n instanceof File&&n.size>0&&(r=await re(n)),S({...e,resume:[...e.resume,{id:A(),kind:String(t.get("kind")),time:String(t.get("time")??""),title:String(t.get("title")??""),detail:String(t.get("detail")??""),image:r}]}),v()}catch(o){const l=document.querySelector("#resume-msg");l&&(l.textContent=o instanceof Error?o.message:"图片没有存上，换一张小一点的试试")}},document.querySelectorAll("[data-del-resume]").forEach(s=>{s.onclick=()=>{S({...e,resume:e.resume.filter(t=>t.id!==s.dataset.delResume)}),v()}})}function Ae(e){let s=G[0],t=X[0],n=W[0],r=V[0],o=Q[0];const l=(c,u,m)=>{document.querySelectorAll(c).forEach(f=>{f.classList.toggle("primary",f.dataset[m]===u)})},a=(c,u,m,f)=>{document.querySelectorAll(c).forEach(h=>{h.onclick=()=>{const b=h.dataset[u]??f;m(b),l(c,b,u)}}),l(c,f,u)};a("[data-exam-name]","examName",c=>s=c,s),a("[data-exam-identity]","examIdentity",c=>t=c,t),a("[data-exam-type]","examType",c=>n=c,n),a("[data-exam-status]","examStatus",c=>r=c,r),a("[data-exam-place]","examPlace",c=>o=c,o),document.querySelector("#add-event").onclick=()=>{const c=document.querySelector("#event-name").value.trim(),u=document.querySelector("#event-place").value.trim(),m=document.querySelector("#event-start").value,f=document.querySelector("#event-end").value||m;m&&(S({...e,events:[...e.events,{id:A(),name:c||s,identity:t,place:u||o,type:n,status:r,start:m,end:f<m?m:f}]}),v())},document.querySelectorAll("[data-del-event]").forEach(c=>{c.onclick=()=>{S({...e,events:e.events.filter(u=>u.id!==c.dataset.delEvent)}),v()}}),document.querySelector("#export-timeline").onclick=()=>se("时间线.json",ue(e)),ne("#import-timeline","#timeline-file","#timeline-msg",e)}function De(e,s,t){const n=M(new Date),r=s||n.slice(0,7),{year:o,month:l}=_(r),a=t||n;document.querySelector("#month-pick").onchange=i=>{location.hash=`plan/${i.currentTarget.value}`},document.querySelectorAll("[data-day]").forEach(i=>{i.onclick=()=>{location.hash=`plan/${I(o,l)}/${i.dataset.day}`}});let c="行测",u=E.行测[0],m=40;const f=document.querySelector("#module-chips"),h=(i,$,j)=>{document.querySelectorAll(i).forEach(x=>{x.classList.toggle("primary",x.dataset[j]===$)})},b=()=>{f.innerHTML=E[c].map(i=>`<button type="button" class="btn" data-pick-module="${i}">${i}</button>`).join(""),f.querySelectorAll("[data-pick-module]").forEach(i=>{i.onclick=()=>{u=i.dataset.pickModule??u,h("[data-pick-module]",u,"pickModule")}}),h("[data-pick-module]",u,"pickModule")};document.querySelectorAll("[data-pick-subject]").forEach(i=>{i.onclick=()=>{c=i.dataset.pickSubject,u=E[c][0],h("[data-pick-subject]",c,"pickSubject"),b()}}),document.querySelectorAll("[data-pick-minutes]").forEach(i=>{i.onclick=()=>{m=Number(i.dataset.pickMinutes),h("[data-pick-minutes]",String(m),"pickMinutes")}}),h("[data-pick-subject]",c,"pickSubject"),h("[data-pick-minutes]",String(m),"pickMinutes"),b(),document.querySelectorAll("[data-hours]").forEach(i=>{i.onclick=()=>{const $=i.dataset.subject,j=Number(i.dataset.hours),x=O(e,o,l);S({...x,months:x.months.map(d=>d.year===o&&d.month===l?{...d,goals:d.goals.map(g=>g.subject===$?{...g,targetHours:j}:g)}:d)}),v()}}),document.querySelector("#split-week").onclick=()=>{const i=O(e,o,l),$=B(i,o,l),j=[0,1,2,3,4].map(d=>J(Y(a)[0],d)),x=$.goals.filter(d=>d.targetHours>0).flatMap(d=>j.map(g=>({id:A(),date:g,subject:d.subject,module:E[d.subject][0],title:d.note||`${d.subject}练习`,minutes:Math.max(20,Math.round(d.targetHours*60/4/j.length)),done:!1})));S({...i,tasks:[...i.tasks,...x]}),v()},document.querySelector("#add-task").onclick=()=>{S({...O(e,o,l),tasks:[...e.tasks,{id:A(),date:a,subject:c,module:u,title:`${u}练习`,minutes:m,done:!1}]}),v()},document.querySelectorAll("[data-task]").forEach(i=>{i.onchange=()=>{S({...e,tasks:e.tasks.map($=>$.id===i.dataset.task?{...$,done:i.checked}:$)}),v()}}),document.querySelectorAll("[data-del-task]").forEach(i=>{i.onclick=()=>{S({...e,tasks:e.tasks.filter($=>$.id!==i.dataset.delTask)}),v()}}),document.querySelector("#export-plan").onclick=()=>se(`计划-${I(o,l)}.json`,pe(e,o,l)),ne("#import-plan","#plan-file","#plan-msg",e)}function Ne(e){let s="模考",t="行测",n=E.行测[0];const r=document.querySelector("#score-module"),o=(a,c,u)=>{document.querySelectorAll(a).forEach(m=>{m.classList.toggle("primary",m.dataset[u]===c)})},l=()=>{r.innerHTML=E[t].map(a=>`<button type="button" class="btn" data-score-module="${a}">${a}</button>`).join(""),r.querySelectorAll("[data-score-module]").forEach(a=>{a.onclick=()=>{n=a.dataset.scoreModule??n,o("[data-score-module]",n,"scoreModule")}}),o("[data-score-module]",n,"scoreModule")};document.querySelectorAll("[data-score-kind]").forEach(a=>{a.onclick=()=>{s=a.dataset.scoreKind,o("[data-score-kind]",s,"scoreKind")}}),document.querySelectorAll("[data-score-subject]").forEach(a=>{a.onclick=()=>{t=a.dataset.scoreSubject,n=E[t][0],o("[data-score-subject]",t,"scoreSubject"),l()}}),o("[data-score-kind]",s,"scoreKind"),o("[data-score-subject]",t,"scoreSubject"),l(),document.querySelector("#save-score").onclick=()=>{const a=Number(document.querySelector("#score-value").value),c=Number(document.querySelector("#score-full").value||100);!Number.isFinite(a)||!Number.isFinite(c)||c<=0||(S({...e,scores:[...e.scores,{id:A(),date:M(new Date),kind:s,subject:t,module:n,score:a,full:c,minutes:0}]}),v())},document.querySelectorAll("[data-del-score]").forEach(a=>{a.onclick=()=>{S({...e,scores:e.scores.filter(c=>c.id!==a.dataset.delScore)}),v()}})}function se(e,s){const t=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=e,n.click(),URL.revokeObjectURL(n.href)}function ne(e,s,t,n){const r=document.querySelector(e),o=document.querySelector(s),l=document.querySelector(t);!r||!o||!l||(r.onclick=()=>o.click(),o.onchange=async()=>{var c;const a=(c=o.files)==null?void 0:c[0];if(a)try{const u=JSON.parse(await a.text());S(me(n,u)),v()}catch(u){l.textContent=u instanceof Error?u.message:"导入失败"}})}window.addEventListener("hashchange",v);v();
