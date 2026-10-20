import {readFile,access} from 'node:fs/promises';
import {resolve,sep,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const {publicProjects}=require('../dist/projects.js');
const projects=publicProjects();
const featured=projects.filter(p=>p.section==='completed').sort((a,b)=>a.priority-b.priority);
assert.equal(featured[0].name,'wave-barrier-free-gyeongnam');
const captures=JSON.parse(await readFile(resolve(root,'assets/previews/capture-manifest.json'),'utf8'));
assert.equal(captures.schemaVersion,1);
for(const project of featured){
  assert.match(project.previewImage,/^assets\/previews\/[a-z0-9-]+-live\.gif$/);
  const record=captures.captures.find(c=>`assets/previews/${c.file}`===project.previewImage);
  assert.ok(record,`Missing live capture record: ${project.name}`);
  assert.equal(record.sourceUrl,project.demoUrl);
  assert.ok(Number.isFinite(Date.parse(record.capturedAt)));
  const bytes=await readFile(resolve(root,project.previewImage));
  assert.match(bytes.subarray(0,6).toString(),/^GIF8[79]a$/);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha256);
}
const snapshot=JSON.parse(await readFile(resolve(root,'assets/generated/source-metrics.json'),'utf8'));
assert.equal(snapshot.schemaVersion,1);
assert.equal(snapshot.clocVersion,'2.10');
const allowed=new Set(projects.filter(p=>p.measureSource).map(p=>`jeongiryang/${p.name}`));
assert.equal(snapshot.projects.length,allowed.size);
for(const record of snapshot.projects){
  assert.ok(allowed.has(record.repo),`Non-allowlisted metric: ${record.repo}`);
  assert.match(record.head,/^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(record.code)&&record.code>=0);
}
for(const file of ['README.md','site/index.html']){
  const text=await readFile(resolve(root,file),'utf8');
  assert.doesNotMatch(text,/\{\{[A-Z_]+\}\}|2026-barrier-free-tour-data-app|cwnu-campus-hub|3am-computer-science-mystery-room|gh[pousr]_[A-Za-z0-9]{20,}/);
  const folder=file.startsWith('site/')?resolve(root,'site'):root;
  for(const match of text.matchAll(/(?:src|srcset)="([^"]+)"/g)){
    if(/^https?:/.test(match[1]))continue;
    const target=resolve(folder,match[1]);
    assert.ok(target.startsWith(folder+sep),`Asset escaped the project: ${match[1]}`);
    await access(target);
  }
}
for(const name of ['workshop','github-stats','source-scale','contribution-snake']){
  for(const theme of ['light','dark']){
    const text=await readFile(resolve(root,`assets/generated/${name}-${theme}.svg`),'utf8');
    assert.match(text,/<svg\b/);
    assert.doesNotMatch(text,/Something went wrong|RATE_LIMITED|<script\b/i);
  }
}
console.log(`Verified public allowlist, ${allowed.size} source measurements, README/site assets and eight SVGs.`);
