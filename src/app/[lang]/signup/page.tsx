import { SignUpForm } from "@/app/signup/SignUpForm";
import { Suspense } from "react";

export default async function SignUpPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-12 text-center text-secondary">Loading…</div>}>
      <SignUpForm lang={lang} />
    </Suspense>
  );
}
