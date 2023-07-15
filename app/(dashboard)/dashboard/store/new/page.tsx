"use client";

import toast from "react-hot-toast";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { db, storage } from "@/firebase/config";
import { getCurrentDateTime } from "@/lib/utils";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useRouter } from "next/navigation";

function NewProduct() {
  const categories = ["cactus", "aloe", "rose", "orchids", "xerophytes"];

  const initData = {
    plant_name: "",
    description: "",
    plant_category: categories[0],
    plant_price: 0,
    img_url: "",
  };

  const router = useRouter();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [productData, setProductData] = useState(initData);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImageUpload(acceptedFiles[0]);
    }
  };

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

  const handleChangeInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const parsedValue = name === "plant_price" ? parseFloat(value) : value;
    setProductData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const addProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imgUrl = await uploadImage();

    if (!imgUrl) return alert("SHEKILE EHTIYACIN VAR DOSi");

    setIsSaving(true); // Disable the button

    const productWithImage = {
      ...productData,
      img_url: imgUrl,
      created_at: getCurrentDateTime(),
    };

    try {
      await toast.promise(
        addDoc(collection(db, "products"), productWithImage),
        {
          loading: "Added...",
          success: <b>Product added!</b>,
          error: <b>Could not be added.</b>,
        }
      );
    } catch (error) {
      toast.error("Could not be added.");
    } finally {
      setIsSaving(false); // Re-enable the button
    }

    // Resets
    setProductData(initData);
    acceptedFiles.length = 0;
    setImageUpload(null);

    // we need fresh data :D
    router.refresh();
  };

  console.log(productData);

  return (
    <>
      <div className="pb-2">
        <h1 className="text-primary text-3xl font-bold pb-1">Add product</h1>
        <p className="text-base text-gray-600">Add a new product to store</p>
      </div>

      <form
        className="pt-10 flex flex-col w-full max-w-2xl gap-5"
        onSubmit={addProduct}
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
            value={productData.plant_name.toLowerCase()}
            onChange={handleChangeInputs}
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
            onChange={handleChangeInputs}
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
              onChange={handleChangeInputs}
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
              onChange={handleChangeInputs}
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
                    <Icons.image className="text-gray-400 w-8 h-8" />
                    <p className="text-center text-gray-500 pt-2">
                      Drag 'n' drop an image here{" "}
                      <span className="text-center text-gray-800">or</span>{" "}
                      click in this area
                    </p>
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
            Add Product
          </Button>
        </div>
      </form>
    </>
  );
}

export default NewProduct;
