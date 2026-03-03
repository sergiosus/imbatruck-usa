import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AccountClient } from "@/app/account/AccountClient";

export default async function AccountPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/${lang}/signin?callbackUrl=/${encodeURIComponent(lang)}/account`);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground">My account</h1>
      <AccountClient email={session.user.email ?? ""} lang={lang} />
    </div>
  );
}
