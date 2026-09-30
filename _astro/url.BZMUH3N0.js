const t="/".replace(/\/$/,"");function e(r){return r?/^(https?:|mailto:|tel:|\/\/)/.test(r)||r.startsWith("#")?r:(r.startsWith("/")||(r="/"+r),r==="/"?(t||"")+"/":t+r):t||"/"}export{e as u};
