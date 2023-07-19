"use client";

import { Product } from "@/types";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db, storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCurrentDateTime } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { productSchema } from "@/lib/validations/product";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof productSchema>;

function EditProductForm({ item, id }: { item: Product; id: string }) {
  const categories = ["cactus", "aloe", "rose", "orchids", "xerophytes"];

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    setValue("plant_name", item.plant_name);
    setValue("description", item.description);
    setValue("plant_price", item.plant_price);
    setValue("plant_category", item.plant_category);
  }, [item, setValue]);

  // const handleFileChange = (acceptedFiles: File[]) => {
  //   if (acceptedFiles && acceptedFiles.length > 0) {
  //     setImageUpload(acceptedFiles[0]);
  //   }
  // };
  const handleFileChange = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type && file.type.startsWith("image/")) {
        // If it's an image file, proceed with further processing
        setImageUpload(file);
      } else {
        // If it's not an image file, show an error or handle accordingly
        console.error("Invalid file type. Please select an image.");
      }
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

  const updateProductData: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
    const imgUrl = await uploadImage();

    if (!imgUrl) return toast.error("Update image or select same image");

    setIsSaving(true); // Disable the button

    const productWithImage = {
      ...data,
      img_url: imgUrl,
      created_at: getCurrentDateTime(),
    };

    const productRef = doc(db, "products", id);
    try {
      await toast.promise(updateDoc(productRef, productWithImage), {
        loading: "Updated...",
        success: <b>Product updated!</b>,
        error: <b>Could not be updated. Try again.</b>,
      });
    } catch (error) {
      toast.error("Could not be updated. Try again.");
    } finally {
      setIsSaving(false); // Re-enable the button
    }

    router.refresh();
  };

  return (
    <>
      <form
        className="pt-10 flex flex-col w-full max-w-2xl gap-5"
        onSubmit={handleSubmit(updateProductData)}
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="pb-2 font-semibold">
            Name
          </label>
          <input
            {...register("plant_name")}
            className="border p-2 rounded-md outline-none border-input placeholder:text-sm"
            type="text"
            id="name"
            name="plant_name"
            placeholder="Type product name here."
          />
          {errors.plant_name && (
            <span className="text-sm font-medium text-red-600 mt-1">
              {errors.plant_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="pb-2 font-semibold">
            Description
          </label>
          <textarea
            {...register("description")}
            className="border p-2 rounded-md outline-none border-input resize-none placeholder:text-sm"
            name="description"
            id="description"
            placeholder="Type product description here."
            cols={30}
            rows={4}
          ></textarea>
          {errors.description && (
            <span className="text-sm font-medium text-red-600 mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex w-full gap-5">
          <div className="flex flex-col w-1/2">
            <label htmlFor="price" className="pb-2 font-semibold">
              Price
            </label>
            <input
              {...register("plant_price", { valueAsNumber: true })}
              className="border p-2 rounded-md outline-none border-input placeholder:text-sm"
              type="number"
              id="price"
              name="plant_price"
              placeholder="Type product price here."
            />
            {errors.plant_price && (
              <span className="text-sm font-medium text-red-600 mt-1">
                Must be a valid price
              </span>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="category" className="pb-2 font-semibold">
              Category
            </label>
            <select
              {...register("plant_category")}
              className="border p-2 rounded-md outline-none border-input capitalize"
              id="category"
              name="plant_category"
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
