import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PostForm } from "@/app/post/PostForm";

export default async function PostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/${lang}/signin?callbackUrl=/${encodeURIComponent(lang)}/post`);
  return <PostForm lang={lang} />;
}
