const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const core=require('../dist/core.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../dist/app-data.js'),'utf8'),context);
const data=context.window.HUB_DATA,all=[...data.resources,...data.databases];
test('common search terms, separated product names, and small typos find useful destinations',()=>{
 for(const [query,id] of [['ethics','irb-start'],['human subjects','training'],['red cap','redcap-login'],['redcp','redcap-login'],['PHAR','db-phar'],['PH','db-phar'],['ECMO','db-elso'],['SARP','db-sarp'],['kuali','kuali-login']])assert(core.filterResources(all,{query}).some(r=>r.id===id),query);
 assert.equal(core.filterResources(data.databases,{query:'PHAR',topic:'COPD and emphysema'}).length,0);
});
test('title case keeps small connecting words and scientific names intact',()=>{
 assert.equal(core.titleCase('Study design and statistics'),'Study Design and Statistics');
 assert.equal(core.titleCase('Database of Genotypes and Phenotypes dbGaP'),'Database of Genotypes and Phenotypes dbGaP');
 assert.equal(core.titleCase('eICU and COPDGene'),'eICU and COPDGene');
});
test('all six additions have dated access guidance and original IDs remain intact',()=>{
 for(let i=1;i<=40;i++)assert(data.databases.some(r=>r.id==='db-'+i));
 for(const id of ['db-phar','db-pah-biobank','db-elso','db-virus','db-sarp','db-alveoli']){const row=data.databases.find(r=>r.id===id);assert(row);assert(row.access.length>50);assert(row.badges.length);assert.equal(row.checked,'2026-11-09');assert.equal(new URL(row.accessUrl).protocol,'https:');}
 assert.equal(data.databases.length,46);assert.equal(data.topics.length,18);
});
