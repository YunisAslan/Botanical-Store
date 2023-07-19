import { db } from "@/firebase/config";
import { Product } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: Request) {
  const productsRef = collection(db, "products");
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");

  if (!category) {
    new Response("Missing category", { status: 400 });
  }

  const queryRef = query(productsRef, where("plant_category", "==", category));

  try {
    const productCategories = (await getDocs(queryRef)).docs.map((doc) => ({
      ...(doc.data() as Product),
      id: doc.id,
    }));

    return NextResponse.json(productCategories);
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}
