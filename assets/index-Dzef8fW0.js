(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();function I(n){return String(n).padStart(2,"0")}function q(n){return`${n.getFullYear()}-${I(n.getMonth()+1)}-${I(n.getDate())}`}function U(n){const[t,e,s]=n.split("-").map(Number);return new Date(t,e-1,s)}function L(n,t){return`${n}-${I(t)}`}function _(n){const[t,e]=n.split("-").map(Number);return{year:t,month:e}}function ae(n,t){return new Date(n,t,0).getDate()}function ce(n){const t=U(n),e=(t.getDay()+6)%7;return t.setDate(t.getDate()-e),t}function J(n,t){const e=U(n);return e.setDate(e.getDate()+t),q(e)}function F(n){const t=q(ce(n));return Array.from({length:7},(e,s)=>J(t,s))}function O(n,t,e){const s=U(n);return s.getFullYear()===t&&s.getMonth()+1===e}function g(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}async function re(n){const t=await createImageBitmap(n),e=Math.min(1,800/Math.max(t.width,t.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(t.width*e)),s.height=Math.max(1,Math.round(t.height*e));const i=s.getContext("2d");if(!i)throw new Error("无法处理这张图片");return i.drawImage(t,0,0,s.width,s.height),t.close(),s.toDataURL("image/jpeg",.72)}function S(n,t,e,s,i,o,c){return{id:crypto.randomUUID(),name:n,identity:t,place:e,start:s,end:i,type:o,status:c}}function ie(){return{profile:{name:"",gender:"女",politics:"共青团员",undergradSchool:"中南财经政法大学",undergradMajor:"经济学",gradSchool:"中南财经政法大学",gradMajor:"数字经济",gradYear:"2027",hukou:"湖北黄冈",english:"CET-6 500",cities:"武汉",tracks:["国考","省考","事业编","选调"]},resume:[],events:[S("国考","应届公务员","考点在武汉","2026-10-15","2026-10-24","报名","已公布"),S("国考","应届公务员","考点在武汉","2026-11-01","2026-11-06","缴费","已公布"),S("国考","应届公务员","考点在武汉","2026-11-29","2026-11-29","笔试","已公布"),S("军队文职","文职人员","湖北考区在武汉","2026-11-03","2026-11-09","报名","对标去年"),S("军队文职","文职人员","湖北考区在武汉","2026-12-14","2026-12-14","笔试","对标去年"),S("湖北省考","应届公务员","主考区在武汉","2027-01-13","2027-01-19","报名","对标去年"),S("湖北省考","应届公务员","主考区在武汉","2027-03-14","2027-03-15","笔试","对标去年"),S("湖北普通选调","普通选调","考点在武汉","2027-01-13","2027-01-20","报名","对标去年"),S("湖北普通选调","普通选调","考点在武汉","2027-03-14","2027-03-14","笔试","对标去年"),S("湖北事业编","事业编制","考点含武汉","2027-02-03","2027-02-10","报名","对标去年"),S("湖北事业编","事业编制","考点含武汉","2027-03-28","2027-03-29","笔试","对标去年"),S("武汉事业编","事业编制","地点在武汉","2027-09-15","2027-09-22","报名","对标去年"),S("武汉事业编","事业编制","地点在武汉","2027-10-25","2027-10-25","笔试","对标去年")],months:[],tasks:[],scores:[]}}const T=["行测","申论","面试"],M={行测:["言语","数量","判断","资料","常识"],申论:["归纳概括","综合分析","提出对策","应用文","大作文"],面试:["综合分析","组织计划","应急应变","人际关系","岗位匹配"]},le=["国考","省考","事业编","选调","国央企"],de=["教育","实习","奖项","技能"],X=["应届公务员","普通选调","文职人员","事业编制","服务基层"],W=["报名","缴费","笔试","面试"],V=["已公布","对标去年"],P="qiuzhi-v1";function B(){const n=localStorage.getItem(P),t=ie();if(!n)return localStorage.setItem(P,JSON.stringify(t)),t;try{const e=JSON.parse(n);return{...t,...e,profile:{...t.profile,...e.profile??{}},resume:e.resume??[],events:e.events??t.events,months:e.months??[],tasks:e.tasks??[],scores:e.scores??[]}}catch{return t}}function ue(n){try{localStorage.setItem(P,JSON.stringify(n))}catch{throw new Error("没有存上，浏览器里的空间可能满了")}}function A(){return crypto.randomUUID()}function H(n,t,e){return n.months.find(s=>s.year===t&&s.month===e)??{year:t,month:e,goals:T.map(s=>({subject:s,targetHours:0,note:""}))}}function C(n,t,e){return n.months.some(s=>s.year===t&&s.month===e)?n:{...n,months:[...n.months,{year:t,month:e,goals:T.map(s=>({subject:s,targetHours:0,note:""}))}]}}function me(n){return{kind:"qiuzhi-timeline",version:1,events:n.events}}function pe(n,t,e){const s=H(n,t,e),i=`${t}-${String(e).padStart(2,"0")}`;return{kind:"qiuzhi-plan",version:1,year:t,month:e,goals:s.goals,tasks:n.tasks.filter(o=>o.date.startsWith(i)).map(({date:o,subject:c,module:a,title:l,minutes:u})=>({date:o,subject:c,module:a,title:l,minutes:u}))}}function he(n,t){if(!t||typeof t!="object")throw new Error("文件不是求职系统导出的内容");const e=t;if(e.kind==="qiuzhi-timeline"&&e.version===1&&Array.isArray(e.events)){const s=e.events.map(i=>({...i,id:A()}));return{...n,events:[...n.events,...s]}}if(e.kind==="qiuzhi-plan"&&e.version===1){const s=C(n,e.year,e.month),i=s.months.map(c=>c.year===e.year&&c.month===e.month?{...c,goals:e.goals}:c),o=e.tasks.map(c=>({...c,id:A(),done:!1}));return{...s,months:i,tasks:[...s.tasks,...o]}}throw new Error("文件不是时间线或复习计划")}function K(n,t){return n*12+t}function fe(n){if(n.length===0)return'<p class="muted">还没有考试节点。</p>';const e=[...new Set(n.map(p=>p.start.slice(0,7)))].sort().map(p=>{const[b,v]=p.split("-").map(Number);return{year:b,month:v,days:new Date(b,v,0).getDate()}}),s=[];e.forEach((p,b)=>{if(b>0){const v=e[b-1];K(p.year,p.month)-K(v.year,v.month)>1&&s.push({gap:!0})}s.push(p)});const i=148,o=36,c=108,a=i+s.reduce((p,b)=>p+("gap"in b?o:c),0)+16,l=[...new Set(n.map(p=>p.name))],u=72,d=36,h=d+l.length*u+36,m=[];let $=i;for(const p of s)"gap"in p?(m.push({kind:"gap",x:$,width:o}),$+=o):(m.push({kind:"month",...p,x:$,width:c}),$+=c);const r=p=>{const[b,v,E]=p.split("-").map(Number),D=m.find(w=>w.kind==="month"&&w.year===b&&w.month===v);return D?D.x+(E-1)/D.days*D.width:i},f=n.map(p=>{const b=d+l.indexOf(p.name)*u+16,v=r(p.start),E=Math.max(r(p.end)+4,v+3),w=p.type==="笔试"||p.type==="面试"?"#b23a3a":"#1e3a5f",R=p.status==="对标去年",Y=E-v>36?p.type:"",oe=Y===""?`<text x="${(v+E)/2}" y="${b-6}" text-anchor="middle" font-size="13" fill="${w}">${g(p.type)}</text>`:`<text x="${(v+E)/2}" y="${b+19}" text-anchor="middle" font-size="14" fill="${R?w:"#fff"}">${g(Y)}</text>`;return(R?`<rect x="${v}" y="${b}" width="${E-v}" height="28" rx="4" fill="none" stroke="${w}" stroke-width="2" stroke-dasharray="4 3"/>`:`<rect x="${v}" y="${b}" width="${E-v}" height="28" rx="4" fill="${w}"/>`)+oe}).join(""),y=m.map(p=>{if(p.kind==="gap")return`<text x="${p.x+p.width/2}" y="${h-10}" text-anchor="middle" font-size="13" fill="#8b97a3">空档</text>`;const b=p.month===1||p.month===10?`${p.year}年${p.month}月`:`${p.month}月`;return`<text x="${p.x+p.width/2}" y="${h-10}" text-anchor="middle" font-size="14" fill="#3e4c59">${b}</text>`}).join(""),j=l.map((p,b)=>`<text x="0" y="${d+b*u+36}" font-size="16" fill="#1c2834">${g(p)}</text>`).join("");return`<svg class="chart" viewBox="0 0 ${a} ${h}" role="img" aria-label="岗位时间线">${j}${y}${f}</svg>`}const z=document.querySelector("#app");if(!z)throw new Error("缺少页面根节点");const ge=[["home","首页"],["profile","资料"],["timeline","时间线"],["plan","计划"],["study","学习"]],G=["国考","湖北省考","湖北普通选调","湖北事业编","武汉事业编","军队文职"],Q=["考点在武汉","地点在武汉","主考区在武汉","湖北考区在武汉","考点含武汉"];function $e(){return location.hash.replace("#","")||"home"}function k(){const n=B(),[t,e="",s=""]=$e().split("/"),i=t==="scores"||t==="board"?"study":t;z.innerHTML=`
    <header class="top">
      <button class="brand" type="button" data-go="home">${Z()}RUO的求职系统</button>
      <nav class="nav">${ge.map(([o,c])=>`<button data-go="${o}" class="${i===o?"active":""}">${c}</button>`).join("")}</nav>
    </header>
    <main class="wrap">${be(n,t,e,s)}</main>`,z.querySelectorAll("[data-go]").forEach(o=>{o.onclick=()=>{location.hash=o.dataset.go??"profile"}}),Me(n,t,e,s)}function x(n){ue(n(B()))}function Z(){return'<svg class="bow" viewBox="0 0 22 16" aria-hidden="true"><path d="M11 8 C8 2 2 2 2 8 C2 14 8 14 11 8 C14 2 20 2 20 8 C20 14 14 14 11 8" fill="#8ec8ea"/><circle cx="11" cy="8" r="2" fill="#fff"/></svg>'}function be(n,t,e,s){return t==="home"?ye(n):t==="timeline"?ke(n):t==="plan"?Se(n,e,s):t==="study"||t==="scores"||t==="board"?we(n):ve(n)}function ye(n){const t=q(new Date),e=[...n.events].filter(l=>l.end>=t).sort((l,u)=>l.start.localeCompare(u.start))[0],s=F(t),i=n.tasks.filter(l=>s.includes(l.date)),o=[...n.scores].sort((l,u)=>l.date.localeCompare(u.date)).at(-1),c=n.resume.filter(l=>l.image),a=n.profile.name?`${n.profile.name}，今天也要加油！Offer来来来`:"今天也要加油！Offer来来来";return`
    <h1>${Z()} ${g(a)}</h1>
    <p class="sub">${g(n.profile.gradSchool)} ${g(n.profile.gradMajor)} · ${g(n.profile.gradYear)}届</p>
    <div class="home-grid">
      <section class="card">
        <h2>下一场</h2>
        ${e?`<div class="stat">${g(e.name)} ${g(e.type)}</div><p class="muted">${g(e.start)} · ${g(e.place)} · ${g(e.identity)}</p><button class="btn" data-go="timeline">看时间线</button>`:'<p class="muted">时间线上还没有今天之后的考试。</p>'}
      </section>
      <section class="card">
        <h2>本周</h2>
        <div class="stat">${ee(i)}</div>
        <p class="muted">任务完成</p>
        <button class="btn" data-go="plan">去日历</button>
      </section>
    </div>
    <div class="home-grid">
      <section class="card">
        <h2>最近一次分数</h2>
        ${o?`<div class="stat">${o.score}/${o.full}</div><p class="muted">${g(o.date)} ${g(o.subject)} ${g(o.module)} ${g(o.kind)}</p>${te([o.score/o.full],[o.date.slice(5)])}`:'<p class="muted">还没有分数。</p>'}
        <button class="btn" data-go="study">看学习</button>
      </section>
      <section class="card">
        <h2>奖项和证明</h2>
        ${c.length?`<div class="gallery">${c.map(l=>`<img src="${l.image}" alt="${g(l.title)}"/>`).join("")}</div>`:'<p class="muted">在资料页给奖项或证明加上图片后，会显示在这里。</p>'}
      </section>
    </div>`}function ve(n){const t=n.profile,e=(s,i,o)=>`<label>${i}<input name="${s}" value="${g(o)}"/></label>`;return`
    <h1>资料与简历</h1>
    <p class="sub">存在这台浏览器里。导出计划时不会带上姓名和简历。</p>
    <form id="profile" class="card grid">
      ${e("name","姓名",t.name)}
      ${e("gender","性别",t.gender)}
      ${e("politics","政治面貌",t.politics)}
      ${e("undergradSchool","本科院校",t.undergradSchool)}
      ${e("undergradMajor","本科专业",t.undergradMajor)}
      ${e("gradSchool","硕士院校",t.gradSchool)}
      ${e("gradMajor","硕士专业",t.gradMajor)}
      ${e("gradYear","毕业年份",t.gradYear)}
      ${e("hukou","户籍",t.hukou)}
      ${e("english","英语",t.english)}
      ${e("cities","目标城市",t.cities)}
      <div>
        <span class="muted">求职方向</span>
        <span class="checks">${le.map(s=>`<label><input type="checkbox" name="track" value="${s}" ${t.tracks.includes(s)?"checked":""}/> ${s}</label>`).join("")}</span>
      </div>
      <p id="profile-msg" class="muted">改完会自动保存。</p>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${de.map(s=>`<option>${s}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <label>奖项或证明图片<input name="image" type="file" accept="image/*"/></label>
        <div class="row"><button class="btn primary" id="resume-save" type="submit">添加</button></div>
        <p id="resume-msg" class="error"></p>
      </form>
      <table>
        <thead><tr><th></th><th>类型</th><th>时间</th><th>标题</th><th>说明</th><th></th></tr></thead>
        <tbody>${n.resume.length?n.resume.map(s=>`<tr>
                    <td>${s.image?`<img class="thumb" src="${s.image}" alt=""/>`:""}</td>
                    <td>${g(s.kind)}</td><td>${g(s.time)}</td><td>${g(s.title)}</td><td>${g(s.detail)}</td>
                    <td><button class="btn" type="button" data-edit-resume="${s.id}">修改</button> <button class="btn danger" data-del-resume="${s.id}">删除</button></td>
                  </tr>`).join(""):'<tr><td colspan="6" class="muted">还没有简历条目。</td></tr>'}</tbody>
      </table>
    </section>`}function N(n,t){return`<div class="chips">${n.map(e=>`<button type="button" class="btn" data-${t}="${g(e)}">${g(e)}</button>`).join("")}</div>`}function ke(n){const t=q(new Date),e=[...new Set([...G,...n.events.map(o=>o.name)])],s=[...new Set([...Q,...n.events.map(o=>o.place)])],i=[...n.events].sort((o,c)=>o.start.localeCompare(c.start));return`
    <div class="row">
      <h1>时间线</h1>
      <button class="btn" id="export-timeline" type="button">导出</button>
      <button class="btn" id="import-timeline" type="button">导入</button>
      <input id="timeline-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">条的长短是天数。实心是已公布，虚线是对标去年，红色是笔试和面试。</p>
    <p id="timeline-msg" class="error"></p>
    <section class="card timeline-chart">${fe(n.events)}</section>
    <div class="split">
      <section class="card">
        <h2>加一个节点</h2>
        ${N(e,"exam-name")}
        <label>其他考试<input id="event-name" placeholder="不在上面就写在这里"/></label>
        ${N(X,"exam-identity")}
        ${N(W,"exam-type")}
        ${N(V,"exam-status")}
        ${N(s,"exam-place")}
        <label>其他地点<input id="event-place" placeholder="不在上面就写在这里"/></label>
        <div class="row">
          <label>开始<input id="event-start" type="date" value="${t}"/></label>
          <label>结束<input id="event-end" type="date" value="${t}"/></label>
        </div>
        <button class="btn primary" type="button" id="add-event">加到时间线</button>
      </section>
      <aside class="card">
        <h2>已有节点</h2>
        ${i.length?i.map(o=>`<div class="score-line"><button class="link" type="button" data-edit-event="${o.id}">${g(o.start.slice(5))} ${g(o.name)} ${g(o.type)} ${g(o.status)}</button><button class="btn danger" data-del-event="${o.id}">删除</button></div>`).join(""):'<p class="muted">还没有考试节点。</p>'}
      </aside>
    </div>`}function Se(n,t,e){const s=q(new Date),i=t||s.slice(0,7),{year:o,month:c}=_(i),a=e||s,l=H(n,o,c),u=F(a),h=n.tasks.filter(r=>O(r.date,o,c)).filter(r=>r.done).reduce((r,f)=>r+f.minutes,0)/60,m=l.goals.reduce((r,f)=>r+f.targetHours,0),$=ee(n.tasks.filter(r=>u.includes(r.date)));return`
    <div class="row">
      <h1>${o}年${c}月</h1>
      <label>月份<input id="month-pick" type="month" value="${L(o,c)}"/></label>
      <button class="btn" id="export-plan" type="button">导出</button>
      <button class="btn" id="import-plan" type="button">导入</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p class="sub">本月 ${h.toFixed(1)} / ${m} 小时 · 本周 ${$}。深蓝点是行测，浅蓝点是申论，黄点是面试。</p>
    <p id="plan-msg" class="error"></p>
    <div class="split">
      <section class="card">
        ${xe(n,o,c,a)}
      </section>
      <aside class="card">
        <h2>${a.slice(5)} 的任务</h2>
        ${je(n,a)}
        <h2>加上一项</h2>
        <div class="chips" id="subject-chips">${T.map(r=>`<button type="button" class="btn" data-pick-subject="${r}">${r}</button>`).join("")}</div>
        <div class="chips" id="module-chips"></div>
        <div class="chips">${[20,40,60].map(r=>`<button type="button" class="btn" data-pick-minutes="${r}">${r}分钟</button>`).join("")}</div>
        <button class="btn primary" type="button" id="add-task">加到这一天</button>
        <h2>月目标</h2>
        ${l.goals.map(r=>`<div class="row"><span>${r.subject}</span>${[2,4,8,12].map(f=>`<button type="button" class="btn ${r.targetHours===f?"primary":""}" data-hours="${f}" data-subject="${r.subject}">${f}</button>`).join("")}</div>`).join("")}
        <button class="btn" type="button" id="split-week">拆到本周工作日</button>
      </aside>
    </div>`}function xe(n,t,e,s){const i=(new Date(t,e-1,1).getDay()+6)%7,o=q(new Date),c=Array.from({length:i},()=>'<div class="cal empty"></div>').join(""),a=Array.from({length:ae(t,e)},(l,u)=>{const d=u+1,h=`${t}-${I(e)}-${I(d)}`,m=[...new Set(n.tasks.filter(r=>r.date===h).map(r=>r.subject))];return`<button class="cal ${[h===s?"selected":"",h===o?"today":""].filter(Boolean).join(" ")}" data-day="${h}"><span>${d}</span><span class="dots">${m.map(r=>`<i class="dot ${r}"></i>`).join("")}</span></button>`}).join("");return`<div class="cal-head">${"一二三四五六日".split("").map(l=>`<span>周${l}</span>`).join("")}</div><div class="cal-grid">${c}${a}</div>`}function je(n,t){const e=n.tasks.filter(s=>s.date===t);return e.length?e.map(s=>`<div class="row">
        <label class="task ${s.done?"done":""}"><input type="checkbox" data-task="${s.id}" ${s.done?"checked":""}/> ${g(s.subject)} ${g(s.module)} ${s.minutes}分钟</label>
        <button class="btn danger" data-del-task="${s.id}">删除</button>
      </div>`).join(""):'<p class="muted">这一天还没有任务。</p>'}function ee(n){return n.length?`${n.filter(e=>e.done).length}/${n.length}`:"还没有任务"}function we(n){const t=new Date,e=n.scores.filter(a=>O(a.date,t.getFullYear(),t.getMonth()+1)),s=T.map(a=>{const l=e.filter(m=>m.subject===a&&m.full>0),u=l.length?l.reduce((m,$)=>m+$.score/$.full,0)/l.length:0,d=[...n.scores].filter(m=>m.subject===a).sort((m,$)=>$.date.localeCompare(m.date))[0],h=n.scores.filter(m=>m.subject===a).sort((m,$)=>m.date.localeCompare($.date));return{subject:a,average:u,latest:d,series:h}}),i=n.tasks.filter(a=>O(a.date,t.getFullYear(),t.getMonth()+1)),o=i.filter(a=>a.done).length,c=Ee(n);return`
    <h1>学习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <div class="quad">
      <section class="card"><div class="stat">${i.length?Math.round(o/i.length*100):0}%</div><p class="muted">本月完成 ${o}/${i.length}</p></section>
      ${s.map(a=>`<section class="card"><h2>${a.subject}</h2><div class="stat">${a.latest?`${a.latest.score}/${a.latest.full}`:"—"}</div><p class="muted">最近一次 · 本月平均 ${a.average?Math.round(a.average*100)+"%":"还没有"}</p></section>`).join("")}
    </div>
    <div class="split">
      <section class="card">
        ${s.map(a=>a.series.length?`<h2>${a.subject}</h2>${te(a.series.map(l=>l.score/l.full),a.series.map(l=>l.date.slice(5)),120)}`:"").join("")}
        <h2>模块得分率</h2>
        ${c.length?qe(c):'<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>'}
        <h2>分数</h2>
        ${n.scores.length?[...n.scores].sort((a,l)=>l.date.localeCompare(a.date)).map(a=>`<div class="score-line"><button class="link" type="button" data-edit-score="${a.id}">${g(a.date)} ${g(a.kind)} ${g(a.subject)} ${g(a.module)}</button><span>${a.score}/${a.full} <button class="btn danger" data-del-score="${a.id}">删除</button></span></div>`).join(""):'<p class="muted">还没有分数。</p>'}
      </section>
      <aside class="card">
        <h2>记一笔</h2>
        <div class="chips" id="score-kind">${["模考","练习"].map(a=>`<button type="button" class="btn" data-score-kind="${a}">${a}</button>`).join("")}</div>
        <div class="chips" id="score-subject">${T.map(a=>`<button type="button" class="btn" data-score-subject="${a}">${a}</button>`).join("")}</div>
        <div class="chips" id="score-module"></div>
        <div class="row">
          <label>得分<input id="score-value" type="number" min="0" step="0.1"/></label>
          <label>满分<input id="score-full" type="number" min="1" step="0.1" value="100"/></label>
        </div>
        <button class="btn primary" type="button" id="save-score">记下</button>
      </aside>
    </div>`}function te(n,t,e=160){const o=n.map((a,l)=>{const u=28+l*464/Math.max(n.length-1,1),d=16+(1-a)*(e-48);return`${u},${d}`}),c=o.map((a,l)=>{const[u,d]=a.split(",");return`<circle cx="${u}" cy="${d}" r="3" fill="#1e3a5f"/><text x="${u}" y="${e-8}" text-anchor="middle" font-size="10" fill="#5c6b7a">${g(t[l]??"")}</text>`}).join("");return`<svg viewBox="0 0 520 ${e}" class="chart" role="img" aria-label="分数折线"><polyline fill="none" stroke="#1e3a5f" stroke-width="2" points="${o.join(" ")}"/>${c}</svg>`}function qe(n){const e=n.length*36+10,s=n.map((i,o)=>{const c=10+o*36,a=Math.max(4,i.ratio*280);return`<text x="0" y="${c+14}" font-size="12" fill="#1c2834">${g(i.module)}</text>
        <rect x="90" y="${c}" width="${a}" height="16" fill="${o<2?"#b23a3a":"#1e3a5f"}"/>
        <text x="${96+a}" y="${c+13}" font-size="12" fill="#5c6b7a">${Math.round(i.ratio*100)}%</text>`}).join("");return`<svg viewBox="0 0 420 ${e}" class="chart" role="img" aria-label="模块正确率">${s}</svg>`}function Ee(n){const t=new Map;for(const e of n.scores){if(!e.module||e.full<=0)continue;const s=`${e.subject}	${e.module}`,i=t.get(s)??[];i.push(e.score/e.full),t.set(s,i)}return[...t.entries()].map(([e,s])=>{const[i,o]=e.split("	"),c=s.slice(-3),a=c.reduce((l,u)=>l+u,0)/c.length;return{subject:i,module:o,ratio:a}}).sort((e,s)=>e.ratio-s.ratio)}function Me(n,t,e,s){t==="profile"&&De(n),t==="timeline"&&Ne(n),t==="plan"&&Ce(n,e,s),(t==="study"||t==="scores"||t==="board")&&Ie(n)}function Ae(n,t){const e=new FormData(n);return{...t,profile:{...t.profile,name:String(e.get("name")??""),gender:String(e.get("gender")??""),politics:String(e.get("politics")??""),undergradSchool:String(e.get("undergradSchool")??""),undergradMajor:String(e.get("undergradMajor")??""),gradSchool:String(e.get("gradSchool")??""),gradMajor:String(e.get("gradMajor")??""),gradYear:String(e.get("gradYear")??""),hukou:String(e.get("hukou")??""),english:String(e.get("english")??""),cities:String(e.get("cities")??""),tracks:e.getAll("track").map(String)}}}function De(n){const t=document.querySelector("#profile"),e=()=>{const c=document.querySelector("#profile-msg");try{x(a=>Ae(t,a)),c&&(c.textContent="已保存")}catch(a){c&&(c.textContent=a instanceof Error?a.message:"没有存上")}};t.addEventListener("input",e),t.addEventListener("change",e),t.onsubmit=c=>{c.preventDefault(),e()};const s=document.querySelector("#resume"),i=document.querySelector("#resume-save");let o="";document.querySelectorAll("[data-edit-resume]").forEach(c=>{c.onclick=()=>{const a=n.resume.find(l=>l.id===c.dataset.editResume);a&&(o=a.id,s.elements.namedItem("kind").value=a.kind,s.elements.namedItem("time").value=a.time,s.elements.namedItem("title").value=a.title,s.elements.namedItem("detail").value=a.detail,i.textContent="保存修改")}}),s.onsubmit=async c=>{c.preventDefault();const a=new FormData(s),l=a.get("image"),u=document.querySelector("#resume-msg");try{let d="";l instanceof File&&l.size>0&&(d=await re(l));const h=String(a.get("title")??"").trim();if(!h)return;x(m=>{const $=m.resume.find(y=>y.id===o),r={id:o||A(),kind:String(a.get("kind")),time:String(a.get("time")??""),title:h,detail:String(a.get("detail")??""),image:d||($==null?void 0:$.image)||""},f=o?m.resume.map(y=>y.id===o?r:y):[...m.resume,r];return{...m,resume:f}}),k()}catch(d){u&&(u.textContent=d instanceof Error?d.message:"图片没有存上，换一张小一点的试试")}},document.querySelectorAll("[data-del-resume]").forEach(c=>{c.onclick=()=>{x(a=>({...a,resume:a.resume.filter(l=>l.id!==c.dataset.delResume)})),k()}})}function Ne(n){let t=G[0],e=X[0],s=W[0],i=V[0],o=Q[0];const c=(d,h,m)=>{document.querySelectorAll(d).forEach($=>{$.classList.toggle("primary",$.dataset[m]===h)})},a=(d,h,m,$)=>{document.querySelectorAll(d).forEach(r=>{r.onclick=()=>{const f=r.dataset[h]??$;m(f),c(d,f,h)}}),c(d,$,h)};a("[data-exam-name]","examName",d=>t=d,t),a("[data-exam-identity]","examIdentity",d=>e=d,e),a("[data-exam-type]","examType",d=>s=d,s),a("[data-exam-status]","examStatus",d=>i=d,i),a("[data-exam-place]","examPlace",d=>o=d,o);let l="";const u=document.querySelector("#add-event");document.querySelectorAll("[data-edit-event]").forEach(d=>{d.onclick=()=>{const h=n.events.find(m=>m.id===d.dataset.editEvent);h&&(l=h.id,t=h.name,e=h.identity,s=h.type,i=h.status,o=h.place,c("[data-exam-name]",t,"examName"),c("[data-exam-identity]",e,"examIdentity"),c("[data-exam-type]",s,"examType"),c("[data-exam-status]",i,"examStatus"),c("[data-exam-place]",o,"examPlace"),document.querySelector("#event-name").value="",document.querySelector("#event-place").value="",document.querySelector("#event-start").value=h.start,document.querySelector("#event-end").value=h.end,u.textContent="保存修改")}}),u.onclick=()=>{const d=document.querySelector("#event-name").value.trim(),h=document.querySelector("#event-place").value.trim(),m=document.querySelector("#event-start").value,$=document.querySelector("#event-end").value||m;if(!m)return;const r={id:l||A(),name:d||t,identity:e,place:h||o,type:s,status:i,start:m,end:$<m?m:$};x(f=>({...f,events:l?f.events.map(y=>y.id===l?r:y):[...f.events,r]})),k()},document.querySelectorAll("[data-del-event]").forEach(d=>{d.onclick=()=>{x(h=>({...h,events:h.events.filter(m=>m.id!==d.dataset.delEvent)})),k()}}),document.querySelector("#export-timeline").onclick=()=>ne("时间线.json",me(n)),se("#import-timeline","#timeline-file","#timeline-msg")}function Ce(n,t,e){const s=q(new Date),i=t||s.slice(0,7),{year:o,month:c}=_(i),a=e||s;document.querySelector("#month-pick").onchange=r=>{location.hash=`plan/${r.currentTarget.value}`},document.querySelectorAll("[data-day]").forEach(r=>{r.onclick=()=>{location.hash=`plan/${L(o,c)}/${r.dataset.day}`}});let l="行测",u=M.行测[0],d=40;const h=document.querySelector("#module-chips"),m=(r,f,y)=>{document.querySelectorAll(r).forEach(j=>{j.classList.toggle("primary",j.dataset[y]===f)})},$=()=>{h.innerHTML=M[l].map(r=>`<button type="button" class="btn" data-pick-module="${r}">${r}</button>`).join(""),h.querySelectorAll("[data-pick-module]").forEach(r=>{r.onclick=()=>{u=r.dataset.pickModule??u,m("[data-pick-module]",u,"pickModule")}}),m("[data-pick-module]",u,"pickModule")};document.querySelectorAll("[data-pick-subject]").forEach(r=>{r.onclick=()=>{l=r.dataset.pickSubject,u=M[l][0],m("[data-pick-subject]",l,"pickSubject"),$()}}),document.querySelectorAll("[data-pick-minutes]").forEach(r=>{r.onclick=()=>{d=Number(r.dataset.pickMinutes),m("[data-pick-minutes]",String(d),"pickMinutes")}}),m("[data-pick-subject]",l,"pickSubject"),m("[data-pick-minutes]",String(d),"pickMinutes"),$(),document.querySelectorAll("[data-hours]").forEach(r=>{r.onclick=()=>{const f=r.dataset.subject,y=Number(r.dataset.hours);x(j=>{const p=C(j,o,c);return{...p,months:p.months.map(b=>b.year===o&&b.month===c?{...b,goals:b.goals.map(v=>v.subject===f?{...v,targetHours:y}:v)}:b)}}),k()}}),document.querySelector("#split-week").onclick=()=>{const r=C(B(),o,c),f=H(r,o,c),y=[0,1,2,3,4].map(p=>J(F(a)[0],p)),j=f.goals.filter(p=>p.targetHours>0).flatMap(p=>y.map(b=>({id:A(),date:b,subject:p.subject,module:M[p.subject][0],title:p.note||`${p.subject}练习`,minutes:Math.max(20,Math.round(p.targetHours*60/4/y.length)),done:!1})));x(p=>{const b=C(p,o,c);return{...b,tasks:[...b.tasks,...j]}}),k()},document.querySelector("#add-task").onclick=()=>{x(r=>{const f=C(r,o,c);return{...f,tasks:[...f.tasks,{id:A(),date:a,subject:l,module:u,title:`${u}练习`,minutes:d,done:!1}]}}),k()},document.querySelectorAll("[data-task]").forEach(r=>{r.onchange=()=>{x(f=>({...f,tasks:f.tasks.map(y=>y.id===r.dataset.task?{...y,done:r.checked}:y)})),k()}}),document.querySelectorAll("[data-del-task]").forEach(r=>{r.onclick=()=>{x(f=>({...f,tasks:f.tasks.filter(y=>y.id!==r.dataset.delTask)})),k()}}),document.querySelector("#export-plan").onclick=()=>ne(`计划-${L(o,c)}.json`,pe(n,o,c)),se("#import-plan","#plan-file","#plan-msg")}function Ie(n){let t="模考",e="行测",s=M.行测[0];const i=document.querySelector("#score-module"),o=(u,d,h)=>{document.querySelectorAll(u).forEach(m=>{m.classList.toggle("primary",m.dataset[h]===d)})},c=()=>{i.innerHTML=M[e].map(u=>`<button type="button" class="btn" data-score-module="${u}">${u}</button>`).join(""),i.querySelectorAll("[data-score-module]").forEach(u=>{u.onclick=()=>{s=u.dataset.scoreModule??s,o("[data-score-module]",s,"scoreModule")}}),o("[data-score-module]",s,"scoreModule")};document.querySelectorAll("[data-score-kind]").forEach(u=>{u.onclick=()=>{t=u.dataset.scoreKind,o("[data-score-kind]",t,"scoreKind")}}),document.querySelectorAll("[data-score-subject]").forEach(u=>{u.onclick=()=>{e=u.dataset.scoreSubject,s=M[e][0],o("[data-score-subject]",e,"scoreSubject"),c()}}),o("[data-score-kind]",t,"scoreKind"),o("[data-score-subject]",e,"scoreSubject"),c();let a="";const l=document.querySelector("#save-score");document.querySelectorAll("[data-edit-score]").forEach(u=>{u.onclick=()=>{const d=n.scores.find(h=>h.id===u.dataset.editScore);d&&(a=d.id,t=d.kind,e=d.subject,s=d.module,o("[data-score-kind]",t,"scoreKind"),o("[data-score-subject]",e,"scoreSubject"),c(),document.querySelector("#score-value").value=String(d.score),document.querySelector("#score-full").value=String(d.full),l.textContent="保存修改")}}),l.onclick=()=>{var m,$;const u=Number(document.querySelector("#score-value").value),d=Number(document.querySelector("#score-full").value||100);if(!Number.isFinite(u)||!Number.isFinite(d)||d<=0)return;const h={id:a||A(),date:((m=n.scores.find(r=>r.id===a))==null?void 0:m.date)??q(new Date),kind:t,subject:e,module:s,score:u,full:d,minutes:(($=n.scores.find(r=>r.id===a))==null?void 0:$.minutes)??0};x(r=>({...r,scores:a?r.scores.map(f=>f.id===a?{...h,date:f.date,minutes:f.minutes}:f):[...r.scores,h]})),k()},document.querySelectorAll("[data-del-score]").forEach(u=>{u.onclick=()=>{x(d=>({...d,scores:d.scores.filter(h=>h.id!==u.dataset.delScore)})),k()}})}function ne(n,t){const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(e),s.download=n,s.click(),URL.revokeObjectURL(s.href)}function se(n,t,e){const s=document.querySelector(n),i=document.querySelector(t),o=document.querySelector(e);!s||!i||!o||(s.onclick=()=>i.click(),i.onchange=async()=>{var a;const c=(a=i.files)==null?void 0:a[0];if(c)try{const l=JSON.parse(await c.text());x(u=>he(u,l)),k()}catch(l){o.textContent=l instanceof Error?l.message:"导入失败"}})}history.replaceState(null,"",`${location.pathname}${location.search}#home`);window.addEventListener("hashchange",k);k();
