import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const plantCollectionRef = collection(db, "products");

  try {
    const data = getDocs(plantCollectionRef);

    const filteredData = (await data).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return NextResponse.json(filteredData);
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}
