import{g as v,s as g,r as b,o as f,b as w}from"./cart.BU6rtXwa.js";import{u as k}from"./url.BZMUH3N0.js";const n=document.getElementById("cartItems"),d=n?.querySelector(".cart-table-head"),u=document.getElementById("cart-empty"),m=document.getElementById("cart-bottombar"),p=document.getElementById("cart-actions"),y=document.getElementById("sumSubtotal"),c=t=>"$"+t.toLocaleString("en-AU"),r=t=>(t||"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]);function q(t){const e=JSON.parse(document.getElementById("productPaths")?.textContent||"{}"),a=k(e[t.slug]||"/hearing-aids");return`<article class="cart-row" data-key="${r(t.key)}">
      <div class="cart-row-product">
        <a href="${a}" class="cart-row-media"><img src="${r(t.image)}" alt="${r(t.fullName)}" loading="lazy" decoding="async"></a>
        <div class="cart-row-id">
          <span class="cart-row-cat">${r(t.fullName.split(" ")[0])}</span>
          <h2 class="cart-row-name"><a href="${a}">${r(t.name)}</a></h2>
          <span class="cart-row-variant">${t.variant?"Variant: "+r(t.variant):""}</span>
        </div>
      </div>
      <div class="cart-row-price" data-label="Price"><span class="cart-row-sale">${c(t.price)}</span></div>
      <div class="cart-row-qty" data-label="Qty">
        <div class="qty" role="group" aria-label="Quantity">
          <button type="button" class="qty-btn" data-step="-1" aria-label="Decrease quantity"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg></button>
          <span class="qty-val" aria-live="polite">${t.qty}</span>
          <button type="button" class="qty-btn" data-step="1" aria-label="Increase quantity"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
      </div>
      <div class="cart-row-total" data-label="Total"><span class="cart-line-total">${c(t.price*t.qty)}</span></div>
      <div class="cart-row-actions">
        <button type="button" class="cart-row-remove" aria-label="Remove ${r(t.fullName)}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"/></svg></button>
      </div>
    </article>`}function h(){if(!n||!d)return;n.querySelectorAll(".cart-row").forEach(a=>a.remove());const t=v(),e=t.length===0;n.hidden=e,u&&(u.hidden=!e),m&&(m.style.display=e?"none":""),p&&(p.style.display=e?"none":""),e||d.insertAdjacentHTML("afterend",t.map(q).join("")),y&&(y.textContent=c(w()))}n?.addEventListener("click",t=>{const e=t.target,a=e.closest(".cart-row");if(!a)return;const s=a.dataset.key||"",l=v().find(o=>o.key===s);if(!l)return;const i=e.closest(".qty-btn");if(i){const o=l.qty+Number(i.dataset.step);o>=1&&g(s,o)}else e.closest(".cart-row-remove")&&b(s)});f(h);h();
