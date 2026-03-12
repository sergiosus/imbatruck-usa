import { ForgotPasswordForm } from "@/app/forgot-password/ForgotPasswordForm";
import { Suspense } from "react";

export default async function ForgotPasswordPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-12 text-center text-secondary">Loading…</div>}>
      <ForgotPasswordForm lang={lang} />
    </Suspense>
  );
}
