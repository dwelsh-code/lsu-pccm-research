'use strict';
// Recipient configuration is server-only. Never include it in a client response.
module.exports=async function notify(application){
 const recipient=process.env.MICROGRANT_RECIPIENT;
 if(!recipient)return false;
 const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(recipient),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json','Referer':'https://www.ctsresearchhub.org/'},body:JSON.stringify({_subject:'Lowenstein PCCM Micro-Grants application — '+application.reference,_template:'table',_captcha:'false',name:application.name,email:application.email,'Training level':application.level,'Project description':application.project,'Funding need':application.need,'Budget requested (USD)':application.budget,'Application reference':application.reference,'Submitted at':application.submitted}),signal:AbortSignal.timeout(12000)});
 const data=await response.json();return response.ok&&(data.success===true||data.success==='true')&&!/activat|confirm your email/i.test(data.message||'');
};
