import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Imbatruck Company LLC. Email and phone for support and inquiries.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
      <p className="mt-2 text-secondary">Imbatruck Company LLC</p>
      <div className="mt-8 space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">General inquiries</h2>
          <p className="mt-2">
            Email: <a href="mailto:info@imbatruck.com" className="text-primary hover:underline">info@imbatruck.com</a><br />
            Phone: <a href="tel:+15125933858" className="text-primary hover:underline">+1 512 593 38 58</a>
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">What we can help with</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1 text-secondary">
            <li>Questions about using the Imbatruck platform</li>
            <li>Reporting a listing or user</li>
            <li>Privacy or data requests</li>
            <li>DMCA or copyright notices (send to info@imbatruck.com with subject &quot;DMCA Takedown Request&quot;)</li>
            <li>Terms, disclaimer, or legal questions</li>
          </ul>
        </section>
        <section>
          <p className="text-secondary">
            Imbatruck Company LLC is a listing platform. We do not process payments. Transactions happen directly between users.
          </p>
        </section>
      </div>
    </article>
  );
}
