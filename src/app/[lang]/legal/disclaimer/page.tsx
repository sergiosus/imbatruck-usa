import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer and no-payments policy for Imbatruck Company LLC.",
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Disclaimer</h1>
      <p className="mt-2 text-secondary">Last updated: March 2025</p>
      <div className="prose prose-slate mt-8 max-w-none text-foreground">
        <p>Imbatruck Company LLC operates a listing platform. We do not process payments. All transactions occur directly between buyers and sellers. We are not a party to any transaction and do not guarantee the accuracy of listings or user conduct. Use at your own risk.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">User-Generated Content</h2>
        <p>Listings are created by users. We do not verify accuracy or legality. We are not responsible for user conduct or any loss arising from use of the platform or transactions with other users.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
        <p>Imbatruck Company LLC: info@imbatruck.com or +1 512 593 38 58.</p>
      </div>
    </article>
  );
}
