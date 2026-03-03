import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safety Tips & Scam Prevention",
  description: "Safety tips and scam prevention for users of the Imbatruck marketplace.",
};

export default async function SafetyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Safety Tips & Scam Prevention</h1>
      <p className="mt-2 text-secondary">Stay safe when buying and selling on Imbatruck Company LLC.</p>
      <div className="prose prose-slate mt-8 max-w-none text-foreground">
        <p>Imbatruck Company LLC operates a listing platform. We do not process payments—all transactions are between you and the other user. Follow these tips to protect yourself.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">No platform payments</h2>
        <p>Imbatruck never asks you to pay through our site. Any payment happens directly between you and the seller or buyer.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Direct contact</h2>
        <p>Use the contact information in the listing. Meet in person when possible and inspect the item before paying. Never share verification codes or passwords with strangers.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Avoid wire transfers & advance payment</h2>
        <p>Scammers often ask for wire transfers, gift cards, or cryptocurrency. Prefer cash in person or a secure method you understand.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Meet in a safe, public place</h2>
        <p>Choose a well-lit, public location. For vehicles or large equipment, verify the item (e.g. VIN, serial number) and ownership before paying.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Report listing</h2>
        <p>Use the &quot;Report listing&quot; option on the listing page if you see a suspicious listing.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Disclaimer</h2>
        <p>Imbatruck Company LLC is a listing platform. We do not guarantee the accuracy of listings or the conduct of users. See our <Link href={`/${lang}/legal/disclaimer`} className="text-primary hover:underline">Disclaimer</Link> and <Link href={`/${lang}/legal/terms`} className="text-primary hover:underline">Terms of Use</Link>.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
        <p>Questions? Contact Imbatruck Company LLC at info@imbatruck.com or +1 512 593 38 58.</p>
      </div>
    </article>
  );
}
