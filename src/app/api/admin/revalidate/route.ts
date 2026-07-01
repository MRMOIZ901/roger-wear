import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("rw_admin")?.value !== "yes") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/shop");
  revalidatePath("/men");
  revalidatePath("/new-drops");
  revalidatePath("/products/[slug]", "page");

  return NextResponse.json({ ok: true });
}
