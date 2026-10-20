import {copyFile,mkdir,readFile,writeFile} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import MarkdownIt from "markdown-it";
import {publicProjects} from "./projects";

export async function generateSite(root:string):Promise<void>{
  const output=resolve(root,"site");
  const assets=[...publicProjects().filter(p=>p.section==="completed").map(p=>p.previewImage).filter(Boolean),
    'assets/generated/capsule-header.svg',
    ...["github-stats","source-scale","contribution-snake"].flatMap(p=>["light","dark"].map(t=>`assets/generated/${p}-${t}.svg`))];
  for(const asset of assets){
    const target=resolve(output,asset);await mkdir(dirname(target),{recursive:true});
    await copyFile(resolve(root,asset),target);
  }
  await mkdir(resolve(output,'assets/vendor'),{recursive:true});
  await copyFile(resolve(root,'node_modules/github-markdown-css/github-markdown.css'),resolve(output,'assets/vendor/github-markdown.css'));
  await copyFile(resolve(root,'node_modules/github-markdown-css/license'),resolve(output,'assets/vendor/github-markdown-css-LICENSE'));
  const markdown=await readFile(resolve(root,'README.md'),'utf8');
  const content=new MarkdownIt({html:true}).render(markdown);
  await writeFile(resolve(output,"index.html"),`<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>jeongiryang</title><link rel="stylesheet" href="assets/vendor/github-markdown.css">
<style>body{margin:0;background:#fff}.markdown-body{box-sizing:border-box;min-width:200px;max-width:980px;margin:0 auto;padding:45px}.markdown-body table{display:table;width:100%;table-layout:fixed}.markdown-body td{overflow-wrap:anywhere}.markdown-body td img{max-width:100%;height:auto}.markdown-body summary{cursor:pointer}@media(max-width:767px){.markdown-body{padding:15px}}@media(prefers-color-scheme:dark){body{background:#0d1117}}</style>
</head><body><main class="markdown-body">${content}</main></body></html>`,"utf8");
  await writeFile(resolve(output,".nojekyll"),"","utf8");
}
