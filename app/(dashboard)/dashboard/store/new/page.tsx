"use client";

import { db, storage } from "@/firebase/config";
import { getCurrentDateTime } from "@/lib/utils";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

function NewProduct() {
  const initData = {
    plant_name: "",
    description: "",
    category: "",
    plant_price: 0,
    img_url: "",
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [productData, setProductData] = useState(initData);

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     setImageUpload(files[0]);
  //   }
  // };

  const uploadImage = async () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `products/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);

    const imgUrl = await getDownloadURL(imageRef);

    return imgUrl;
  };

  // add document

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "plant_price" ? parseFloat(value) : value.toLowerCase();

    setProductData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const addProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imgUrl = await uploadImage();

    if (!imgUrl) return;

    const productWithImage = {
      ...productData,
      img_url: imgUrl,
      created_at: getCurrentDateTime(),
    };

    await addDoc(collection(db, "products"), productWithImage);

    // Notifications and resets
    setProductData(initData);
    setImageUpload(null);

    alert("Product added successfully!");
  };

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
            placeholder="Plant name"
            value={productData.plant_name}
            onChange={handleChangeInputs}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="pb-2 font-semibold">
            Description
          </label>
          <input
            className="border p-2 rounded-md outline-none border-input"
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChangeInputs}
          />
        </div>

        <div className="flex w-full gap-5">
          <div className="flex flex-col w-1/2">
            <label htmlFor="price" className="pb-2 font-semibold">
              Price
            </label>
            <input
              className="border p-2 rounded-md outline-none border-input"
              type="text"
              id="price"
              name="plant_price"
              placeholder="Plant price"
              value={productData.plant_price}
              onChange={handleChangeInputs}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="category" className="pb-2 font-semibold">
              Category
            </label>
            <input
              className="border p-2 rounded-md outline-none border-input"
              type="text"
              id="category"
              name="category"
              placeholder="Category"
              value={productData.category}
              onChange={handleChangeInputs}
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className="border-4 border-dashed border-gray-300 rounded-lg p-4"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-gray-500">Drop the image here...</p>
          ) : (
            <>
              <div className="flex flex-col items-center">
                {acceptedFiles.length > 0 && !isDragActive ? (
                  <>
                    <img
                      src={URL.createObjectURL(acceptedFiles[0])}
                      alt="Preview"
                      className="mb-2 rounded-md max-w-full h-auto"
                    />
                    <p className="text-center text-gray-500 mb-1">
                      {acceptedFiles[0].name}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-center text-gray-500">
                      Drag 'n' drop an image here
                    </p>
                    <p className="text-center text-gray-500">or</p>
                    <button className="mt-2 bg-primary text-white px-4 py-2 rounded-md">
                      Select Image
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* <div>
          <label htmlFor="">Drag image</label>
          <input
            name="img_url"
            placeholder="Upload image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div> */}

        <div className="flex justify-start">
          <button className="bg-green-600 px-2 py-1 text-white" type="submit">
            Add product
          </button>
        </div>
      </form>
    </>
  );
}

export default NewProduct;
