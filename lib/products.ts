import { Product } from "@/types";

export async function getProducts() {
  try {
    const res = await fetch(`${process.env.API_URL_PRODUCTS}`, {
      next: { revalidate: 0 },
    });
    const products: Product[] = await res.json();

    return products;
  } catch (err) {
    console.error(err);
  }
}

export async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL_PRODUCTS}/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) return undefined;

    const product: Product = await res.json();

    return product;
  } catch (err) {
    console.error(err);
  }
}
