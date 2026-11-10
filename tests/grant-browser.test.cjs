const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const values={name:'Synthetic applicant',email:'synthetic@lsuhsc.edu',level:'Fellow',project:'Synthetic <project>',need:'Test only',budget:'1'};
const reply=(body,ok=true)=>({ok,json:async()=>body});
async function browser({storageFails=false,navigationFails=false,hash='#microgrants'}={}){
 const calls=[],posts=[];
 const form={resetCount:0,reset(){this.resetCount++;}},button={type:'submit'},status={focus(){}};
 const nodes={'microgrant-form':form,'grant-submit':button,'grant-status':status};
 const context={window:{ConferenceCore:require('../dist/conference-core.js'),HubCore:require('../dist/core.js')},location:{hash},URLSearchParams,
 document:{getElementById:id=>nodes[id],body:{appendChild(){}},createElement(tag){if(tag==='input')return {};if(tag==='form')return {inputs:[],appendChild(input){this.inputs.push(input);},submit(){if(navigationFails)throw Error('navigation blocked');posts.push({action:this.action,method:this.method,fields:Object.fromEntries(this.inputs.map(x=>[x.name,x.value]))});},remove(){}};throw Error('Unexpected element');}},
 FormData:class{[Symbol.iterator](){return Object.entries(values)[Symbol.iterator]();}},console,
 fetch:async(url,options)=>{calls.push({url,options});if(url.includes('action=status'))return reply({grantsEnabled:true});if(url.includes('action=microgrant'))return storageFails?reply({error:'Storage unavailable'},false):reply({reference:'LPMG-20261108-012345ABCD',notified:false});throw Error('No AJAX provider calls should be made');}};
 vm.createContext(context);vm.runInContext(fs.readFileSync('dist/schedule.js','utf8'),context);
 context.window.HubSchedule.bindGrant();await new Promise(setImmediate);
 return {calls,posts,form,button,status,submit:()=>form.onsubmit({preventDefault(){}})};
}
test('browser saves privately then performs a native POST to the opaque alias',async()=>{
 const b=await browser();await b.submit();
 assert.equal(b.calls.length,2);assert(b.calls[1].url.includes('action=microgrant'));
 assert.equal(b.posts.length,1);const post=b.posts[0];assert.equal(post.method,'POST');
 assert(post.action.startsWith('https://formsubmit.co/'));assert(!post.action.includes('/ajax/'));assert(!post.action.includes('@'));
 assert.equal(post.fields['Application reference'],'LPMG-20261108-012345ABCD');assert.equal(post.fields['Project description'],values.project);
 assert(post.fields._next.startsWith('https://www.ctsresearchhub.org/#microgrants?receipt='));assert.equal(post.fields.email,values.email);
 assert(!('_captcha' in post.fields));assert(!b.status.textContent.includes('email service accepted'));assert.equal(b.form.resetCount,1);
});
test('failed private save never posts notification or resets applicant fields',async()=>{
 const b=await browser({storageFails:true});await b.submit();assert.equal(b.posts.length,0);assert.equal(b.form.resetCount,0);assert.equal(b.status.textContent,'Storage unavailable');
});
test('repeating only the email step preserves the same stored application reference',async()=>{
 const b=await browser();await b.submit();assert.equal(b.button.type,'button');b.button.onclick();
 assert.equal(b.calls.filter(x=>x.url.includes('action=microgrant')).length,1);assert.equal(b.posts.length,2);
 assert.equal(b.posts[0].fields['Application reference'],b.posts[1].fields['Application reference']);
});
test('navigation failure preserves the receipt and does not claim email delivery',async()=>{
 const b=await browser({navigationFails:true});await b.submit();assert.equal(b.posts.length,0);
 assert(b.status.textContent.includes('LPMG-20261108-012345ABCD'));assert(b.status.textContent.includes('could not open'));assert.equal(b.button.disabled,false);
});
test('return receipt is displayed safely without claiming inbox delivery',async()=>{
 const b=await browser({hash:'#microgrants?receipt=LPMG-20261108-012345ABCD'});
 assert(b.status.textContent.includes('LPMG-20261108-012345ABCD'));assert(b.status.textContent.includes('Inbox delivery still requires confirmation'));
 const invalid=await browser({hash:'#microgrants?receipt=%3Cscript%3E'});assert.equal(invalid.status.textContent,'');
});
