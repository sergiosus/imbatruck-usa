"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    if (typeof console !== "undefined") {
      console.error(
        "[Imbatruck] Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Set them in your environment (e.g. Vercel project settings)."
      );
    }
    return null;
  }
  return createBrowserClient(url, key);
}
