import { db } from "@/firebase/config";
import { Product } from "@/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: Request) {
  const plantCollectionRef = collection(db, "products");

  const { searchParams } = new URL(request.url);

  const searchTerm = searchParams.get("q") || "";

  if (!searchTerm) {
    return NextResponse.next(
      new Response("Missing search Term", { status: 400 })
    );
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  try {
    const maQuery = query(
      plantCollectionRef,
      where("plant_name", ">=", lowerCaseSearchTerm),
      where("plant_name", "<=", lowerCaseSearchTerm + "\uf8ff")
    );
    const data = await getDocs(maQuery);

    const filteredData = data.docs.map((doc) => ({
      ...(doc.data() as Product),
      id: doc.id,
    }));

    return NextResponse.json(filteredData);
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   // const { searchTerm, ...params } = await request.json();

//   // const searchParams: string = params;

//   // if (!searchTerm) {
//   //   return NextResponse.next(
//   //     new Response("Missing search Term", { status: 400 })
//   //   );
//   // }

//   // const filters: any = [];

//   // Object.entries(searchParams).forEach(([key, value]) => {
//   //   if (value) {
//   //     filters.push({
//   //       key,
//   //       value,
//   //     });
//   //   }
//   // });

//   return NextResponse.json("Usrrr");
// }
