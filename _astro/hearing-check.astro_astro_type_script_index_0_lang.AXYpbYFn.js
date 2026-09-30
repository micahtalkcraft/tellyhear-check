import{getSupabase as Y}from"./supabase.Bhd_0wqd.js";const Z="https://stjzecfcjgwnmzaeuzcf.supabase.co/functions/v1/analyse-session",M="hearing-uploads",D="tellyhear.review.token",v=t=>document.getElementById(t),a=t=>String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),y=(t,e,s)=>v(t)?.addEventListener(e,s),Q=v("stage");let L=localStorage.getItem(D)??new URLSearchParams(location.search).get("t")??"",q="welcome";const P=t=>document.querySelector(`.hc-step[data-for="${t}"]`);function u(t){if(t===q)return;const e=P(q),s=P(t);e&&(e.classList.remove("hc-on"),e.classList.add("hc-leaving"),setTimeout(()=>e.classList.remove("hc-leaving"),400)),s&&(s.classList.add("hc-on","hc-enter"),setTimeout(()=>s.classList.remove("hc-enter"),900)),q=t,Q.dataset.step=t}async function k(t,e={}){const s=await fetch(`${Z}?action=${t}${e.query??""}`,{method:e.body?"POST":"GET",headers:{"x-review-token":L,...e.body?{"Content-Type":"application/json"}:{}},body:e.body?JSON.stringify(e.body):void 0}),o=await s.json().catch(()=>({}));if(!s.ok)throw new Error(o.message||o.error||`Request failed (${s.status})`);return o}async function O(){if(!L)return!1;try{return await k("list"),localStorage.setItem(D,L),!0}catch{return!1}}async function H(t){await O()?t():(localStorage.removeItem(D),L="",u("gate"))}y("gate-form","submit",async t=>{t.preventDefault();const e=v("gate-error");e.hidden=!0,L=v("gate-token").value.trim(),await O()?u("welcome"):(L="",e.textContent="That token wasn't accepted.",e.hidden=!1)});y("go-new","click",()=>{u("form"),H(()=>{})});y("form-back","click",()=>u("welcome"));y("go-list","click",()=>{u("list"),H(()=>I())});y("list-new","click",()=>u("form"));y("result-new","click",()=>{history.pushState({},"",location.pathname),u("form")});y("result-back","click",()=>{history.pushState({},"",location.pathname),u("list"),I()});addEventListener("popstate",()=>{const t=new URLSearchParams(location.search).get("s");t?(u("result"),R(t)):u("welcome")});const $={audiogram:null,left:null,right:null};document.querySelectorAll(".hc-drop").forEach(t=>{const e=t.dataset.drop,s=t.querySelector("input"),o=t.querySelector(".hc-drop-prev"),n=t.querySelector(".hc-drop-clear"),l=i=>{!i||!i.type.startsWith("image/")||($[e]=i,o.src=URL.createObjectURL(i),o.hidden=!1,n.hidden=!1,t.classList.add("hc-filled"))};t.addEventListener("click",i=>{i.target.closest(".hc-drop-clear")||s.click()}),t.addEventListener("keydown",i=>{const g=i.key;(g==="Enter"||g===" ")&&(i.preventDefault(),s.click())}),s.addEventListener("change",()=>l(s.files?.[0])),t.addEventListener("dragover",i=>{i.preventDefault(),t.classList.add("hc-over")}),t.addEventListener("dragleave",()=>t.classList.remove("hc-over")),t.addEventListener("drop",i=>{i.preventDefault(),t.classList.remove("hc-over"),l(i.dataTransfer?.files?.[0])}),n.addEventListener("click",i=>{i.stopPropagation(),$[e]=null,s.value="",o.hidden=!0,n.hidden=!0,t.classList.remove("hc-filled")})});function X(){$.audiogram=$.left=$.right=null,document.querySelectorAll(".hc-drop").forEach(t=>{t.classList.remove("hc-filled"),t.querySelector(".hc-drop-prev").hidden=!0,t.querySelector(".hc-drop-clear").hidden=!0,t.querySelector("input").value=""})}function T(t){let e=!1;v("ticks").querySelectorAll("li").forEach(s=>{s.dataset.tick===t?(e=!0,s.className="hc-now"):s.className=e?"":"hc-done"})}y("new-form","submit",async t=>{t.preventDefault();const e=t.target,s=v("new-error");if(s.hidden=!0,!$.audiogram){s.textContent="Add an audiogram first.",s.hidden=!1;return}const o=new FormData(e),n=["left","right"].filter(l=>$[l]);u("working"),T("upload");try{const l=await k("create",{body:{patientRef:o.get("patientRef"),brief:o.get("brief"),audiogramName:$.audiogram.name,earPhotoNames:n.map(h=>`${h}-${$[h].name}`)}}),i=Y();await i.storage.from(M).uploadToSignedUrl(l.audiogram.path,l.audiogram.token,$.audiogram),await Promise.all(n.map((h,d)=>i.storage.from(M).uploadToSignedUrl(l.ears[d].path,l.ears[d].token,$[h]))),T("read");const g=[setTimeout(()=>T("match"),7e3),setTimeout(()=>T("write"),11e3)];await k("analyse",{body:{id:l.id}}),g.forEach(clearTimeout),e.reset(),X(),history.pushState({},"",`?s=${l.id}`),u("result"),R(l.id)}catch(l){u("form"),s.textContent=l.message,s.hidden=!1}});async function I(){const t=v("sessions");try{const{sessions:e}=await k("list");if(!e.length){t.innerHTML='<p class="hc-muted">Nothing reviewed yet.</p>';return}t.innerHTML=`<table class="hc-t">
        <thead><tr><th>Patient</th><th>When</th><th>Status</th><th>Read</th><th></th></tr></thead>
        <tbody>${e.map(z).join("")}</tbody></table>`,t.querySelectorAll("button.hc-open").forEach(s=>s.addEventListener("click",()=>{history.pushState({},"",`?s=${s.dataset.id}`),u("result"),R(s.dataset.id)}))}catch(e){t.innerHTML=`<p class="hc-err">${a(e.message)}</p>`}}function z(t){const e=new Date(t.created_at).toLocaleString("en-AU",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),s=t.findings??{},o=s.right?.severity?`${s.right.severity}${s.left?.severity&&s.left.severity!==s.right.severity?` / ${s.left.severity}`:""}`:"—",n=(t.flags??[]).length;return`<tr>
      <td><strong>${a(t.patient_ref??"Unnamed")}</strong></td>
      <td class="hc-muted">${a(e)}</td>
      <td><span class="hc-pill-tag ${a(t.status)}">${a(String(t.status).replace(/_/g," "))}</span></td>
      <td class="hc-muted">${a(o)}${n?` · ${n} flag${n>1?"s":""}`:""}</td>
      <td><button class="hc-open" data-id="${a(t.id)}">Open</button></td>
    </tr>`}async function R(t){const e=v("detail");e.innerHTML='<p class="hc-muted">Loading…</p>';try{const{session:s,audiogramUrl:o,earPhotoUrls:n}=await k("get",{query:`&id=${encodeURIComponent(t)}`});e.innerHTML=tt(s,o,n??[])}catch(s){e.innerHTML=`<p class="hc-err">${a(s.message)}</p>`}}const W="/".replace(/\/$/,"");function tt(t,e,s){const o=t.findings??{},n=o.draft??null,l=t.extraction??null;if(!n)return`<h2 style="margin:0 0 12px">${a(t.patient_ref??"Unnamed")}</h2>
        <div class="hc-card"><h3>No draft</h3><p class="hc-muted">Status is <strong>${a(String(t.status).replace(/_/g," "))}</strong>.${t.error?` ${a(t.error)}`:""}</p></div>`;const i=(t.flags??[]).length?`<div class="hc-flags">${t.flags.map(b=>`<div class="hc-flag">${a(b)}</div>`).join("")}</div>`:"",g=(n.symptoms??[]).map(b=>`<span class="hc-chip">${a(b)}</span>`).join(""),[h,...d]=n.picks??[];return`<div class="hc-detail">
      <header class="hc-head">
        <div>
          <h2>${a(t.patient_ref??"Unnamed")}</h2>
          <p class="hc-muted">${a(new Date(t.created_at).toLocaleString("en-AU"))}</p>
        </div>
        <span class="hc-pill-tag ${a(t.status)}">${a(String(t.status).replace(/_/g," "))}</span>
      </header>

      ${i}

      <div class="hc-tri">
        <div class="hc-box"><span class="hc-box-h">The hearing</span><p>${a(n.hearing)}</p></div>
        <div class="hc-box"><span class="hc-box-h">Likely cause</span><p>${a(n.cause)}</p></div>
        <div class="hc-box"><span class="hc-box-h">Day to day</span><p>${a(n.dayToDay)}</p></div>
      </div>

      ${g?`<div class="hc-chips">${g}</div>`:""}

      ${h?et(h):""}
      ${d.length?`<div class="hc-alts">${d.map(at).join("")}</div>`:""}

      ${l?st(l,o):""}

      <details class="hc-inputs">
        <summary>View inputs</summary>
        <div class="hc-inputs-body">
          ${t.brief?`<div><span class="hc-box-h">The brief</span><p class="hc-brief">${a(t.brief)}</p></div>`:""}
          ${e?`<div><span class="hc-box-h">Audiogram as uploaded</span><img class="hc-shot" src="${a(e)}" alt="Uploaded audiogram" /></div>`:""}
          ${s.filter(Boolean).length?`<div><span class="hc-box-h">Ear photos</span><div class="hc-thumbs">${s.filter(Boolean).map(b=>`<img src="${a(b)}" alt="Ear photo" />`).join("")}</div></div>`:""}
        </div>
      </details>
    </div>`}function et(t){return`<div class="hc-hero">
      <span class="hc-badge">${a(t.label)}</span>
      <div class="hc-hero-img">${t.image?`<img src="${a(W+t.image)}" alt="${a(t.name)}" />`:""}</div>
      <div class="hc-hero-body">
        <h3>${a(t.name)}</h3>
        <div class="hc-price">${a(t.priceLabel)} <span>per aid · ${a(t.tier)} · ${a(t.formFactor)}</span></div>
        <ul class="hc-why">${(t.points??[]).map(e=>`<li>${a(e)}</li>`).join("")}</ul>
        ${t.caveat?`<p class="hc-caveat">${a(t.caveat)}</p>`:""}
      </div>
    </div>`}function at(t){return`<div class="hc-alt">
      <span class="hc-badge hc-badge-quiet">${a(t.label)}</span>
      <div class="hc-alt-img">${t.image?`<img src="${a(W+t.image)}" alt="${a(t.name)}" />`:""}</div>
      <div class="hc-alt-body">
        <h4>${a(t.name)}</h4>
        <div class="hc-price hc-price-sm">${a(t.priceLabel)} <span>${a(t.tier)}</span></div>
        <ul class="hc-why hc-why-sm">${(t.points??[]).map(e=>`<li>${a(e)}</li>`).join("")}</ul>
        ${t.caveat?`<p class="hc-caveat">${a(t.caveat)}</p>`:""}
      </div>
    </div>`}const w=[250,500,1e3,2e3,3e3,4e3,6e3,8e3],E="#c0392b",j="#2b6cb0";function st(t,e){const h=c=>58+c*384/(w.length-1),d=c=>26+(c+10)*232/130,b=w.map((c,r)=>`<line x1="${h(r)}" y1="26" x2="${h(r)}" y2="258"/>`).join(""),F=[-10,0,20,40,60,80,100,120].map(c=>`<line x1="58" y1="${d(c)}" x2="442" y2="${d(c)}"/>`).join(""),K=w.map((c,r)=>`<text x="${h(r)}" y="276" text-anchor="middle">${c>=1e3?c/1e3+"k":c}</text>`).join(""),G=[0,20,40,60,80,100,120].map(c=>`<text x="48" y="${d(c)+4}" text-anchor="end">${c}</text>`).join(""),U=(c,r,f)=>{const m=[];if(w.forEach((p,V)=>{const B=t?.[c]?.air?.["hz"+p];B!=null&&m.push({i:V,v:B})}),!m.length)return"";const x=`<polyline points="${m.map(p=>`${h(p.i)},${d(p.v)}`).join(" ")}" fill="none" stroke="${r}" stroke-width="2" opacity=".75"${f==="x"?' stroke-dasharray="5 4"':""}/>`,S=m.map(p=>f==="o"?`<circle cx="${h(p.i)}" cy="${d(p.v)}" r="5" fill="#fff" stroke="${r}" stroke-width="2"/>`:`<path d="M${h(p.i)-4.5},${d(p.v)-4.5} l9,9 M${h(p.i)+4.5},${d(p.v)-4.5} l-9,9" stroke="${r}" stroke-width="2" fill="none"/>`).join("");return x+S},C=c=>{const r=e[c];if(!r)return"";const f=r.ptaCheck?`<span class="hc-check hc-${a(r.ptaCheck)}">report prints ${r.printedPta} · ${a(r.ptaCheck)}</span>`:"";return`<div class="hc-stat">
        <span class="hc-stat-ear"><i style="background:${c==="right"?E:j}"></i>${c==="right"?"Right":"Left"}</span>
        <span class="hc-stat-val">${r.pta??"–"}<em>dB</em></span>
        <span class="hc-stat-sub">${a([r.severity,r.configuration,r.type].filter(Boolean).join(" · ")||"—")}</span>
        ${f}
      </div>`},A=(c,r)=>w.map(f=>{const m=c?.["hz"+f];return m==null?'<td class="hc-null">·</td>':`<td${r?' class="hc-soft"':""}>${m}</td>`}).join(""),J=c=>w.some(r=>c?.["hz"+r]!==null&&c?.["hz"+r]!==void 0),_=(c,r,f)=>{const m=t?.[c]?.air,x=t?.[c]?.bone,S=p=>`<th scope="row"><i style="background:${f}"></i>${r} ear <em>(${p})</em></th>`;return`<tr>${S("air")}${A(m,!1)}</tr>`+(J(x)?`<tr>${S("bone")}${A(x,!0)}</tr>`:"")};return`<div class="hc-card">
      <div class="hc-row-between">
        <h3>What was read off the chart</h3>
        <span class="hc-conf">confidence ${a(t.confidence)}</span>
      </div>

      <div class="hc-chart-wrap">
        <svg viewBox="0 0 460 320" class="hc-chart" role="img" aria-label="Audiogram redrawn from the extracted thresholds">
          <!-- Normal hearing sits above 25 dB; shading it gives the plot a reference. -->
          <rect x="58" y="${d(-10)}" width="384" height="${d(25)-d(-10)}" fill="#f2f7fb"/>
          <g stroke="#e6e9ee" stroke-width="1">${b}${F}</g>
          <rect x="58" y="26" width="384" height="232" fill="none" stroke="#d5dae1"/>
          <g class="hc-axis">${K}${G}</g>
          <text class="hc-axis-t" x="${500/2}" y="300" text-anchor="middle">Frequency (Hz)</text>
          <text class="hc-axis-t" transform="translate(15 ${284/2}) rotate(-90)" text-anchor="middle">Hearing level (dB HL)</text>
          ${U("right",E,"o")}
          ${U("left",j,"x")}
        </svg>

        <div class="hc-stats">
          ${C("right")}${C("left")}
          ${e.asymmetryDb!==void 0?`<div class="hc-stat hc-stat-warn${e.asymmetryDb>=15?" hc-stat-warn-strong":""}"><span class="hc-stat-sub"><strong>${e.asymmetryDb} dB</strong> difference between ears${e.asymmetryDb>=15?" — worth a medical opinion":""}</span></div>`:""}
        </div>
      </div>

      <div class="hc-legend">
        <span><svg width="16" height="16"><circle cx="8" cy="8" r="5" fill="#fff" stroke="${E}" stroke-width="2"/></svg>Right, air</span>
        <span><svg width="16" height="16"><path d="M4,4 l8,8 M12,4 l-8,8" stroke="${j}" stroke-width="2" fill="none"/></svg>Left, air</span>
        <span class="hc-muted">Bone conduction listed below where it was tested</span>
      </div>
      ${(t.issues??[]).length?`<ul class="hc-muted hc-issues">${t.issues.map(c=>`<li>${a(c)}</li>`).join("")}</ul>`:""}

    </div>

    <div class="hc-card">
      <div class="hc-row-between">
        <h3>Thresholds</h3>
        <span class="hc-conf">dB HL · lower is better hearing</span>
      </div>
      <table class="hc-thresh">
        <thead><tr><th></th>${w.map(c=>`<th>${c>=1e3?c/1e3+"k":c} Hz</th>`).join("")}</tr></thead>
        <tbody>
          ${_("right","Right",E)}
          ${_("left","Left",j)}
        </tbody>
      </table>
    </div>`}const N=new URLSearchParams(location.search).get("s");N&&H(()=>{u("result"),R(N)});
