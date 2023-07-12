async function DashboardStore() {
  return (
    <>
      <div className="py-6 px-10 w-full">
        <div>
          <h1 className="text-primary text-3xl font-bold pb-1">Products</h1>
          <p className="text-base text-gray-600">Manage your products</p>
        </div>
      </div>
    </>
  );
}

export default DashboardStore;

// "use client";

// /////////// TEMPORARY ////////////

// import { ChangeEvent, useState, useEffect } from "react";
// import { storage } from "@/firebase/config";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

// function Dashboard() {
//   const [imageUpload, setImageUpload] = useState<File | null>(null);
//   const [imageList, setImageList] = useState<string[]>([]);

//   const uploadImage = () => {
//     if (imageUpload === null) return;

//     const imageRef = ref(storage, `products/${imageUpload.name}`);

//     uploadBytes(imageRef, imageUpload).then((res) => {
//       alert("Image uploaded");
//     });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setImageUpload(files[0]);
//     }
//   };

//   useEffect(() => {
//     listAll(ref(storage, "products")).then((res) => {
//       res.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           console.log("URL", url);

//           setImageList((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />

//       <button onClick={uploadImage}>upload image</button>

//       {imageList.map((url) => {
//         return <img src={url} alt="" key={url} />;
//       })}
//     </div>
//   );
// }

// export default Dashboard;
