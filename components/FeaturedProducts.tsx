// "use client";

// import Image from "next/image";
// import SeperatorImg from "@/public/assets/images/seperator-img.png";
// import ProductCard from "./ProductCard";
// import { getProducts } from "@/lib/products";
// import { useEffect, useState } from "react";
// import { Product } from "@/types";

// function FeaturedProducts() {
//   const [featuredProducts, setFeaturedProducts] = useState<
//     Product[] | undefined
//   >([]);

//   const getProductData = async () => {
//     const productData = await getProducts();

//     setFeaturedProducts(productData);
//   };

//   useEffect(() => {
//     getProductData();
//   }, []);

//   return (
//     <section className="pb-10">
//       <h2 className="capitalize text-primary text-3xl font-semibold text-center pb-4">
//         Featured products
//       </h2>

//       <div className="flex justify-center">
//         <Image
//           src={SeperatorImg}
//           alt="Botanical Store Seperator"
//           width={370}
//           height={30}
//         />
//       </div>

//       <div className="grid grid-cols-4 gap-6 pt-10">
//         {featuredProducts?.map((item) => {
//           return <ProductCard key={item.id} {...item} />;
//         })}
//       </div>
//     </section>
//   );
// }

// export default FeaturedProducts;
