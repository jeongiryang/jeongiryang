import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface WorkshopPalette {
  background: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentSoft: string;
  frame: string;
  screen: string;
  screenInk: string;
  screenMuted: string;
  object: string;
}

const palettes: Record<"light" | "dark", WorkshopPalette> = {
  light: {
    background: "#f2f7f3",
    ink: "#142d26",
    muted: "#557066",
    line: "#cbdcd1",
    accent: "#1a7355",
    accentSoft: "#d9ecdf",
    frame: "#c4d8cc",
    screen: "#14352a",
    screenInk: "#c4f0d5",
    screenMuted: "#74a98b",
    object: "#e4efe7"
  },
  dark: {
    background: "#0e201b",
    ink: "#ecf5ee",
    muted: "#9ab7a8",
    line: "#2a493b",
    accent: "#91dfb2",
    accentSoft: "#1b3b2c",
    frame: "#315844",
    screen: "#10291f",
    screenInk: "#b6edca",
    screenMuted: "#628f74",
    object: "#19352a"
  }
};

/** Create self-contained, theme-specific README header images. */
export async function generateWorkshopHeaders(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });

  await Promise.all(
    (Object.keys(palettes) as Array<keyof typeof palettes>).map((theme) =>
      writeFile(
        join(outputDir, `workshop-${theme}.svg`),
        renderWorkshopHeader(palettes[theme]),
        "utf8"
      )
    )
  );
}

function renderWorkshopHeader(palette: WorkshopPalette): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300" role="img" aria-labelledby="workshop-title workshop-description">
  <title id="workshop-title">Jeongiryang / Workshop — Small tools. Real outcomes.</title>
  <desc id="workshop-description">A quiet mint and navy workshop with a geometric computer, a notebook, and a workbench. Build, test, repeat.</desc>
  <defs>
    <pattern id="workshop-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="${palette.line}"/>
    </pattern>
  </defs>
  <rect width="1200" height="300" rx="18" fill="${palette.background}"/>
  <rect x="732" y="24" width="444" height="252" rx="14" fill="url(#workshop-grid)" opacity="0.65"/>

  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif">
    <rect x="56" y="45" width="24" height="4" rx="2" fill="${palette.accent}"/>
    <text x="94" y="52" fill="${palette.muted}" font-size="13" font-weight="600" letter-spacing="2.5">JEONGIRYANG / WORKSHOP</text>
    <text x="54" y="127" fill="${palette.ink}" font-size="53" font-weight="600" letter-spacing="-1.8">Small tools.</text>
    <text x="54" y="187" fill="${palette.ink}" font-size="53" font-weight="600" letter-spacing="-1.8">Real outcomes.</text>
    <text x="57" y="244" fill="${palette.muted}" font-size="13" font-weight="500" letter-spacing="3">BUILD / TEST / REPEAT</text>
  </g>

  <g aria-hidden="true">
    <rect x="793" y="54" width="306" height="177" rx="13" fill="${palette.frame}"/>
    <rect x="804" y="65" width="284" height="151" rx="5" fill="${palette.screen}"/>
    <circle cx="817" cy="79" r="2.5" fill="${palette.screenMuted}"/>
    <circle cx="828" cy="79" r="2.5" fill="${palette.screenMuted}" opacity="0.7"/>
    <circle cx="839" cy="79" r="2.5" fill="${palette.screenMuted}" opacity="0.4"/>
    <rect x="818" y="94" width="256" height="1" fill="${palette.screenMuted}" opacity="0.3"/>
    <g font-family="ui-monospace, 'SFMono-Regular', Consolas, monospace" font-size="19" font-weight="500" fill="${palette.screenInk}">
      <text x="823" y="126">build.</text>
      <text x="823" y="157">test.</text>
      <text x="823" y="188">repeat.</text>
    </g>
    <rect x="1008" y="112" width="48" height="5" rx="2.5" fill="${palette.screenMuted}" opacity="0.65"/>
    <rect x="984" y="143" width="72" height="5" rx="2.5" fill="${palette.screenMuted}" opacity="0.45"/>
    <rect x="1024" y="174" width="32" height="5" rx="2.5" fill="${palette.screenMuted}" opacity="0.65"/>
    <rect x="929" y="230" width="34" height="17" fill="${palette.frame}"/>
    <rect x="907" y="244" width="78" height="6" rx="3" fill="${palette.frame}"/>

    <rect x="726" y="196" width="47" height="47" rx="4" fill="${palette.accentSoft}"/>
    <rect x="738" y="205" width="23" height="3" rx="1.5" fill="${palette.accent}" opacity="0.55"/>
    <rect x="738" y="215" width="16" height="3" rx="1.5" fill="${palette.accent}" opacity="0.35"/>
    <rect x="738" y="225" width="20" height="3" rx="1.5" fill="${palette.accent}" opacity="0.35"/>

    <rect x="1114" y="212" width="27" height="31" rx="3" fill="${palette.object}"/>
    <rect x="1121" y="195" width="4" height="20" rx="2" fill="${palette.accent}" opacity="0.75"/>
    <rect x="1130" y="200" width="4" height="15" rx="2" fill="${palette.muted}"/>
    <rect x="710" y="249" width="448" height="5" rx="2.5" fill="${palette.line}"/>
    <rect x="734" y="254" width="6" height="18" rx="2" fill="${palette.line}"/>
    <rect x="1128" y="254" width="6" height="18" rx="2" fill="${palette.line}"/>
  </g>
</svg>
`;
}
