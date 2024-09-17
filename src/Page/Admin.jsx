import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, firestore } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const ImageUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "images"));
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImageList(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    setLoading(true);

    try {
      const uploadPromises = files.map(async ({ file }) => {
        const fileRef = ref(storage, `images/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return { url, name: file.name };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      const docPromises = uploadedFiles.map(({ url, name }) => {
        return addDoc(collection(firestore, "images"), { url, name });
      });

      await Promise.all(docPromises);

      setFiles([]);
      setImageList([...imageList, ...uploadedFiles]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, url) => {
    setDeleted(true);
    try {
      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
      await deleteDoc(doc(firestore, "images", id));
      setImageList(imageList.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setDeleted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-center p-4 mb-10 bg-black">
        <h1 className="text-4xl font-bold text-white">Upload Images</h1>
      </header>

      <div className="flex items-center justify-center mb-10">
        <div className="w-full max-w-md p-8 text-white bg-gray-800 rounded-lg">
          <h2 className="mb-4 text-2xl font-semibold">Select Image</h2>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 mb-4 border rounded-lg"
          />

          <div className="flex flex-wrap justify-center mb-4">
            {files.map((fileObj, index) => (
              <div key={index} className="m-2">
                <img
                  src={fileObj.preview}
                  alt={`Selected ${index}`}
                  className="object-cover rounded-lg shadow-lg h-96 "
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-700"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mx-auto ">
        <Carousel responsive={responsive} className="w-full max-w-screen-lg">
          {imageList.map((image) => (
            <div key={image.id} className="p-4">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <img
                  src={image.url}
                  alt={image.name}
                  className="object-cover w-full rounded-lg h-[450px] p-"
                />
                <button
                  onClick={() => handleDelete(image.id, image.url)}
                  className="flex justify-center w-full py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  {deleted ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageUploadPage;
