"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getT } from "@/lib/translations";

export function AccountClient({ email, lang }: { email: string; lang: string }) {
  const t = getT(lang);
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push(`/${lang}`);
    router.refresh();
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-secondary">{t.auth.signedInAs}</p>
      <p className="mt-1 font-medium text-foreground">{email}</p>
      <button
        type="button"
        onClick={handleSignOut}
        className="mt-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {t.auth.logOut}
      </button>
    </div>
  );
}
