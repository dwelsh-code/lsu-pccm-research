const fs=require('fs'),path=require('path');
let html=fs.readFileSync(path.join(__dirname,'dist/index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="styles.css">',()=>'<style>'+fs.readFileSync(path.join(__dirname,'dist/styles.css'),'utf8')+'</style>');
const mime='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const payload=fs.readFileSync(path.join(__dirname,'dist/assets/Pulmonary_and_Critical_Care_Research_Databases.docx')).toString('base64');
for(const f of ['app-data.js','core.js','conference-core.js','schedule.js','app.js']){
 let js=fs.readFileSync(path.join(__dirname,'dist',f),'utf8');
 if(f==='app-data.js')js+=`\nwindow.HUB_DATA.download='data:${mime};base64,${payload}';\n`;
 js=js.replace(/<\/script/gi,'<\\/script');
 html=html.replace('<script defer src="'+f+'"></script>','');
 html=html.replace('</body>',()=>'<script>'+js+'</script></body>');
}
// Preserve script order and place all dependencies after the rendered page shell.
html=html.replaceAll('href="assets/Pulmonary_and_Critical_Care_Research_Databases.docx"',`href="data:${mime};base64,${payload}" download="Pulmonary_and_Critical_Care_Research_Databases.docx"`);
fs.mkdirSync(path.join(__dirname,'preview'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'preview','CTS_Research_Hub_Preview.html'),html);
console.log('Built self-contained HTML preview with embedded document download.');
