import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for the Imbatruck platform operated by Imbatruck Company LLC.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
      <p className="mt-2 text-secondary">Last updated: March 2025</p>
      <div className="prose prose-slate mt-8 max-w-none text-foreground">
        <p>Welcome to Imbatruck. These Terms govern your access to and use of the website and services operated by Imbatruck Company LLC. By using our platform, you agree to these Terms.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">1. Nature of Service</h2>
        <p>Imbatruck is a listing platform. We do not process payments. All transactions occur directly between users. We are not a party to any transaction and do not guarantee the accuracy of listings or the conduct of users. Use at your own risk.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">2. User Responsibilities</h2>
        <p>You agree to provide accurate information and use the platform only for lawful purposes. You may not post false or fraudulent listings; harass users; violate laws; or infringe intellectual property. You are solely responsible for your listings and communications.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">3. Prohibited Items & Moderation</h2>
        <p>You may not list illegal, stolen, or hazardous items. We reserve the right to remove content and suspend or terminate accounts without prior notice.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">4. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Imbatruck Company LLC shall not be liable for any indirect, incidental, special, or consequential damages. We provide the platform &quot;as is&quot; without warranties of any kind.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">5. Contact</h2>
        <p>Contact Imbatruck Company LLC at info@imbatruck.com or +1 512 593 38 58.</p>
      </div>
    </article>
  );
}
