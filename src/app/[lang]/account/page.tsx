import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccountClient } from "@/app/account/AccountClient";

export default async function AccountPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) redirect(`/${lang}/signin?callbackUrl=${encodeURIComponent(`/${lang}/account`)}`);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground">My account</h1>
      <AccountClient email={user.email} lang={lang} />
    </div>
  );
}
