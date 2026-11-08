// Only the website and its download are published; project backups stay private.
const fs = require('node:fs');
const path = require('node:path');
const output = path.join(__dirname, 'public');
// Source checkouts use dist/; the GitHub launch layout keeps these files at root.
const source = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
  ? path.join(__dirname, 'dist') : __dirname;
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'app-data.js', 'core.js', 'app.js']) {
  fs.copyFileSync(path.join(source, file), path.join(output, file));
}
const documentName = 'Pulmonary_and_Critical_Care_Research_Databases.docx';
const documentSource = source === __dirname ? path.join(source, documentName)
  : path.join(source, 'assets', documentName);
fs.copyFileSync(documentSource, path.join(output, 'assets', documentName));
if (!fs.existsSync(path.join(output, 'index.html'))) throw new Error('Website entry point is missing');
console.log('Prepared static website in public/');
