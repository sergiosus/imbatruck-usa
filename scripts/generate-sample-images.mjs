/**
 * Generate unique listing images via OpenAI DALL-E 3 for Imbatruck sample listings.
 * Saves to public/images/freight/ and public/images/trucks/.
 *
 * Run: node scripts/generate-sample-images.mjs
 * Optional: FROM=1 TO=10 (default: generate all 300 freight + 120 trucks)
 * Requires: OPENAI_API_KEY in .env.local or environment
 *
 * Example (batch): FROM=1 TO=20 node scripts/generate-sample-images.mjs
 */
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public", "images");

// Load .env.local
const envPath = path.join(projectRoot, ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const FREIGHT_PROMPTS = [
  "A semi truck at a warehouse loading dock with cargo pallets, logistics industry photo, realistic lighting, American freight transportation, no logos",
  "Freight truck on US highway with trailer, dry van, commercial transport photography, realistic, no text or logos",
  "Reefer trailer at distribution center, cold chain logistics, professional photo, American freight, no branding",
  "Flatbed truck loaded with industrial cargo on highway, USA, realistic commercial photography, no logos",
  "Step deck trailer with machinery load, American freight, warehouse backdrop, realistic lighting, no text",
  "Truck stop with multiple semi trucks, American highway, golden hour, logistics, no company names",
  "Semi truck and trailer on interstate, long haul freight, USA, professional transport photo, no logos",
  "Loading dock with palletized cargo, warehouse, freight logistics, realistic, no branding",
  "Freightliner style truck at rest area, American highway, commercial photography, no logos",
  "Container yard with trucks, intermodal freight, USA, realistic, no text or logos",
];

const TRUCK_PROMPTS = [
  "A modern American semi truck parked at a truck stop, Freightliner style highway truck, realistic commercial transport photography, no logos",
  "Kenworth T680 style truck, cab and sleeper, parked at fuel island, USA, realistic, no branding",
  "Peterbilt 579 style tractor, red paint, American truck stop, professional photo, no logos",
  "Volvo VNL style truck, blue, highway rig, USA, realistic commercial photography, no text",
  "International LT style truck, white, parked at rest area, American freight, no company names",
  "Mack Anthem style truck, day cab, industrial setting, USA, realistic, no logos",
  "Modern semi truck, silver, at warehouse, American freight transportation, professional photo, no branding",
  "Class 8 truck, green, highway, USA, realistic transport photography, no logos",
  "Sleeper cab truck, black, truck stop, American commercial freight, no text",
  "White semi tractor, fleet style, distribution center, USA, realistic, no logos",
];

function freightPrompt(index) {
  const base = FREIGHT_PROMPTS[index % FREIGHT_PROMPTS.length];
  const variants = ["cloudy sky", "sunset lighting", "overcast", "clear day", "early morning"];
  const v = variants[Math.floor(index / FREIGHT_PROMPTS.length) % variants.length];
  return `${base}. ${v}.`;
}

function truckPrompt(index) {
  const base = TRUCK_PROMPTS[index % TRUCK_PROMPTS.length];
  const variants = ["cloudy", "sunset", "overcast", "noon", "morning light"];
  const v = variants[Math.floor(index / TRUCK_PROMPTS.length) % variants.length];
  return `${base}. ${v}.`;
}

async function generateOne(openai, prompt, outPath) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "url",
    quality: "standard",
  });
  const url = response.data?.[0]?.url;
  if (!url) throw new Error("No image URL");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY. Set in .env.local or environment.");
    process.exit(1);
  }

  const from = Math.max(1, parseInt(process.env.FROM ?? "1", 10));
  const toParam = process.env.TO;
  const toFreight = toParam ? Math.min(300, parseInt(toParam, 10)) : 300;
  const toTruck = toParam ? Math.min(120, parseInt(toParam, 10)) : 120;

  fs.mkdirSync(path.join(publicDir, "freight"), { recursive: true });
  fs.mkdirSync(path.join(publicDir, "trucks"), { recursive: true });

  const openai = new OpenAI({ apiKey });

  for (let i = from; i <= toFreight; i++) {
    const outPath = path.join(publicDir, "freight", `${i}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`Skip freight ${i} (exists)`);
      continue;
    }
    console.log(`Freight ${i}/${toFreight}...`);
    try {
      await generateOne(openai, freightPrompt(i), outPath);
    } catch (e) {
      console.error(`Freight ${i} failed:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  for (let i = from; i <= toTruck; i++) {
    const outPath = path.join(publicDir, "trucks", `${i}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`Skip truck ${i} (exists)`);
      continue;
    }
    console.log(`Truck ${i}/${toTruck}...`);
    try {
      await generateOne(openai, truckPrompt(i), outPath);
    } catch (e) {
      console.error(`Truck ${i} failed:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
