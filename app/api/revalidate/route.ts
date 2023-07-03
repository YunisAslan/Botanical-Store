import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path =
    request.nextUrl.searchParams.get("http://localhost:3000/api/products") ||
    "/";

  revalidatePath(path);

  return NextResponse.json({ revalidated: true });
}
