import { SignInForm } from "@/app/signin/SignInForm";
import { Suspense } from "react";
import { ListingCardSkeleton } from "@/components/ListingCardSkeleton";

export default async function SignInPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-12 text-center text-secondary">Loading…</div>}>
      <SignInForm lang={lang} />
    </Suspense>
  );
}
