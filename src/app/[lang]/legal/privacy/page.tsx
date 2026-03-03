import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of Imbatruck Company LLC.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-secondary">Last updated: March 2025</p>
      <div className="mt-8 space-y-6 text-foreground">
        <p>Imbatruck Company LLC operates the Imbatruck listing platform. This Privacy Policy explains how we collect, use, and safeguard your information.</p>
        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <p>We collect information you provide (e.g. when creating a listing or signing up): name, email, phone (optional), listing content. We also collect technical data such as IP address and usage data.</p>
        <h2 className="text-xl font-semibold">2. How We Use It</h2>
        <p>We use the information to operate the platform, display listings, and facilitate direct contact between users. We do not process payments. We do not sell your personal information.</p>
        <h2 className="text-xl font-semibold">3. Contact</h2>
        <p>Contact Imbatruck Company LLC at info@imbatruck.com or +1 512 593 38 58.</p>
      </div>
    </article>
  );
}
