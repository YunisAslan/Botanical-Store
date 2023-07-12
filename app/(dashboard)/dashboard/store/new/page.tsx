import { db } from "@/firebase/config";
import { Product } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import { revalidateTag } from "next/cache";

async function NewProduct() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
    next: {
      tags: ["products"],
    },
  });

  const products: Product[] = await res.json();

  const addProduct = async (e: FormData) => {
    "use server";
    const plant_name = e.get("plant_name")?.toString();
    const plant_price = e.get("plant_price")?.toString();

    if (!plant_name || !plant_price) return;

    const newProduct: Product = {
      plant_name,
      plant_price,
    };

    await addDoc(collection(db, "products"), newProduct);

    revalidateTag("products");
  };

  return (
    <>
      <form action={addProduct} className="pt-10">
        <input
          type="text"
          name="plant_name"
          placeholder="Plant name"
          className="border border-gray-400 p-2 rounded-md"
        />
        <input
          type="text"
          name="plant_price"
          placeholder="Plant price"
          className="border border-gray-400 p-2 rounded-md"
        />

        <button className="bg-green-600 px-2 py-1 text-white">
          Add product
        </button>
      </form>

      <div>
        {products.map((item) => (
          <div>
            <h2>{item.plant_name}</h2>
            <p>{item.plant_price}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewProduct;
