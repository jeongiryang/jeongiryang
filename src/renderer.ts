import {readFile} from "node:fs/promises";
import {publicProjects,type ProfileConfig,type ProfileProject} from "./projects";

export interface ReadmeRenderInput {templatePath:string;profile:ProfileConfig;projects:ProfileProject[];}
export async function renderReadme(input:ReadmeRenderInput):Promise<string>{
  const template=await readFile(input.templatePath,"utf8");
  const projects=publicProjects(input.projects).sort((a,b)=>a.priority-b.priority);
  const replacements:Record<string,string>={
    HERO:renderHero(input.profile),
    COMPLETED_PROJECTS:renderGallery(projects.filter(p=>p.section==="completed")),
    TECH_STACK:'<p align="center"><a href="https://github.com/tandpfun/skill-icons"><img src="https://skillicons.dev/icons?i=js,ts,react,nodejs,postgres,mongodb,python,cpp,godot,git&perline=10" alt="프로젝트에서 사용한 기술: JavaScript, TypeScript, React, Node.js, PostgreSQL, MongoDB, Python, C++, Godot, Git" /></a></p>',
    ACTIVITY:renderActivity(),
    ARCHIVE:renderArchive(projects.filter(p=>p.section==="assignment")),
    EXPERIMENTS:renderExperiments(projects.filter(p=>p.section==="in_progress"))
  };
  return Object.entries(replacements).reduce((content,[key,value])=>content.replaceAll(`{{${key}}}`,value),template);
}
function renderHero(profile:ProfileConfig):string{
  return [
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/workshop-dark.svg" />',
    '  <img src="assets/generated/workshop-light.svg" alt="JEONGIRYANG / WORKSHOP — Small tools. Real outcomes." width="100%" />',
    '</picture>','',
    `<h1 align="center">${escapeHtml(profile.name)}의 제작실</h1>`,
    `<p align="center"><strong>${escapeHtml(profile.headline)}</strong><br />${escapeHtml(profile.role)} · ${escapeHtml(profile.description)}</p>`,
    `<p align="center"><a href="${profile.siteUrl}"><img src="https://img.shields.io/badge/OPEN_WORKSHOP-HTML_Portfolio-1f6f5b?style=for-the-badge" alt="HTML 작품실 바로가기" /></a></p>`,
    '<p align="center"><a href="#대표-프로젝트">대표 프로젝트</a> · <a href="#기여-기록과-코드-규모">기여 기록</a> · <a href="#작업-보관함">작업 보관함</a></p>'
  ].join('\n');
}
export function renderGallery(projects:ProfileProject[]):string{
  const rows:string[]=[];
  for(let i=0;i<projects.length;){
    const wide=i===0&&projects[i].name==="wave-barrier-free-gyeongnam";
    const count=wide?1:2;
    rows.push('  <tr>',...projects.slice(i,i+count).map(p=>[
      `    <td ${wide?'colspan="2" width="100%"':'width="50%"'} valign="top">`,
      p.previewImage?`      <a href="${p.url}"><img src="${escapeHtml(p.previewImage)}" alt="${escapeHtml(p.previewAlt)}" width="100%" /></a>`:'',
      p.previewCaption?`      <p><sub>${escapeHtml(p.previewCaption)}</sub></p>`:'',
      `      <h3><a href="${p.url}">${escapeHtml(p.displayName)}</a></h3>`,
      `      <p><strong>${escapeHtml(p.statusLabel)}</strong><br /><sub>${escapeHtml(p.role)}</sub></p>`,
      `      <p>${escapeHtml(p.description)}<br />${escapeHtml(p.result)}</p>`,
      `      <p><sub>${escapeHtml(p.tech.join(' · '))}</sub></p>`,
      `      <p><a href="${p.url}">코드와 제작 기록 ↗</a>${p.demoUrl?` · <a href="${p.demoUrl}">사용해 보기 ↗</a>`:''}</p>`,
      '    </td>'
    ].filter(Boolean).join('\n')),'  </tr>');
    i+=count;
  }
  return ['<table>',...rows,'</table>'].join('\n');
}
function renderActivity():string{
  return [
    '<p align="center">',
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/github-stats-dark.svg" />',
    '  <img src="assets/generated/github-stats-light.svg" alt="공개 GitHub 통계: 커밋, Pull Request, 이슈 등 GitHub 집계 기준" width="460" />',
    '</picture>',
    '</p>',
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/source-scale-dark.svg" />',
    '  <img src="assets/generated/source-scale-light.svg" alt="선정한 공개 원본 프로젝트 7개의 현재 소스 코드 줄 수. 개인 작성량이 아닌 저장소 코드 규모입니다." width="100%" />',
    '</picture>','',
    '> 코드 규모는 선정한 공개 원본 7개의 현재 HEAD를 cloc으로 측정합니다. 외부 라이브러리·생성물·lock 파일 등은 제외하며, 팀 전체 코드도 포함되어 **개인 작성량이나 작업 시간과는 다릅니다.** [집계 기준](docs/setup.md#코드-규모)','',
    '<picture>',
    '  <source media="(prefers-color-scheme: dark)" srcset="assets/generated/contribution-snake-dark.svg" />',
    '  <img src="assets/generated/contribution-snake-light.svg" alt="GitHub 기여 달력을 따라 움직이는 스네이크 애니메이션" width="100%" />',
    '</picture>','',
    '<sub>실제 GitHub 기여 달력을 시각화합니다. 기여 수와 커밋 수는 같은 지표가 아닙니다.</sub>'
  ].join('\n');
}
function renderArchive(projects:ProfileProject[]):string{
  return ['<details>','<summary>완료한 수업 프로젝트와 실험 보기</summary>','','| 프로젝트 | 만든 결과 | 기술 |','|---|---|---|',
    ...projects.map(p=>`| [${cell(p.displayName)}](${p.url}) | ${cell(p.description)} | ${cell(p.tech.join(' · '))} |`),'','</details>'].join('\n');
}
function renderExperiments(projects:ProfileProject[]):string{
  return ['<details>','<summary>개발 중인 서비스와 프로토타입 보기</summary>','','아래 작업은 완성작과 구분해 기록합니다.','','| 프로젝트 | 현재 단계 | 내용 |','|---|---|---|',
    ...projects.map(p=>`| [${cell(p.displayName)}](${p.url}) | ${cell(p.statusLabel)} | ${cell(p.description)} |`),'','</details>'].join('\n');
}
export function escapeHtml(value:string):string{return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');}
function cell(value:string):string{return value.replaceAll('|','\\|').replaceAll('\n',' ');}
