import {readFile} from "node:fs/promises";
import {publicProjects,type ProfileConfig,type ProfileProject} from "./projects";

export interface ReadmeRenderInput {templatePath:string;profile:ProfileConfig;projects:ProfileProject[];}
export async function renderReadme(input:ReadmeRenderInput):Promise<string>{
  const template=await readFile(input.templatePath,"utf8");
  const projects=publicProjects(input.projects).sort((a,b)=>a.priority-b.priority);
  const replacements:Record<string,string>={
    HERO:renderHero(input.profile),
    COMPLETED_PROJECTS:renderGallery(projects.filter(p=>p.section==="completed")),
    TECH_STACK:'<p align="center"><a href="https://github.com/tandpfun/skill-icons"><img src="https://skillicons.dev/icons?i=js,ts,react,nodejs,postgres,mongodb,python,cpp,godot,git&perline=10" alt="JavaScript, TypeScript, React, Node.js, PostgreSQL, MongoDB, Python, C++, Godot, Git" /></a></p>',
    ACTIVITY:renderActivity(),
    ARCHIVE:renderArchive(projects.filter(p=>p.section==="assignment")),
    EXPERIMENTS:renderExperiments(projects.filter(p=>p.section==="in_progress"))
  };
  return Object.entries(replacements).reduce((content,[key,value])=>content.replaceAll(`{{${key}}}`,value),template);
}
function renderHero(profile:ProfileConfig):string{
  return [
    '<a href="https://github.com/kyechan99/capsule-render"><img src="assets/generated/capsule-header.svg" alt="jeongiryang" width="100%" /></a>',
    `<h3 align="center">${escapeHtml(profile.name)}</h3>`,
    '<p align="center">Computer Science · CWNU</p>',
    `<p align="center"><a href="${profile.siteUrl}"><img src="https://img.shields.io/badge/Portfolio-181717?style=for-the-badge&logo=githubpages&logoColor=white" alt="Portfolio" /></a></p>`
  ].join('\n');
}
export function renderGallery(projects:ProfileProject[]):string{
  const rows:string[]=[];
  for(let i=0;i<projects.length;){
    const wide=i===0&&projects[i].name==="wave-barrier-free-gyeongnam";
    const count=wide?1:2;
    rows.push('  <tr>',...projects.slice(i,i+count).map(p=>[
      `    <td ${wide?'colspan="2" width="100%"':'width="50%"'} valign="top">`,
      `      <h3><a href="${p.url}">${escapeHtml(p.displayName)}</a></h3>`,
      p.previewImage?`      <a href="${p.demoUrl??p.url}"><img src="${escapeHtml(p.previewImage)}" alt="${escapeHtml(p.previewAlt)}" width="100%" /></a>`:'',
      `      <p>${escapeHtml(p.description)}</p>`,
      p.name==="SoftwareEngineering_team15_project_-Smart-Edu-Platform"?'      <p><sub>공개 서비스 소개</sub></p>':'',
      `      <p><sub>${escapeHtml(p.tech.join(' · '))}</sub></p>`,
      `      <p><a href="${p.url}">Code</a>${p.demoUrl?` · <a href="${p.demoUrl}">Demo</a>`:''}</p>`,
      '    </td>'
    ].filter(Boolean).join('\n')),'  </tr>');
    i+=count;
  }
  return ['<table>',...rows,'</table>'].join('\n');
}
function renderActivity():string{
  return [
    '<p align="center"><picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/github-stats-dark.svg" />',
    '  <img src="assets/generated/github-stats-light.svg" alt="GitHub stats" width="460" />',
    '</picture></p>',
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/contribution-snake-dark.svg" />',
    '  <img src="assets/generated/contribution-snake-light.svg" alt="Contribution snake" width="100%" />',
    '</picture>','',
    '<details><summary>Code</summary>','',
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/source-scale-dark.svg" />',
    '  <img src="assets/generated/source-scale-light.svg" alt="Repository code size" width="100%" />',
    '</picture>','','</details>'
  ].join('\n');
}
function renderArchive(projects:ProfileProject[]):string{
  return ['<details>','<summary>과제 · 실험</summary>','','| 프로젝트 | 내용 |','|---|---|',
    ...projects.map(p=>`| [${cell(p.displayName)}](${p.url}) | ${cell(p.description)} |`),'','</details>'].join('\n');
}
function renderExperiments(projects:ProfileProject[]):string{
  return ['<details>','<summary>진행 중</summary>','','| 프로젝트 | 내용 |','|---|---|',
    ...projects.map(p=>`| [${cell(p.displayName)}](${p.url}) | ${cell(p.description)} |`),'','</details>'].join('\n');
}
export function escapeHtml(value:string):string{return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');}
function cell(value:string):string{return value.replaceAll('|','\\|').replaceAll('\n',' ');}
