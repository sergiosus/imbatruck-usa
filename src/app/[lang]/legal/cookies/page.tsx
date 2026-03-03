import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy of Imbatruck Company LLC. How we use cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Cookie Policy</h1>
      <p className="mt-2 text-secondary">Last updated: March 2025</p>
      <div className="prose prose-slate mt-8 max-w-none text-foreground">
        <p>Imbatruck Company LLC uses cookies and similar technologies. This policy explains what we use and how you can control them.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device. They help the site remember preferences, keep you signed in, and understand how the site is used.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Cookies We Use</h2>
        <p><strong>Strictly necessary:</strong> Required for the site to function (e.g. cookie consent, security). <strong>Functional:</strong> Remember preferences (e.g. saved listings). You can accept or reject via our cookie banner. <strong>Analytics:</strong> Basic usage data to improve the platform; aggregated and not used to identify you personally.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Your Consent & Managing Cookies</h2>
        <p>When you first visit, we show a cookie banner. Your choice is stored so we do not show it again unless you clear storage. You can block or delete cookies in your browser settings; some features may not work if you do.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
        <p>Contact Imbatruck Company LLC at info@imbatruck.com or +1 512 593 38 58.</p>
      </div>
    </article>
  );
}
