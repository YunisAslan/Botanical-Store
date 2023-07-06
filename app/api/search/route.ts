import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchTerm, ...params } = await request.json();

  const searchParams: string = params;

  if (!searchTerm) {
    return NextResponse.next(
      new Response("Missing search Term", { status: 400 })
    );
  }

  const filters: any = [];

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      filters.push({
        key,
        value,
      });
    }
  });
}
