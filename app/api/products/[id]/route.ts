import { db } from "@/firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET({ params: { id } }: Props) {
  const plantDocRef = doc(db, "products", id); // Assuming "products" is the collection name

  try {
    const docSnap = await getDoc(plantDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return NextResponse.json({ id: docSnap.id, ...data });
    } else {
      return new NextResponse(null, { status: 404 }); // Document not found
    }
  } catch (err) {
    console.error(err);
    return new NextResponse(null, { status: 500 });
  }
}
