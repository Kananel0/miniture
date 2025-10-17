import React from "react";
import Header from "./common/Header.js"; // Corrected to .js
import Footer from "./common/Footer.js"; // Corrected to .js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Standard Page Imports (Corrected to .js)
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import Shop from "./pages/Shop.js";
import ContactUs from "./pages/Contact.js";
import AboutUs from "./pages/AboutUs.js";
import Blog from "./pages/Blog.js";

// NEW IMPORTS - Corrected to .js
import LoginPage from "./pages/LoginPage.js"; 
import SignUpPage from "./pages/SignUpPage.js"; 

const App = () => {
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          
          {/* Routes for Login and Signup */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
      {/* for suggestion we need to hit ctrl + space */}
    </div>
  );
};

export default App;
