(function(root){
'use strict';
const zone='America/Chicago';
function centralToday(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
function dates(now=new Date(),count=12){const today=centralToday(now),[year,month]=today.split('-').map(Number),out=[];for(let offset=0;out.length<count&&offset<18;offset++){const first=new Date(Date.UTC(year,month-1+offset,1));const firstWed=1+(3-first.getUTCDay()+7)%7;for(const d of [firstWed+7,firstWed+21]){const iso=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth(),d)).toISOString().slice(0,10);if(iso>=today)out.push(iso);}}return out.slice(0,count);}
function dateLabel(iso){return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));}
function isEmail(email){return typeof email==='string'&&/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@lsuhsc\.edu$/i.test(email)&&email.length<=254;}
function startTime(iso){const noon=new Date(iso+'T12:00:00Z');const parts=new Intl.DateTimeFormat('en-US',{timeZone:zone,timeZoneName:'shortOffset'}).formatToParts(noon);const offset=Number(parts.find(p=>p.type==='timeZoneName').value.replace('GMT',''));return new Date(noon.getTime()-offset*3600000);}
const api={dates,dateLabel,isEmail,startTime,centralToday,zone};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.ConferenceCore=api;
})(typeof window!=='undefined'?window:globalThis);
