import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuDisplayPage from "./Page/Menu";
import ImageUploadPage from "./Page/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<ImageUploadPage />} />
        <Route path="/" element={<MenuDisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
