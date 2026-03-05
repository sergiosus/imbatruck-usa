/**
 * Generate hero image via OpenAI DALL-E 3 and save to public/hero-truck.jpg
 * Run: node scripts/generate-hero-image.mjs
 * Requires: OPENAI_API_KEY in .env.local or environment
 */
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outPath = path.join(projectRoot, "public", "hero-truck.jpg");

// Load .env.local if present
const envPath = path.join(projectRoot, ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const HERO_PROMPT = `Professional commercial photography. A modern red semi-truck with trailer driving on a US highway during sunset, golden hour lighting. Other trucks visible in the background. American landscape, highway scene in the United States. Realistic transport photography style. Leave empty space on the left side of the frame for text overlay. No logos, no brand names, no text on the truck or in the scene. High quality, 16:9 style composition.`;

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY. Set it in .env.local or environment.");
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });
  console.log("Generating hero image with DALL-E 3...");
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: HERO_PROMPT,
    n: 1,
    size: "1792x1024",
    response_format: "url",
    quality: "hd",
  });

  const url = response.data?.[0]?.url;
  if (!url) {
    console.error("No image URL returned from OpenAI.");
    process.exit(1);
  }

  console.log("Downloading image...");
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to download image:", res.status);
    process.exit(1);
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  fs.writeFileSync(outPath, buffer);
  console.log("Saved:", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
