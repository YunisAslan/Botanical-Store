import { Product } from "@/types";

export async function getProducts() {
  try {
    const res = await fetch(`${process.env.LOCAL_URL}/api/products`, {
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
    const res = await fetch(`${process.env.LOCAL_URL}/api/products/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) return undefined;

    const product: Product = await res.json();

    return product;
  } catch (err) {
    console.error(err);
  }
}

export async function getSearchProducts(query: string) {
  const searchResponse = await fetch(
    `${process.env.LOCAL_URL}/api/products/search?q=${query}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!searchResponse.ok) return undefined;

  const searchProducts: Product[] = await searchResponse.json();

  return searchProducts;
}

export async function getFilteredProducts(query: string) {
  const filterResponse = await fetch(
    `${process.env.LOCAL_URL}/api/products/search?sort_by=${query}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!filterResponse.ok) return undefined;

  const filteredProducts: Product[] = await filterResponse.json();

  return filteredProducts;
}

export async function getCategoryProducts(query: string) {
  const categoryResponse = await fetch(
    `${process.env.LOCAL_URL}/api/products/filter?category=${query}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!categoryResponse.ok) return undefined;

  const categoryProducts: Product[] = await categoryResponse.json();

  return categoryProducts;
}
