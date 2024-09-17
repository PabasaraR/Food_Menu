import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    setShowModal(true);
  };
  const handleModalSubmit = () => {
    if (email === "admin@gmail.com" && password === "1001") {
      navigate("/upload");
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 pb-9">
      <div className="">
        {" "}
        <header className="flex justify-center w-full p-4 mb-10 bg-black ">
          <h1 className="text-4xl font-bold text-white">Menu</h1>
        </header>
        <div className="container flex flex-col items-center mx-auto  max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg shadow-lg">
          {imageList.length ? (
            imageList.map((image, index) => (
              <div key={index} className="p-4">
                <img
                  src={image.url}
                  alt={`Menu Item ${index}`}
                  className="object-cover w-full rounded-lg shadow-lg"
                />
              </div>
            ))
          ) : (
            <p>No images to display.</p>
          )}
        </div>
        <div className="flex justify-center mt-10 ">
          <button
            className="px-6 py-2 text-xl text-white bg-black rounded-lg hover:bg-gray-700"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 pointer-events-auto">
          <div className="relative z-50 w-full max-w-sm p-6 bg-white rounded-lg shadow-lg pointer-events-auto">
            <h2 className="mb-4 text-2xl font-bold">Login</h2>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-700"
              >
                Login
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
