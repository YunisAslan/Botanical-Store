"use client";

import Image from "next/image";
import SeperatorImg from "@/public/assets/images/seperator-img.png";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Product } from "@/types";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<
    Product[] | undefined
  >([]);

  const getProductData = async () => {
    const plantCollectionRef = collection(db, "products");

    try {
      const data = getDocs(plantCollectionRef);

      const filteredData = (await data).docs.map((doc) => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));

      setFeaturedProducts(filteredData);
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <section className="pb-10">
      <h2 className="capitalize text-primary text-3xl font-semibold text-center pb-4">
        Featured products
      </h2>

      <div className="flex justify-center">
        <Image
          src={SeperatorImg}
          alt="Botanical Store Seperator"
          width={370}
          height={30}
        />
      </div>

      <div className="grid grid-cols-4 gap-6 pt-10">
        {featuredProducts?.map((item) => {
          return <ProductCard key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default FeaturedProducts;
