import { db } from "@/firebase/config";
import { Product } from "@/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

enum SortingCondition {
  Ascending = "az",
  Descending = "za",
  Oldest = "on",
  Newest = "no",
  LowestPrice = "lh",
  HighestPrice = "hl",
}

export async function GET(request: Request) {
  const plantCollectionRef = collection(db, "products");
  const { searchParams } = new URL(request.url);

  const searchTerm = searchParams.get("q");
  const sortBy = searchParams.get("sort_by");
  //  /products?sort_by=

  if (!searchTerm) {
    new Response("Missing search Term", { status: 400 });
  }

  const lowerCaseSearchTerm = searchTerm?.toLowerCase();

  // Queries

  let sortQuery;
  switch (sortBy) {
    case SortingCondition.Ascending:
      sortQuery = query(plantCollectionRef, orderBy("plant_name", "asc"));
      break;
    case SortingCondition.Descending:
      sortQuery = query(plantCollectionRef, orderBy("plant_name", "desc"));
      break;
    case SortingCondition.Oldest:
      sortQuery = query(plantCollectionRef, orderBy("created_at", "asc"));
      break;
    case SortingCondition.Newest:
      sortQuery = query(plantCollectionRef, orderBy("created_at", "desc"));
      break;
    case SortingCondition.LowestPrice:
      sortQuery = query(plantCollectionRef, orderBy("plant_price", "asc"));
      break;
    case SortingCondition.HighestPrice:
      sortQuery = query(plantCollectionRef, orderBy("plant_price", "desc"));
      break;
    default:
      sortQuery = query(plantCollectionRef); // Default query
      break;
  }

  try {
    const defaultData = (await getDocs(sortQuery)).docs.map((doc) => ({
      ...(doc.data() as Product),
      id: doc.id,
    }));

    let searchDatas = defaultData;

    if (searchTerm) {
      const searchQuery = query(
        plantCollectionRef,
        where("plant_name", ">=", lowerCaseSearchTerm),
        where("plant_name", "<=", lowerCaseSearchTerm + "\uf8ff")
      );

      searchDatas = (await getDocs(searchQuery)).docs.map((doc) => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));
    }

    return NextResponse.json(searchDatas);
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}
