export async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
