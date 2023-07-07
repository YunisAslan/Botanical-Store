"use client";

// import { redirect } from "next/navigation";

// type Props = {
//   searchParams: string;
//   params: {
//     term: string;
//   };
// };

// function SearchResult({ searchParams, params: { term } }: Props) {
//   // if (!term) {
//   //   redirect("/");
//   // }

//   return (
//     <div className="h-screen flex justify-center items-centerc bg-black text-white p-10 text-6xl">
//       Axtarış nəticələri səhifəsinə xoş gəldiniz
//     </div>
//   );
// }

// export default SearchResult;

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import Products from "../../products/page";

type Props = {
  searchParams: string;
  params: {
    term: string;
  };
};

function SearchResult({ searchParams, params: { term } }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plantCollectionRef = collection(db, "products");
        const q = query(
          plantCollectionRef,
          where("plant_category", "==", term)
        );
        console.log(q);

        const data = await getDocs(q);

        const filteredData = data.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }));

        setProducts(filteredData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (term) {
      fetchData();
    }
  }, [term]);

  console.log(products);

  if (!term) {
    // Burada bir yönlendirme yapabilirsiniz
    // redirect("/");
    return null;
  }

  return (
    // <div>
    //   <h1>Arama Sonuçları: {term}</h1>
    //   <ul>
    "" /* {products.map((product) => (
          <li key={product.id} className="text-5xl p-10 bg-primary text-white">
            {product.plant_name}
          </li>
        ))} */
    //   </ul>
    // </div>
  );
}

export default SearchResult;
