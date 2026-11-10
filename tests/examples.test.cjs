const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const lib=require('../dist/examples.js'),core=require('../dist/core.js');
// Synthetic fixture exists only in tests; it is never a public project record.
const fixture={id:'test-example',title:'Synthetic <Project>',authors:'Test Author',studyType:'Existing Dataset',question:'Test research question',design:'Secondary analysis',feasibility:'Existing variables and bounded scope',conclusion:'An imprecise estimate supports no definitive difference',limitations:'No causal claim',status:'Completed',approvedForPublicDisplay:true,facultyReviewed:true,materials:[{format:'Poster',label:'Test poster',url:'assets/project-examples/test.pdf'},{format:'Specific Aims',label:'Test aims',url:'https://example.org/aims.pdf'}]};
test('only faculty-reviewed, public-approved completed projects can appear',()=>{
 assert.equal(lib.approved([fixture,{...fixture,approvedForPublicDisplay:false},{...fixture,facultyReviewed:false}]).length,1);
 assert.throws(()=>lib.approved([{...fixture,conclusion:''}]));
 assert.throws(()=>lib.approved([{...fixture,status:'Guaranteed Publication'}]));
 assert.throws(()=>lib.approved([{...fixture,materials:[{format:'Poster',label:'Unsafe',url:'javascript:alert(1)'}]}]));
 assert.equal(lib.safeMaterial('assets/project-examples/../private.pdf'),false);
});
test('example search and filters compose while preserving valid null/inconclusive conclusions',()=>{
 assert.equal(lib.filter([fixture],{query:'imprecise',format:'Poster',study:'Existing Dataset',status:'Completed'}).length,1);
 assert.equal(lib.filter([fixture],{format:'IRB Protocol'}).length,0);
 assert.equal(lib.filter([fixture],{project:'missing'}).length,0);
 const record=lib.searchRecords([fixture]).find(r=>r.id==='example-test-example');assert.equal(record.url,'#examples?project=test-example');
 assert(core.filterResources([record],{query:'specific aims'}).length);
});
test('empty library provides usable planning tools and does not fabricate completed work',()=>{
 const page=lib.page([]);assert(page.includes('No completed-project examples have been added yet'));
 assert(!page.includes('Synthetic'));assert(page.includes('Specific Aims Page'));assert(page.includes('Retrospective/Chart Review'));
 assert.equal(core.parseRoute('#examples').page,'examples');
 assert(core.filterResources(lib.searchRecords([]),{query:'specific aims'}).length);
 for(const slug of ['specific-aims','abstract-poster','retrospective','secondary-data','prospective','interventional']){
  const file=path.join(__dirname,'../dist/assets/project-tools',slug+'.html');assert(fs.existsSync(file));
  const html=fs.readFileSync(file,'utf8');assert(html.includes('contenteditable="true"'));assert(html.includes('Not a Completed Project'));assert(html.includes('window.print()'));
 }
 assert.deepEqual(JSON.parse(fs.readFileSync(path.join(__dirname,'../data/project-examples.json'),'utf8')),[]);
});
test('rendered project cards escape text and live filters update results',()=>{
 const vm=require('node:vm');const nodes=new Map();
 function get(id){if(!nodes.has(id))nodes.set(id,{value:'',innerHTML:'',textContent:'',events:{},addEventListener(event,fn){this.events[event]=fn;}});return nodes.get(id);}
 const context={window:{},URL,URLSearchParams,document:{querySelectorAll:()=>[],getElementById:get}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../dist/examples.js'),'utf8'),context);
 context.window.ProjectExamples.mount([fixture]);
 assert(get('example-results').innerHTML.includes('Synthetic &lt;Project&gt;'));
 assert(!get('example-results').innerHTML.includes('Synthetic <Project>'));
 assert.equal(get('examples-count').textContent,'1 project');
 get('examples-format').value='IRB Protocol';get('examples-format').events.change();
 assert.equal(get('examples-count').textContent,'0 projects');
 assert(get('example-results').innerHTML.includes('No matching projects'));
 assert(!lib.safeMaterial('data:text/html,unsafe'));
});
