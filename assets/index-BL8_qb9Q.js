(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();function M(t){return String(t).padStart(2,"0")}function E(t){return`${t.getFullYear()}-${M(t.getMonth()+1)}-${M(t.getDate())}`}function L(t){const[n,e,o]=t.split("-").map(Number);return new Date(n,e-1,o)}function O(t,n){return`${t}-${M(n)}`}function B(t){const[n,e]=t.split("-").map(Number);return{year:n,month:e}}function Q(t,n){return new Date(t,n,0).getDate()}function J(t){const n=L(t),e=(n.getDay()+6)%7;return n.setDate(n.getDate()-e),n}function K(t,n){const e=L(t);return e.setDate(e.getDate()+n),E(e)}function z(t){const n=E(J(t));return Array.from({length:7},(e,o)=>K(n,o))}function Z(t,n){`${t}${M(n)}`;const e=Q(t,n),o=new Set,s=[];for(let a=1;a<=e;a+=1){const r=E(J(`${t}-${M(n)}-${M(a)}`));o.has(r)||(o.add(r),s.push(r))}return s}function W(t,n,e){const o=L(t);return o.getFullYear()===n&&o.getMonth()+1===e}function tt(t){return"一二三四五六日"[(L(t).getDay()+6)%7]}function d(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function k(t,n,e,o,s,a,r){return{id:crypto.randomUUID(),name:t,identity:n,place:e,start:o,end:s,type:a,status:r}}function P(){return{profile:{name:"",gender:"女",politics:"共青团员",undergradSchool:"中南财经政法大学",undergradMajor:"经济学",gradSchool:"中南财经政法大学",gradMajor:"数字经济",gradYear:"2027",hukou:"湖北黄冈",english:"CET-6 500",cities:"武汉",tracks:["国考","省考","事业编","选调"]},resume:[],events:[k("国考","应届公务员","考点在武汉","2026-10-15","2026-10-24","报名","已公布"),k("国考","应届公务员","考点在武汉","2026-11-01","2026-11-06","缴费","已公布"),k("国考","应届公务员","考点在武汉","2026-11-29","2026-11-29","笔试","已公布"),k("军队文职","文职人员","湖北考区在武汉","2026-11-03","2026-11-09","报名","对标去年"),k("军队文职","文职人员","湖北考区在武汉","2026-12-14","2026-12-14","笔试","对标去年"),k("湖北省考","应届公务员","主考区在武汉","2027-01-13","2027-01-19","报名","对标去年"),k("湖北省考","应届公务员","主考区在武汉","2027-03-14","2027-03-15","笔试","对标去年"),k("湖北普通选调","普通选调","考点在武汉","2027-01-13","2027-01-20","报名","对标去年"),k("湖北普通选调","普通选调","考点在武汉","2027-03-14","2027-03-14","笔试","对标去年"),k("湖北事业编","事业编制","考点含武汉","2027-02-03","2027-02-10","报名","对标去年"),k("湖北事业编","事业编制","考点含武汉","2027-03-28","2027-03-29","笔试","对标去年"),k("武汉事业编","事业编制","地点在武汉","2027-09-15","2027-09-22","报名","对标去年"),k("武汉事业编","事业编制","地点在武汉","2027-10-25","2027-10-25","笔试","对标去年")],months:[],tasks:[],scores:[]}}const T=["行测","申论","面试"],A={行测:["言语","数量","判断","资料","常识"],申论:["归纳概括","综合分析","提出对策","应用文","大作文"],面试:["综合分析","组织计划","应急应变","人际关系","岗位匹配"]},et=["国考","省考","事业编","选调"],nt=["教育","实习","奖项","技能"],ot=["应届公务员","普通选调","文职人员","事业编制","服务基层"],st=["报名","缴费","笔试","面试"],rt=["已公布","对标去年"],U="qiuzhi-v1";function at(){const t=localStorage.getItem(U);if(!t){const e=P();return localStorage.setItem(U,JSON.stringify(e)),e}const n=JSON.parse(t);return{...P(),...n,profile:{...P().profile,...n.profile},resume:n.resume??[],events:n.events??[],months:n.months??[],tasks:n.tasks??[],scores:n.scores??[]}}function w(t){localStorage.setItem(U,JSON.stringify(t))}function D(){return crypto.randomUUID()}function H(t,n,e){return t.months.find(o=>o.year===n&&o.month===e)??{year:n,month:e,goals:T.map(o=>({subject:o,targetHours:0,note:""}))}}function I(t,n,e){return t.months.some(o=>o.year===n&&o.month===e)?t:{...t,months:[...t.months,{year:n,month:e,goals:T.map(o=>({subject:o,targetHours:0,note:""}))}]}}function lt(t){return{kind:"qiuzhi-timeline",version:1,events:t.events}}function it(t,n,e){const o=H(t,n,e),s=`${n}-${String(e).padStart(2,"0")}`;return{kind:"qiuzhi-plan",version:1,year:n,month:e,goals:o.goals,tasks:t.tasks.filter(a=>a.date.startsWith(s)).map(({date:a,subject:r,module:u,title:p,minutes:m})=>({date:a,subject:r,module:u,title:p,minutes:m}))}}function ct(t,n){if(!n||typeof n!="object")throw new Error("文件不是求职系统导出的内容");const e=n;if(e.kind==="qiuzhi-timeline"&&e.version===1&&Array.isArray(e.events)){const o=e.events.map(s=>({...s,id:D()}));return{...t,events:[...t.events,...o]}}if(e.kind==="qiuzhi-plan"&&e.version===1){const o=I(t,e.year,e.month),s=o.months.map(r=>r.year===e.year&&r.month===e.month?{...r,goals:e.goals}:r),a=e.tasks.map(r=>({...r,id:D(),done:!1}));return{...o,months:s,tasks:[...o.tasks,...a]}}throw new Error("文件不是时间线或复习计划")}function R(t,n){return t*12+n}function ut(t){if(t.length===0)return'<p class="muted">还没有考试节点。</p>';const e=[...new Set(t.map(l=>l.start.slice(0,7)))].sort().map(l=>{const[g,b]=l.split("-").map(Number);return{year:g,month:b,days:new Date(g,b,0).getDate()}}),o=[];e.forEach((l,g)=>{if(g>0){const b=e[g-1];R(l.year,l.month)-R(b.year,b.month)>1&&o.push({gap:!0})}o.push(l)});const s=132,a=28,r=108,u=s+o.reduce((l,g)=>l+("gap"in g?a:r),0)+16,p=[...new Set(t.map(l=>l.name))],m=46,i=28,h=i+p.length*m+36,y=[];let S=s;for(const l of o)"gap"in l?(y.push({kind:"gap",x:S,width:a}),S+=a):(y.push({kind:"month",...l,x:S,width:r}),S+=r);const f=l=>{const[g,b,q]=l.split("-").map(Number),N=y.find(j=>j.kind==="month"&&j.year===g&&j.month===b);return N?N.x+(q-1)/N.days*N.width:s},c=t.map(l=>{const g=i+p.indexOf(l.name)*m+8,b=f(l.start),q=Math.max(f(l.end)+4,b+3),j=l.type==="笔试"||l.type==="面试"?"#b23a3a":"#1e3a5f",Y=l.status==="对标去年",C=q-b>36?l.type:"",G=C===""?`<text x="${q+4}" y="${g+14}" font-size="11" fill="${j}">${d(l.type)}</text>`:`<text x="${(b+q)/2}" y="${g+13}" text-anchor="middle" font-size="11" fill="${Y?j:"#fff"}">${d(C)}</text>`;return(Y?`<rect x="${b}" y="${g}" width="${q-b}" height="18" rx="2" fill="none" stroke="${j}" stroke-dasharray="3 2"/>`:`<rect x="${b}" y="${g}" width="${q-b}" height="18" rx="2" fill="${j}"/>`)+G}).join(""),x=y.map(l=>{if(l.kind==="gap")return`<text x="${l.x+l.width/2}" y="${h-8}" text-anchor="middle" font-size="10" fill="#8b97a3">空档</text>`;const g=l.month===1||l.month===10?`${l.year}年${l.month}月`:`${l.month}月`;return`<text x="${l.x+l.width/2}" y="${h-8}" text-anchor="middle" font-size="12" fill="#3e4c59">${g}</text>`}).join(""),v=p.map((l,g)=>`<text x="0" y="${i+g*m+22}" font-size="13" fill="#1c2834">${d(l)}</text>`).join("");return`<svg class="chart" viewBox="0 0 ${u} ${h}" role="img" aria-label="岗位时间线">${v}${x}${c}</svg>`}const F=document.querySelector("#app");if(!F)throw new Error("缺少页面根节点");const dt=[["profile","资料"],["timeline","时间线"],["plan","计划"],["scores","记分"],["board","学习"]];function pt(){return location.hash.replace("#","")||"profile"}function $(){const t=at(),[n,e="",o=""]=pt().split("/");F.innerHTML=`
    <header class="top">
      <div class="brand">泛体制求职</div>
      <nav class="nav">${dt.map(([s,a])=>`<button data-go="${s}" class="${n===s?"active":""}">${a}</button>`).join("")}</nav>
    </header>
    <main class="wrap">${mt(t,n,e,o)}</main>`,F.querySelectorAll("[data-go]").forEach(s=>{s.onclick=()=>{location.hash=s.dataset.go??"profile"}}),jt(t,n,e,o)}function mt(t,n,e,o){return n==="timeline"?ft(t):n==="plan"?gt(t,e,o):n==="scores"?yt(t):n==="board"?St(t):ht(t)}function ht(t){const n=t.profile,e=(o,s,a)=>`<label>${s}<input name="${o}" value="${d(a)}"/></label>`;return`
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
      <label>目标通道
        <span class="checks">${et.map(o=>`<label><input type="checkbox" name="track" value="${o}" ${n.tracks.includes(o)?"checked":""}/> ${o}</label>`).join("")}</span>
      </label>
      <div class="row"><button class="btn primary" type="submit">保存资料</button></div>
    </form>
    <section class="card">
      <h2>简历条目</h2>
      <form id="resume" class="grid">
        <label>类型<select name="kind">${nt.map(o=>`<option>${o}</option>`).join("")}</select></label>
        <label>时间<input name="time" placeholder="2024.09-2027.06"/></label>
        <label>标题<input name="title" required/></label>
        <label>说明<input name="detail"/></label>
        <div class="row"><button class="btn primary" type="submit">添加</button></div>
      </form>
      <table>
        <thead><tr><th>类型</th><th>时间</th><th>标题</th><th>说明</th><th></th></tr></thead>
        <tbody>${t.resume.length?t.resume.map(o=>`<tr>
                    <td>${d(o.kind)}</td><td>${d(o.time)}</td><td>${d(o.title)}</td><td>${d(o.detail)}</td>
                    <td><button class="btn danger" data-del-resume="${o.id}">删除</button></td>
                  </tr>`).join(""):'<tr><td colspan="5" class="muted">还没有简历条目。</td></tr>'}</tbody>
      </table>
    </section>`}function ft(t){const n=(e,o="")=>e.map(s=>`<option ${s===o?"selected":""}>${s}</option>`).join("");return`
    <h1>岗位时间线</h1>
    <p class="sub">只放你要考的节点。条的长短是天数，笔试为红色，对标去年为虚线。</p>
    <div class="card">${ut(t.events)}</div>
    <form id="event" class="card grid">
      <label>考试<input name="name" required placeholder="国考"/></label>
      <label>身份<select name="identity">${n(ot)}</select></label>
      <label>地点或考点<input name="place" placeholder="考点在武汉"/></label>
      <label>类型<select name="type">${n(st)}</select></label>
      <label>状态<select name="status">${n(rt)}</select></label>
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
            <td>${d(e.name)}</td><td>${d(e.identity)}</td><td>${d(e.place)}</td>
            <td>${d(e.type)}</td><td>${d(e.start)} 至 ${d(e.end)}</td><td>${d(e.status)}</td>
            <td><button class="btn danger" data-del-event="${e.id}">删除</button></td>
          </tr>`).join("")}</tbody>
    </table>`}function gt(t,n,e){const o=E(new Date),s=n||o.slice(0,7),{year:a,month:r}=B(s),u=e||o,p=H(t,a,r),m=Z(a,r),i=z(u)[0],h=z(u),S=t.tasks.filter(c=>W(c.date,a,r)).filter(c=>c.done).reduce((c,x)=>c+x.minutes,0)/60,f=p.goals.reduce((c,x)=>c+x.targetHours,0);return`
    <h1>${a}年${r}月计划</h1>
    <p class="sub">行测、申论、面试的月目标会落到周和日。勾选日后，月课时和周完成率一起变。</p>
    <div class="row">
      <label>月份<input id="month-pick" type="month" value="${O(a,r)}"/></label>
      <button class="btn" id="export-plan" type="button">导出本月计划</button>
      <button class="btn" id="import-plan" type="button">导入计划</button>
      <input id="plan-file" type="file" accept="application/json" hidden/>
    </div>
    <p id="plan-msg" class="error"></p>
    <section class="card">
      <h2>月目标</h2>
      <p class="muted">已完成 ${S.toFixed(1)} / ${f} 小时</p>
      <form id="goals">
        ${p.goals.map(c=>`<div class="grid">
              <strong>${c.subject}</strong>
              <label>目标课时<input name="hours-${c.subject}" type="number" min="0" step="0.5" value="${c.targetHours}"/></label>
              <label>说明<input name="note-${c.subject}" value="${d(c.note)}"/></label>
            </div>`).join("")}
        <div class="row">
          <button class="btn primary" type="submit">保存月目标</button>
          <button class="btn" type="button" id="split-week">把目标拆到本周工作日</button>
        </div>
      </form>
    </section>
    <section class="card">
      <h2>本月各周</h2>
      <div class="row">${m.map(c=>`<button class="btn ${c===i?"primary":""}" data-week="${c}">${c.slice(5)} 那周</button>`).join("")}</div>
    </section>
    <section class="card">
      <h2>一周 · ${i}</h2>
      <p class="muted">本周完成 ${$t(t.tasks.filter(c=>h.includes(c.date)))}</p>
      <div class="week">${h.map(c=>{const x=t.tasks.filter(v=>v.date===c);return`<div class="day">
            <button class="link" data-day="${c}">周${tt(c)} ${c.slice(8)}</button>
            ${x.map(v=>`<label class="task ${v.done?"done":""}">
                  <input type="checkbox" data-task="${v.id}" ${v.done?"checked":""}/>
                  ${d(v.subject)} ${d(v.module)} ${d(v.title)} ${v.minutes}分钟
                </label>`).join("")}
          </div>`}).join("")}</div>
    </section>
    <section class="card">
      <h2>${u} 的任务</h2>
      <form id="task" class="grid">
        <input type="hidden" name="date" value="${u}"/>
        <label>科目<select name="subject" id="task-subject">${T.map(c=>`<option>${c}</option>`).join("")}</select></label>
        <label>模块<select name="module" id="task-module">${A.行测.map(c=>`<option>${c}</option>`).join("")}</select></label>
        <label>内容<input name="title" required placeholder="言语 20 题"/></label>
        <label>分钟<input name="minutes" type="number" min="10" value="40"/></label>
        <div class="row"><button class="btn primary">加到这一天</button></div>
      </form>
      ${bt(t,u)}
    </section>`}function bt(t,n){const e=t.tasks.filter(o=>o.date===n);return e.length?e.map(o=>`<div class="row">
        <span class="${o.done?"done":""}">${d(o.subject)} / ${d(o.module)} / ${d(o.title)}</span>
        <button class="btn danger" data-del-task="${o.id}">删除</button>
      </div>`).join(""):'<p class="muted">这一天还没有任务。</p>'}function $t(t){return t.length?`${t.filter(e=>e.done).length}/${t.length}`:"还没有任务"}function yt(t){return`
    <h1>模考和练习</h1>
    <p class="sub">分数只留在这台浏览器，不会写进导出的计划。</p>
    <form id="score" class="card grid">
      <label>日期<input name="date" type="date" value="${E(new Date)}" required/></label>
      <label>类型<select name="kind"><option>模考</option><option>练习</option></select></label>
      <label>科目<select name="subject" id="score-subject">${T.map(n=>`<option>${n}</option>`).join("")}</select></label>
      <label>模块<select name="module" id="score-module">${A.行测.map(n=>`<option>${n}</option>`).join("")}</select></label>
      <label>得分<input name="score" type="number" min="0" step="0.1" required/></label>
      <label>满分<input name="full" type="number" min="1" step="0.1" value="100" required/></label>
      <label>用时（分钟）<input name="minutes" type="number" min="0" value="0"/></label>
      <div class="row"><button class="btn primary">记下这次</button></div>
    </form>
    <table>
      <thead><tr><th>日期</th><th>类型</th><th>科目</th><th>模块</th><th>分数</th><th></th></tr></thead>
      <tbody>${t.scores.length?[...t.scores].sort((n,e)=>e.date.localeCompare(n.date)).map(n=>`<tr>
                  <td>${d(n.date)}</td><td>${d(n.kind)}</td><td>${d(n.subject)}</td>
                  <td>${d(n.module)}</td><td>${n.score}/${n.full}</td>
                  <td><button class="btn danger" data-del-score="${n.id}">删除</button></td>
                </tr>`).join(""):'<tr><td colspan="6" class="muted">还没有分数。</td></tr>'}</tbody>
    </table>`}function St(t){const n=T.map(r=>{const u=t.scores.filter(p=>p.subject===r).sort((p,m)=>p.date.localeCompare(m.date));return{subject:r,rows:u}}),e=vt(t),o=new Date,s=t.tasks.filter(r=>W(r.date,o.getFullYear(),o.getMonth()+1)),a=s.filter(r=>r.done).length;return`
    <h1>学习效果</h1>
    <p class="sub">看分数变化，以及最近练习里相对低的模块。</p>
    <div class="card"><div class="stat">${s.length?Math.round(a/s.length*100):0}%</div><div class="muted">本月任务完成率 ${a}/${s.length}</div></div>
    ${n.map(r=>`<section class="card"><h2>${r.subject}分数</h2>${r.rows.length?kt(r.rows.map(u=>u.score/u.full),r.rows.map(u=>u.date.slice(5))):`<p class="muted">还没有${r.subject}分数。</p>`}</section>`).join("")}
    <section class="card">
      <h2>相对低的模块</h2>
      ${e.length?`<ol>${e.slice(0,2).map(r=>`<li>${d(r.subject)} / ${d(r.module)}：最近平均 ${Math.round(r.ratio*100)}%</li>`).join("")}</ol>${wt(e)}`:'<p class="muted">每个模块至少记一次分数后，这里会标出较低的两项。</p>'}
    </section>`}function kt(t,n){const a=t.map((u,p)=>{const m=28+p*464/Math.max(t.length-1,1),i=20+(1-u)*110;return`${m},${i}`}),r=a.map((u,p)=>{const[m,i]=u.split(",");return`<circle cx="${m}" cy="${i}" r="3" fill="#1e3a5f"/><text x="${m}" y="152" text-anchor="middle" font-size="10" fill="#5c6b7a">${d(n[p]??"")}</text>`}).join("");return`<svg viewBox="0 0 520 160" class="chart" role="img" aria-label="分数折线"><polyline fill="none" stroke="#1e3a5f" stroke-width="2" points="${a.join(" ")}"/>${r}</svg>`}function wt(t){const e=t.length*36+10,o=t.map((s,a)=>{const r=10+a*36,u=Math.max(4,s.ratio*280);return`<text x="0" y="${r+14}" font-size="12" fill="#1c2834">${d(s.module)}</text>
        <rect x="90" y="${r}" width="${u}" height="16" fill="${a<2?"#b23a3a":"#1e3a5f"}"/>
        <text x="${96+u}" y="${r+13}" font-size="12" fill="#5c6b7a">${Math.round(s.ratio*100)}%</text>`}).join("");return`<svg viewBox="0 0 420 ${e}" class="chart" role="img" aria-label="模块正确率">${o}</svg>`}function vt(t){const n=new Map;for(const e of t.scores){if(!e.module||e.full<=0)continue;const o=`${e.subject}	${e.module}`,s=n.get(o)??[];s.push(e.score/e.full),n.set(o,s)}return[...n.entries()].map(([e,o])=>{const[s,a]=e.split("	"),r=o.slice(-3),u=r.reduce((p,m)=>p+m,0)/r.length;return{subject:s,module:a,ratio:u}}).sort((e,o)=>e.ratio-o.ratio)}function jt(t,n,e,o){n==="profile"&&xt(t),n==="timeline"&&qt(t),n==="plan"&&Dt(t,e,o),n==="scores"&&Mt(t)}function xt(t){document.querySelector("#profile").onsubmit=n=>{n.preventDefault();const e=new FormData(n.currentTarget),o=e.getAll("track").map(String);w({...t,profile:{...t.profile,name:String(e.get("name")??""),gender:String(e.get("gender")??""),politics:String(e.get("politics")??""),undergradSchool:String(e.get("undergradSchool")??""),undergradMajor:String(e.get("undergradMajor")??""),gradSchool:String(e.get("gradSchool")??""),gradMajor:String(e.get("gradMajor")??""),gradYear:String(e.get("gradYear")??""),hukou:String(e.get("hukou")??""),english:String(e.get("english")??""),cities:String(e.get("cities")??""),tracks:o}}),$()},document.querySelector("#resume").onsubmit=n=>{n.preventDefault();const e=new FormData(n.currentTarget);w({...t,resume:[...t.resume,{id:D(),kind:String(e.get("kind")),time:String(e.get("time")??""),title:String(e.get("title")??""),detail:String(e.get("detail")??"")}]}),$()},document.querySelectorAll("[data-del-resume]").forEach(n=>{n.onclick=()=>{w({...t,resume:t.resume.filter(e=>e.id!==n.dataset.delResume)}),$()}})}function qt(t){document.querySelector("#event").onsubmit=n=>{n.preventDefault();const e=new FormData(n.currentTarget);w({...t,events:[...t.events,{id:D(),name:String(e.get("name")??""),identity:String(e.get("identity")??""),place:String(e.get("place")??""),type:String(e.get("type")),status:String(e.get("status")),start:String(e.get("start")??""),end:String(e.get("end")??"")}]}),$()},document.querySelectorAll("[data-del-event]").forEach(n=>{n.onclick=()=>{w({...t,events:t.events.filter(e=>e.id!==n.dataset.delEvent)}),$()}}),document.querySelector("#export-timeline").onclick=()=>X("时间线.json",lt(t)),V("#import-timeline","#timeline-file","#timeline-msg",t)}function Dt(t,n,e){const o=E(new Date),s=n||o.slice(0,7),{year:a,month:r}=B(s),u=e||o;document.querySelector("#month-pick").onchange=i=>{location.hash=`plan/${i.currentTarget.value}`},document.querySelectorAll("[data-week]").forEach(i=>{i.onclick=()=>{location.hash=`plan/${O(a,r)}/${i.dataset.week}`}}),document.querySelectorAll("[data-day]").forEach(i=>{i.onclick=()=>{location.hash=`plan/${O(a,r)}/${i.dataset.day}`}});const p=document.querySelector("#task-subject"),m=document.querySelector("#task-module");p.onchange=()=>_(m,p.value),document.querySelector("#goals").onsubmit=i=>{i.preventDefault();const h=new FormData(i.currentTarget),y=I(t,a,r);w({...y,months:y.months.map(S=>S.year===a&&S.month===r?{...S,goals:T.map(f=>({subject:f,targetHours:Number(h.get(`hours-${f}`)??0),note:String(h.get(`note-${f}`)??"")}))}:S)}),$()},document.querySelector("#split-week").onclick=()=>{const i=I(t,a,r),h=H(i,a,r),y=[0,1,2,3,4].map(f=>K(z(u)[0],f)),S=h.goals.filter(f=>f.targetHours>0).flatMap(f=>y.map(c=>({id:D(),date:c,subject:f.subject,module:A[f.subject][0],title:f.note||`${f.subject}练习`,minutes:Math.max(20,Math.round(f.targetHours*60/4/y.length)),done:!1})));w({...i,tasks:[...i.tasks,...S]}),$()},document.querySelector("#task").onsubmit=i=>{i.preventDefault();const h=new FormData(i.currentTarget),y=String(h.get("subject"));w({...I(t,a,r),tasks:[...t.tasks,{id:D(),date:String(h.get("date")),subject:y,module:String(h.get("module")??A[y][0]),title:String(h.get("title")??""),minutes:Number(h.get("minutes")??40),done:!1}]}),$()},document.querySelectorAll("[data-task]").forEach(i=>{i.onchange=()=>{w({...t,tasks:t.tasks.map(h=>h.id===i.dataset.task?{...h,done:i.checked}:h)}),$()}}),document.querySelectorAll("[data-del-task]").forEach(i=>{i.onclick=()=>{w({...t,tasks:t.tasks.filter(h=>h.id!==i.dataset.delTask)}),$()}}),document.querySelector("#export-plan").onclick=()=>X(`计划-${O(a,r)}.json`,it(t,a,r)),V("#import-plan","#plan-file","#plan-msg",t)}function Mt(t){const n=document.querySelector("#score-subject"),e=document.querySelector("#score-module");n.onchange=()=>_(e,n.value),document.querySelector("#score").onsubmit=o=>{o.preventDefault();const s=new FormData(o.currentTarget),a=String(s.get("subject"));w({...t,scores:[...t.scores,{id:D(),date:String(s.get("date")),kind:String(s.get("kind")),subject:a,module:String(s.get("module")??""),score:Number(s.get("score")),full:Number(s.get("full")),minutes:Number(s.get("minutes")??0)}]}),$()},document.querySelectorAll("[data-del-score]").forEach(o=>{o.onclick=()=>{w({...t,scores:t.scores.filter(s=>s.id!==o.dataset.delScore)}),$()}})}function _(t,n){t.innerHTML=A[n].map(e=>`<option>${e}</option>`).join("")}function X(t,n){const e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),o=document.createElement("a");o.href=URL.createObjectURL(e),o.download=t,o.click(),URL.revokeObjectURL(o.href)}function V(t,n,e,o){const s=document.querySelector(t),a=document.querySelector(n),r=document.querySelector(e);!s||!a||!r||(s.onclick=()=>a.click(),a.onchange=async()=>{var p;const u=(p=a.files)==null?void 0:p[0];if(u)try{const m=JSON.parse(await u.text());w(ct(o,m)),$()}catch(m){r.textContent=m instanceof Error?m.message:"导入失败"}})}window.addEventListener("hashchange",$);$();
