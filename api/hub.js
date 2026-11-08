'use strict';
const {createService,ServiceError}=require('../lib/hub-service.cjs');
const store=require('../lib/blob-store.cjs');
const notify=require('../lib/email.cjs');
const service=createService({store,notify});
const origins=new Set(['https://www.ctsresearchhub.org','https://ctsresearchhub.org','https://www.lsupccmresearch.org','https://lsupccmresearch.org','https://lsu-pccm-research.vercel.app',...(process.env.VERCEL_URL?['https://'+process.env.VERCEL_URL]:[])]);
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const send=(status,value)=>res.status(status).json(value);
 try{
  if(!['GET','POST'].includes(req.method)){res.setHeader('Allow','GET, POST');return send(405,{error:'Method not allowed.'});}
  const action=new URL(req.url,'https://local.invalid').searchParams.get('action');
  if(req.method==='GET'&&action==='status')return send(200,{bookingEnabled:!!process.env.BLOB_READ_WRITE_TOKEN,grantsEnabled:!!process.env.BLOB_READ_WRITE_TOKEN&&!!process.env.MICROGRANT_RECIPIENT&&process.env.EMAIL_DELIVERY_VERIFIED==='true'});
  if(!process.env.BLOB_READ_WRITE_TOKEN)return send(503,{error:'Online submissions are being connected. Please try again later; nothing has been submitted.'});
  if(req.method==='GET'){if(action!=='schedule')return send(404,{error:'Not found.'});return send(200,await service.schedule());}
  if(!origins.has(req.headers.origin))return send(403,{error:'Please submit the form from the research website.'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(415,{error:'Please submit the form from the research website.'});
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  if(!body||typeof body!=='object'||Array.isArray(body)||Buffer.byteLength(JSON.stringify(body))>12000)return send(400,{error:'The form is too long or incomplete.'});
  const ip=String(req.headers['x-forwarded-for']||'unknown').split(',')[0];
  if(action==='book')return send(201,await service.book(body,ip));
  if(action==='cancel')return send(200,await service.cancel(body,ip));
  if(action==='microgrant'){if(!process.env.MICROGRANT_RECIPIENT||process.env.EMAIL_DELIVERY_VERIFIED!=='true')return send(503,{error:'Applications are not open yet. Please check back soon; nothing has been submitted.'});return send(201,await service.microgrant(body,ip));}
  return send(404,{error:'Not found.'});
 }catch(error){if(error instanceof ServiceError)return send(error.status,{error:error.message});if(error instanceof SyntaxError)return send(400,{error:'Please check the form and try again.'});console.error('Hub submission failed:',error.name);return send(503,{error:'We could not complete this request. Please try again; no confirmation has been issued.'});}
};
