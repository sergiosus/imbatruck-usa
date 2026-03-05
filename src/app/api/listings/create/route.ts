import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/** POST /api/listings/create — create a listing. Requires auth. No Prisma on page load; only runs on form submit. */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You must sign in to post a listing." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const price = typeof body.price === "number" ? body.price : Number(body.price) || 0;
    const location = body.location && typeof body.location === "object" ? body.location : {};
    const state = typeof location.state === "string" ? location.state.trim() : "";
    const city = typeof location.city === "string" ? location.city.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : session.user.email;
    const phone = typeof body.phone === "string" ? body.phone.trim() || undefined : undefined;
    const images = Array.isArray(body.images) ? body.images.filter((u: unknown) => typeof u === "string") : [];

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required." },
        { status: 400 }
      );
    }

    // Persist when Listing model exists; for now acknowledge success (no DB table yet)
    return NextResponse.json(
      { success: true, message: "Listing submitted." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not create listing." },
      { status: 500 }
    );
  }
}
