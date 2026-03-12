"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useSupabaseSession(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setUser(null);
      setLoading(false);
      return;
    }
    const getInitial = async () => {
      try {
        const { data: { user: u } } = await supabase.auth.getUser();
        setUser(u ?? null);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    getInitial();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
