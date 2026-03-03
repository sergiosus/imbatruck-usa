import { NextResponse } from "next/server";
import OpenAI from "openai";

const cache = new Map<string, string>();

function cacheKey(type: string, category?: string): string {
  return category ? `${type}:${category}` : type;
}

function buildPrompt(type: "hero" | "listing" | "category", category?: string): string {
  const base = "Realistic American truck marketplace photography. No brand logos. No text overlays. Clean lighting. Commercial grade photography.";
  switch (type) {
    case "hero":
      return `${base} Wide hero shot of trucks and freight in a US industrial or logistics setting. 16:9 composition.`;
    case "listing":
      return category
        ? `${base} Single truck or commercial vehicle for sale, ${category}. 4:3 composition.`
        : `${base} Single truck or commercial vehicle for sale. 4:3 composition.`;
    case "category":
      return category
        ? `${base} Overview of ${category} vehicles in a lot or yard. 4:3 composition.`
        : `${base} Variety of commercial trucks in a US marketplace. 4:3 composition.`;
    default:
      return base;
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Image generation not configured" }, { status: 503 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const type = body?.type === "hero" || body?.type === "listing" || body?.type === "category" ? body.type : "listing";
    const category = typeof body?.category === "string" ? body.category.trim() || undefined : undefined;
    const key = cacheKey(type, category);
    const cached = cache.get(key);
    if (cached) {
      return NextResponse.json({ url: cached });
    }
    const openai = new OpenAI({ apiKey });
    const size = type === "hero" ? "1792x1024" : "1024x1024";
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: buildPrompt(type, category),
      n: 1,
      size: size as "1792x1024" | "1024x1024",
      response_format: "url",
      quality: "standard",
    });
    const url = response.data?.[0]?.url;
    if (!url) {
      return NextResponse.json({ error: "No image URL returned" }, { status: 502 });
    }
    cache.set(key, url);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Image generate error:", e);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
