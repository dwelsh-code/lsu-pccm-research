(function(root){
  'use strict';
  function normalize(text){return String(text||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function filterResources(items,options){
    const o=options||{};const words=normalize(o.query).split(/\s+/).filter(Boolean);
    return items.filter(item=>{
      if(o.type&&o.type!=='all'&&item.type!==o.type)return false;
      if(o.category&&o.category!=='all'&&item.category!==o.category)return false;
      if(o.topic&&o.topic!=='all'&&item.topic!==o.topic)return false;
      const text=normalize([item.name,item.summary,item.access,item.topic,item.category,...(item.tags||[])].join(' '));
      return words.every(word=>text.includes(word));
    });
  }
  function parseRoute(hash){const raw=(hash||'#home').replace(/^#/,'');const split=raw.indexOf('?');const p=split<0?raw:raw.slice(0,split),q=split<0?'':raw.slice(split+1);const params=new URLSearchParams(q);const allowed=['home','resources','databases','conferences','about'];if(p.startsWith('resource/')){let id=p.slice(9);try{id=decodeURIComponent(id);}catch{}return {page:'detail',id,params};}return {page:allowed.includes(p)?p:'home',params};}
  function escapeHTML(text){return String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  const api={normalize,filterResources,parseRoute,escapeHTML};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.HubCore=api;
})(typeof window!=='undefined'?window:globalThis);
