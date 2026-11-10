(function(root){
  'use strict';
  function normalize(text){return String(text||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function titleCase(text){const small=new Set(['a','an','the','and','or','nor','but','as','at','by','for','in','of','on','per','to','via','vs','with']);return String(text||'').split(/(\s+)/).map((w,i,all)=>{if(/^\s+$/.test(w))return w;const key=w.toLowerCase();if(i>0&&i<all.length-1&&small.has(key))return key;if(/[a-z]/.test(w)&&/[A-Z]/.test(w))return w;return w.replace(/(^|[-/])([a-z])/g,(_,sep,c)=>sep+c.toUpperCase());}).join('');}
  function filterResources(items,options){
    const o=options||{};
    const aliases={'red cap':'redcap','human subjects':'irb','ethics':'irb','ethical approval':'irb','sample size':'sample size','power calculation':'sample size','stats':'statistics','statistical consultation':'biostatistics','pah':'pulmonary hypertension','ph':'pulmonary hypertension'};
    const query=normalize(o.query),canonical=aliases[query]||query;
    const words=canonical.split(/\s+/).filter(Boolean);
    function near(a,b){if(a.length<5||Math.abs(a.length-b.length)>1)return false;let i=0,j=0,n=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue;}if(++n>1)return false;if(a.length>=b.length)i++;if(b.length>=a.length)j++;}return n+(i<a.length||j<b.length?1:0)<=1;}

    return items.filter(item=>{
      if(o.type&&o.type!=='all'&&item.type!==o.type)return false;
      if(o.category&&o.category!=='all'&&item.category!==o.category)return false;
      if(o.topic&&o.topic!=='all'&&item.topic!==o.topic)return false;
      const text=normalize([item.name,item.summary,item.access,item.topic,item.category,...(item.tags||[])].join(' '));
      return words.every(word=>text.includes(word)||text.split(' ').some(token=>near(word,token)));
    });
  }
  function parseRoute(hash){const raw=(hash||'#home').replace(/^#/,'');const split=raw.indexOf('?');const p=split<0?raw:raw.slice(0,split),q=split<0?'':raw.slice(split+1);const params=new URLSearchParams(q);const allowed=['home','resources','databases','conferences','microgrants','examples','about'];if(p.startsWith('resource/')){let id=p.slice(9);try{id=decodeURIComponent(id);}catch{}return {page:'detail',id,params};}return {page:allowed.includes(p)?p:'home',params};}
  function escapeHTML(text){return String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  const api={titleCase,normalize,filterResources,parseRoute,escapeHTML};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.HubCore=api;
})(typeof window!=='undefined'?window:globalThis);
