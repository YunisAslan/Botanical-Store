import Image from "next/image";
import SeperatorImg from "@/public/assets/images/seperator-img.png";
import ProductCard from "./ProductCard";
import { getProducts, getProduct } from "@/lib/products";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

async function FeaturedProducts() {
  const productData = await getProducts();

  async function getDocumentById(id: string) {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  // Örnek çağrı
  const documentId = "UHxbcgvUk3OlE6WE6kw7";
  getDocumentById(documentId);

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
        {productData?.map((product) => (
          <div className="text-4xl text-red-600">{product.plant_category}</div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
