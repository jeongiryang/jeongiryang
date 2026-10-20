import {writeFile,mkdir} from "node:fs/promises";
import {resolve} from "node:path";
import {renderReadme} from "./renderer";
import {profileConfig,profileProjects} from "./projects";
import {generateWorkshopHeaders} from "./svg/workshop";
import {collectSourceMetrics,generateSourceScaleSvgs} from "./source-metrics";
import {generateSite} from "./site";

const root=resolve(__dirname,"..");
async function main():Promise<void>{
  await mkdir(resolve(root,"assets/generated"),{recursive:true});
  if(process.argv.includes("--collect")){await collectSourceMetrics(root);return;}
  await generateWorkshopHeaders(resolve(root,"assets/generated"));
  await generateSourceScaleSvgs(root);
  const readme=await renderReadme({templatePath:resolve(root,"README.template.md"),profile:profileConfig,projects:profileProjects});
  await writeFile(resolve(root,"README.md"),`${readme.trimEnd()}\n`,"utf8");
  await generateSite(root);
  console.log("Generated README, workshop headers, source scale cards and HTML portfolio.");
}
main().catch(error=>{console.error(error);process.exitCode=1;});
