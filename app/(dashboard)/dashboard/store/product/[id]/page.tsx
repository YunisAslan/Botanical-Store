import EditProductForm from "@/components/EditProductForm";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

async function EditProduct({ params: { id } }: PageProps) {
  const product = await getProduct(id);
  // console.log(id);

  if (!product) notFound();

  return (
    <>
      <div className="pb-2">
        <h1 className="text-primary dark:text-white text-3xl font-bold pb-1">
          Update product
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Update your product information
        </p>
      </div>

      <EditProductForm item={product} id={id} />
    </>
  );
}

export default EditProduct;
