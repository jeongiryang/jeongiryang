import {test} from "node:test";
import assert from "node:assert/strict";
import {resolve} from "node:path";
import {profileConfig,profileProjects,publicProjects} from "../src/projects";
import {renderGallery,renderReadme} from "../src/renderer";

test("non-public and foreign-owner records never enter the public profile",async()=>{
  const base=profileProjects[0];
  const inputs=[base,{...base,isPrivate:true,displayName:"PRIVATE_SENTINEL"},{...base,isPublic:false,displayName:"HIDDEN_SENTINEL"},{...base,url:"https://github.com/other/reference",displayName:"FOREIGN_SENTINEL"}];
  assert.equal(publicProjects(inputs).length,1);
  const content=await renderReadme({templatePath:resolve(__dirname,"../README.template.md"),profile:profileConfig,projects:inputs});
  assert.doesNotMatch(content,/PRIVATE_SENTINEL|HIDDEN_SENTINEL|FOREIGN_SENTINEL/);
});
test("project text is escaped inside gallery HTML",()=>{
  const html=renderGallery([{...profileProjects[0],displayName:'<script>alert("x")</script>',description:'A & B'}]);
  assert.doesNotMatch(html,/<script>/);
  assert.match(html,/&lt;script&gt;/);
  assert.match(html,/A &amp; B/);
});
test("unchanged content produces identical README without a clock-only commit",async()=>{
  const input={templatePath:resolve(__dirname,"../README.template.md"),profile:profileConfig,projects:profileProjects};
  assert.equal(await renderReadme(input),await renderReadme(input));
  assert.equal(profileProjects.filter(p=>p.measureSource).length,7);
});
