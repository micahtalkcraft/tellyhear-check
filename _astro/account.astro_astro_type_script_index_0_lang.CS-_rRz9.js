import{supabaseConfigured as H,getSupabase as R}from"./supabase.Bhd_0wqd.js";import{u as C}from"./url.BZMUH3N0.js";const O=C("/auth"),r=i=>document.getElementById(i),V=new URLSearchParams(location.search).has("preview");function j(){k();const i=(g,u)=>{const v=r(g);v&&(v.textContent=u)};i("acct-sidebar-name","Margaret Wilson"),i("acct-member","Member since March 2024");const n=(g,u)=>{const v=document.querySelector(`.account-detail[data-field="${g}"] .account-detail-value`);v&&(v.textContent=u)};n("full_name","Margaret Wilson"),n("email","margaret.wilson@example.com"),n("phone","0412 345 678"),n("address","14 Rosewood Avenue, Camberwell VIC 3124");const p=r("orders-list");p&&(p.innerHTML=`<li class="account-order">
        <div class="account-order-main">
          <p class="account-order-item">Oticon Intent 1 miniRITE</p>
          <p class="account-order-meta">Order #1042 · 12 Jun 2026</p>
        </div>
        <div class="account-order-side">
          <span class="account-status account-status-done">Delivered</span>
          <span class="account-order-total">$4,990</span>
        </div>
      </li>
      <li class="account-order">
        <div class="account-order-main">
          <p class="account-order-item">Phonak Infinio Ultra Audeo I90R</p>
          <p class="account-order-meta">Order #1058 · 24 Jul 2026</p>
        </div>
        <div class="account-order-side">
          <span class="account-status account-status-active">Processing</span>
          <span class="account-order-total">$6,490</span>
        </div>
      </li>`);const f=r("wishlist-list");f&&(f.innerHTML=`<li class="account-order">
        <div class="account-order-main">
          <p class="account-order-item">ReSound Vivia 9 microRIE</p>
          <p class="account-order-meta">$7,290</p>
        </div>
        <div class="account-order-side">
          <span class="account-status account-status-active">View</span>
        </div>
      </li>`)}const L=Array.from(document.querySelectorAll(".account-menu-item[data-panel]")),W=Array.from(document.querySelectorAll(".acct-panel"));function q(i){W.forEach(n=>n.hidden=n.dataset.panel!==i),L.forEach(n=>{const p=n.dataset.panel===i;n.classList.toggle("is-active",p),n.setAttribute("aria-current",p?"page":"false")})}L.forEach(i=>i.addEventListener("click",n=>{n.preventDefault(),q(i.dataset.panel)}));const A=location.hash.replace("#","");A&&document.querySelector(`.acct-panel[data-panel="${A}"]`)&&q(A);function x(){document.querySelector(".account-layout")?.classList.add("acct-guest");const i=r("acct-authed");i&&(i.hidden=!0);const n=r("acct-gate");n&&(n.hidden=!1),r("acct-signout")?.setAttribute("hidden","")}function k(){document.querySelector(".account-layout")?.classList.remove("acct-guest"),r("acct-signout")?.removeAttribute("hidden");const i=r("acct-gate");i&&(i.hidden=!0);const n=r("acct-authed");n&&(n.hidden=!1);const p=r("acct-sidebar-name");p&&(p.textContent="");const f=r("acct-member");f&&(f.textContent="")}if(V)j();else if(!H)x();else{let i=function(e){const t=new Date(e);return isNaN(+t)?"Member":"Member since "+t.toLocaleDateString("en-AU",{month:"long",year:"numeric"})},n=function(e){b=e;const t=e.full_name||"";r("acct-sidebar-name").textContent=t||e.email,r("acct-member").textContent=i(e.created_at);const c=(s,l)=>{const d=v(s);d&&(d.textContent=l||"—")};c("full_name",e.full_name),c("email",e.email),c("phone",e.phone),c("address",e.address)},p=function(){$=!0,document.querySelectorAll('.account-detail[data-editable="true"]').forEach(e=>{const t=e.dataset.field,c=e.querySelector(".account-detail-value"),s=b?.[t]??"",l=document.createElement("input");l.type="text",l.className="account-detail-input",l.value=s,c.replaceChildren(l)}),h.textContent="Save",h.insertAdjacentHTML("afterend",'<button type="button" class="account-edit account-cancel" id="acct-cancel">Cancel</button>'),r("acct-cancel").addEventListener("click",()=>{b&&(n(b),f())})},f=function(){$=!1,h.textContent="Edit",r("acct-cancel")?.remove()},g=function(e){let t=document.getElementById("acct-edit-err");t||(t=document.createElement("p"),t.id="acct-edit-err",t.style.cssText="margin:12px 0 0;font-size:.85rem;color:var(--orange-700);background:var(--orange-50);padding:8px 11px;border-radius:8px;",document.querySelector(".account-details").after(t)),t.textContent=e||"",t.hidden=!e};const u=R(),v=e=>document.querySelector(`.account-detail[data-field="${e}"] .account-detail-value`);let b=null;async function M(){let e={session:null};try{e=(await u.auth.getSession()).data}catch(l){console.error("[account] getSession failed",l)}if(!e.session){x();return}k();const t=e.session.user;let{data:c,error:s}=await u.from("profiles").select("*").eq("id",t.id).maybeSingle();if(!s&&!c){const l={id:t.id,email:t.email??"",full_name:t.user_metadata?.full_name??null,phone:t.user_metadata?.phone??null},d=await u.from("profiles").insert(l).select("*").maybeSingle();c=d.data,s=d.error}if(s||!c){console.error("[profile]",s);return}n(c),E(t.id),D(e.session.access_token)}const T="https://stjzecfcjgwnmzaeuzcf.supabase.co";async function D(e){const t=r("orders-list"),c=s=>t.innerHTML=`<li class="account-order"><div class="account-order-main"><p class="account-order-item">No orders yet</p><p class="account-order-meta">${s}</p></div></li>`;try{const s=await fetch(`${T}/functions/v1/shopify-orders`,{headers:{Authorization:`Bearer ${e}`}}),d=(await s.json().catch(()=>({}))).orders;if(!s.ok||!Array.isArray(d)||d.length===0){c("When you place an order it will appear here.");return}const a=o=>new Date(o).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"}),m=o=>o?o[0].toUpperCase()+o.slice(1):"";t.innerHTML=d.map(o=>{const w=o.fulfillment_status==="fulfilled",S=w?"Delivered":m(o.fulfillment_status||o.financial_status||"Processing"),y=new Intl.NumberFormat("en-AU",{style:"currency",currency:o.currency||"AUD",maximumFractionDigits:0}).format(Number(o.total));return`<li class="account-order">
            <div class="account-order-main">
              <p class="account-order-item">${(o.items||[]).join(" · ")||"Order"}</p>
              <p class="account-order-meta">Order ${o.name} · ${a(o.created_at)}</p>
            </div>
            <div class="account-order-side">
              <span class="account-status account-status-${w?"done":"active"}">${S}</span>
              <span class="account-order-total">${y}</span>
            </div>
          </li>`}).join("")}catch(s){console.error("[orders]",s),c("When you place an order it will appear here.")}}async function E(e){const t=r("wishlist-list"),{data:c,error:s}=await u.from("wishlists").select("*").eq("user_id",e).order("created_at",{ascending:!1});if(s){console.error("[wishlist]",s);return}if(!c||c.length===0){t.innerHTML='<li class="account-order"><div class="account-order-main"><p class="account-order-item">Nothing saved yet</p><p class="account-order-meta">Tap “Save to wishlist” on any product to keep it here.</p></div></li>';return}const l=a=>{const m=new Date(a);return isNaN(+m)?"":m.toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"})},d=a=>"$"+Math.round(a).toLocaleString("en-AU");t.innerHTML=c.map(a=>{const m=a.product_title??a.product_handle,o=JSON.parse(document.getElementById("productPaths")?.textContent||"{}"),w=C(o[a.product_slug??a.product_handle??""]||"/hearing-aids"),S=l(a.created_at),y=parseFloat(String(a.price??"").replace(/[^0-9.]/g,"")),_=isFinite(y)&&y>0?`<p class="wishlist-card-price"><span>${d(y)}</span> <s>${d(y*1.3)}</s></p>`:a.price?`<p class="wishlist-card-price"><span>${a.price}</span></p>`:"",P=a.variant?`<span class="wishlist-card-variant">${a.variant==="Both sides"?"Pair":"Single · "+a.variant}</span>`:"";return`<li class="wishlist-card" data-wid="${a.id}">
          <div class="wishlist-card-media">
            <a class="wishlist-card-imglink" href="${w}" aria-label="View ${m}">
              ${a.product_image?`<img src="${a.product_image}" alt="${m}" loading="lazy" decoding="async">`:""}
            </a>
            <button type="button" class="wishlist-remove" data-wid="${a.id}" aria-label="Remove ${m} from wishlist" title="Remove">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
          <div class="wishlist-card-body">
            <p class="wishlist-card-title"><a href="${w}">${m}</a></p>
            ${_}
            ${P}
            ${S?`<p class="wishlist-card-meta">Saved ${S}</p>`:""}
          </div>
        </li>`}).join(""),t.querySelectorAll(".wishlist-remove").forEach(a=>{a.addEventListener("click",async()=>{const m=a.dataset.wid;await u.from("wishlists").delete().eq("id",m),E(e)})})}const h=r("acct-edit");let $=!1;const I=/\b(VIC|NSW|QLD|WA|SA|TAS|ACT|NT)\b/i,N=e=>!e||/\d/.test(e)&&/[a-z]{3,}/i.test(e)&&(/\b\d{4}\b/.test(e)||I.test(e))&&e.trim().length>=10;async function U(){const e={};if(document.querySelectorAll('.account-detail[data-editable="true"]').forEach(s=>{const l=s.dataset.field,d=s.querySelector(".account-detail-input");d&&(e[l]=d.value.trim())}),e.address!==void 0&&!N(e.address)){g("Please enter a full street address, including suburb and postcode.");return}g(null),h.disabled=!0,h.textContent="Saving…";const{data:t,error:c}=await u.from("profiles").update(e).eq("id",b.id).select("*").maybeSingle();if(h.disabled=!1,c||!t){console.error("[profile save]",c),h.textContent="Save";return}n(t),f()}h?.addEventListener("click",()=>$?U():p()),r("acct-signout")?.addEventListener("click",async e=>{e.preventDefault(),await u.auth.signOut(),window.location.replace(O)}),M()}
