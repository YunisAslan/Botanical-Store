// "use server";

// import { db } from "@/firebase/config";
// import { Product } from "@/types";
// import { addDoc, collection } from "firebase/firestore";

// export const addProduct = async (formData: FormData) => {
//   const plant_name = formData.get("plant_name")?.toString();
//   const plant_price = formData.get("plant_price")?.toString();
//   const description = formData.get("description")?.toString();
//   const img_url = formData.get("img_url");

//   console.log("First log:  ", img_url);

//   if (!plant_name || !plant_price || !description || !img_url) return;

//   const newProduct: Product = {
//     plant_name,
//     plant_price,
//     description,
//   };

//   await addDoc(collection(db, "products"), newProduct);
// };
