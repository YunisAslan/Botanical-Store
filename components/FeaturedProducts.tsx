"use client";

import Image from "next/image";
import SeperatorImg from "@/public/assets/images/seperator-img.png";
import ProductCard from "./ProductCard";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "@/types";
import { useEffect, useState } from "react";

function FeaturedProducts() {
  const plantCollectionRef = collection(db, "products");
  const [productList, setProductList] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const data = await getDocs(plantCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));

      setProductList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div>
        {productList.map((product) => (
          <div className="text-5xl" key={product.id}>
            {product.plant_name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
