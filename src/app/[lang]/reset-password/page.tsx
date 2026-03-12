import { ResetPasswordForm } from "@/app/reset-password/ResetPasswordForm";
import { Suspense } from "react";

export default async function ResetPasswordPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-12 text-center text-secondary">Loading…</div>}>
      <ResetPasswordForm lang={lang} />
    </Suspense>
  );
}
