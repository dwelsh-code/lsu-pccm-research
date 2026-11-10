const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const funding=require('../dist/funding.js');
const rows=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/intramural-funding.json'),'utf8'));
test('calendar contains only official LSU Health intramural programs',()=>{
 assert.equal(funding.validate(rows).length,8);
 assert(rows.some(r=>r.id==='wirp'));assert(rows.some(r=>r.id==='msrep'));
 assert.throws(()=>funding.validate([{...rows[0],url:'https://grants.nih.gov/'}]));
 assert.throws(()=>funding.validate([rows[0],rows[0]]));
});
test('recurring dates roll forward without inventing a dated call or holiday adjustment',()=>{
 const rep=rows.find(p=>p.id==='rep-new'),wirp=rows.find(p=>p.id==='wirp'),disparities=rows.find(p=>p.id==='rep-disparities');
 assert.equal(funding.nextDate(rep,'2026-11-09'),'2026-11-09');
 assert.equal(funding.nextDate(rep,'2026-11-10'),'2027-03-09');
 assert.equal(funding.nextDate(wirp,'2026-11-09'),'2027-03-15');
 assert.equal(funding.nextDate(disparities,'2026-11-09'),'2026-11-15');
 assert(funding.status(rep,'2026-11-09').includes('Confirm Current Call'));
});
test('past student call stays historical and rolling/no-date programs remain distinct',()=>{
 const student=rows.find(p=>p.id==='msrep');
 assert.equal(funding.nextDate(student,'2026-11-09'),null);
 assert.equal(funding.status(student,'2026-11-09'),'Past Call — Next Cycle Not Announced');
 assert.equal(funding.status(rows.find(p=>p.id==='resident-research'),'2026-11-09'),'Rolling Submission — Confirm Availability');
 assert.equal(funding.status(rows.find(p=>p.id==='core-voucher'),'2026-11-09'),'No Fixed Deadline Posted');
 assert.equal(funding.today(new Date('2026-11-10T01:00:00Z')),'2026-11-09');
});
test('funding stays collapsed below primary micro-grant content, with source dates and staleness cues',()=>{
 const html=funding.render(rows,false,new Date('2026-11-09T18:00:00Z'));
 assert(html.includes('id="other-intramural-funding" >'));
 assert(!html.includes('id="other-intramural-funding" open'));
 assert(html.includes('Source checked Nov 9, 2026'));assert(html.includes('Next Nominal Date'));
 assert(funding.render(rows,true).includes('id="other-intramural-funding" open'));
 assert(funding.render(rows,false,new Date('2027-05-01T18:00:00Z')).includes('Schedule Needs Rechecking'));
 const app=fs.readFileSync(path.join(__dirname,'../dist/app.js'),'utf8');
 const page=app.slice(app.indexOf('function microgrants()'),app.indexOf('function about()'));
 assert(page.indexOf('microgrant-form')<page.indexOf('IntramuralFunding.render'));
 assert(page.indexOf('id="recipients"')<page.indexOf('IntramuralFunding.render'));
 const records=funding.searchRecords(rows);assert(records.every(r=>r.url==='#microgrants?intramural=1'));
});
