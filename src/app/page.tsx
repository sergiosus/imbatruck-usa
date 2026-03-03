import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/locales";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
