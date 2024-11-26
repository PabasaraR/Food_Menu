import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuDisplayPage from "./Page/Menu";
import ImageUploadPage from "./Page/Admin";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/upload" element={<ImageUploadPage />} />
        <Route path="/" element={<MenuDisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
