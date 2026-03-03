import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Notice",
  description: "DMCA takedown policy for Imbatruck Company LLC.",
};

export default function DMCAPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">DMCA Notice & Copyright</h1>
      <p className="mt-2 text-secondary">Last updated: March 2025</p>
      <div className="prose prose-slate mt-8 max-w-none text-foreground">
        <p>Imbatruck Company LLC respects intellectual property rights and responds to notices of alleged copyright infringement under the DMCA.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Filing a Takedown Request</h2>
        <p>Your notice must include: your signature; identification of the copyrighted work; identification of the infringing material (e.g. URL); your contact information; a good-faith statement; and a statement under penalty of perjury that you are authorized to act. Send to info@imbatruck.com with subject &quot;DMCA Takedown Request&quot;.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Counter-Notification</h2>
        <p>If your content was removed in error, you may send a counter-notification to info@imbatruck.com with subject &quot;DMCA Counter-Notification&quot; including the required elements under the DMCA.</p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
        <p>Imbatruck Company LLC: info@imbatruck.com or +1 512 593 38 58.</p>
      </div>
    </article>
  );
}
