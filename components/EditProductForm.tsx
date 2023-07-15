"use client";

import { Product } from "@/types";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { db, storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCurrentDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function EditProductForm({ item, id }: { item: Product; id: string }) {
  if (!id || !item) {
    return null; // or show a loading spinner or handle the case when item is null
  }

  const categories = ["cactus", "aloe", "rose", "orchids", "xerophytes"];

  const initData = {
    plant_name: item.plant_name,
    description: item.description,
    plant_price: item.plant_price || 0,
    plant_category: item.plant_category,
    img_url: item.img_url,
  };

  const router = useRouter();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  console.log(imageUpload);

  const [productData, setProductData] = useState(initData);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImageUpload(acceptedFiles[0]);
    }
  };

  // dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: handleFileChange,
      multiple: false,
      // @ts-ignore
      accept: "image/*",
    });

  const uploadImage = async () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `products/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);

    const imgUrl = await getDownloadURL(imageRef);

    return imgUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const imgUrl = await uploadImage();

    if (!imgUrl) return alert("You need update image or select same image");

    setIsSaving(true); // Disable the button

    const productWithImage = {
      ...productData,
      img_url: imgUrl,
      created_at: getCurrentDateTime(),
    };

    const productRef = doc(db, "products", id);
    try {
      await toast.promise(updateDoc(productRef, productWithImage), {
        loading: "Updated...",
        success: <b>Product updated!</b>,
        error: <b>Could not be updated.</b>,
      });
    } catch (error) {
      toast.error("Could not be updated.");
    } finally {
      setIsSaving(false); // Re-enable the button
    }

    router.refresh();
  };

  return (
    <>
      <form
        className="pt-10 flex flex-col w-full max-w-2xl gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="pb-2 font-semibold">
            Name
          </label>
          <input
            className="border p-2 rounded-md outline-none border-input"
            type="text"
            id="name"
            name="plant_name"
            placeholder="Type product name here."
            value={productData.plant_name}
            onChange={(e) =>
              setProductData({
                ...productData,
                plant_name: e.target.value.toLowerCase(),
              })
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="pb-2 font-semibold">
            Description
          </label>
          <textarea
            className="border p-2 rounded-md outline-none border-input resize-none"
            name="description"
            id="description"
            placeholder="Type product description here."
            cols={30}
            rows={4}
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="flex w-full gap-5">
          <div className="flex flex-col w-1/2">
            <label htmlFor="price" className="pb-2 font-semibold">
              Price
            </label>
            <input
              className="border p-2 rounded-md outline-none border-input"
              type="number"
              id="price"
              name="plant_price"
              placeholder="Type product price here."
              value={productData.plant_price}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  plant_price: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="category" className="pb-2 font-semibold">
              Category
            </label>
            <select
              className="border p-2 rounded-md outline-none border-input capitalize"
              id="category"
              name="plant_category"
              value={productData.plant_category}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  plant_category: e.target.value,
                })
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-72 flex flex-col justify-center items-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-gray-500">Drop the image here...</p>
          ) : (
            <>
              <div className="flex flex-col items-center">
                {acceptedFiles.length > 0 && !isDragActive ? (
                  <>
                    <Image
                      src={URL.createObjectURL(acceptedFiles[0])}
                      alt="Preview"
                      className="mb-2 rounded-md"
                      width={200}
                      height={200}
                    />
                    <p className="text-center text-gray-500 mb-1">
                      {acceptedFiles[0].name}
                    </p>
                  </>
                ) : (
                  <>
                    {item.img_url ? (
                      <>
                        <Image
                          src={item.img_url}
                          alt="Preview"
                          className="mb-2 rounded-md"
                          width={200}
                          height={200}
                        />
                      </>
                    ) : (
                      <>
                        <Icons.image className="text-gray-400 w-8 h-8" />
                        <p className="text-center text-gray-500 pt-2">
                          Drag 'n' drop an image here{" "}
                          <span className="text-center text-gray-800">or</span>{" "}
                          click in this area
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-start">
          <Button
            className="disabled:opacity-50 disabled:cursor-default"
            type="submit"
            variant="primary"
            size="sm"
            disabled={isSaving}
          >
            Update Product
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditProductForm;
