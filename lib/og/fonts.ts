import { readFile } from "fs/promises";
import { join } from "path";

export interface FontConfig {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600 | 700;
  style: "normal";
}

// Cache fonts in memory after first load
let cachedFonts: FontConfig[] | null = null;

export async function loadFonts(): Promise<FontConfig[]> {
  if (cachedFonts) return cachedFonts;

  const fontDir = join(process.cwd(), "public", "webfonts");

  // Load only the weights we need for OG images
  const fontFiles = [
    { file: "PublicSans-Regular.woff", weight: 400 as const },
    { file: "PublicSans-SemiBold.woff", weight: 600 as const },
    { file: "PublicSans-Bold.woff", weight: 700 as const },
  ];

  cachedFonts = await Promise.all(
    fontFiles.map(async ({ file, weight }) => {
      const buffer = await readFile(join(fontDir, file));
      return {
        name: "Public Sans",
        data: buffer.buffer.slice(
          buffer.byteOffset,
          buffer.byteOffset + buffer.byteLength
        ),
        weight,
        style: "normal" as const,
      };
    })
  );

  return cachedFonts;
}
