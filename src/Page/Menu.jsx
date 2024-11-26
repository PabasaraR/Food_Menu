import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Menu = () => {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setLoad] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (email === "admin@gmail.com" && password === "Grand5#") {
      navigate("/upload");
      toast.success("Login successful!");
    } else {
      toast.error("Incorrect email or password.");
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
        setLoad(true);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-9">
      <header className="flex justify-center w-full p-4 mb-10 bg-black">
        <h1 className="text-4xl font-bold text-white">Menu</h1>
      </header>

      <div className="container flex flex-col items-center mx-auto h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg shadow-lg">
        {isLoad ? (
          imageList.map((image, index) => (
            <div key={index} className="p-4 h-[]">
              <div className="relative">
                <img
                  src={image.url}
                  alt={`Menu Item ${index}`}
                  className="object-cover w-full rounded-lg shadow-lg"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/path/to/placeholder.jpg")}
                />
              </div>
            </div>
          ))
        ) : (
          <div
            role="status"
            className="h-[100vh] flex justify-center items-center"
          >
            <svg
              aria-hidden="true"
              class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button
          className="px-6 py-2 text-xl text-white bg-black rounded-lg hover:bg-gray-700"
          onClick={handleClick}
        >
          Login
        </button>
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
