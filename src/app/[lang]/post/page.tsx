import { PostForm } from "@/app/post/PostForm";

/** Post listing page. Renders without server-side auth so it never crashes. Auth is checked client-side in PostForm. */
export default async function PostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <PostForm lang={lang} />;
}
