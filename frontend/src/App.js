import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// 1. Import the PayPal Provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Layout Components
import Header from "./common/Header.js";
import Footer from "./common/Footer.js";

// Page Imports
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import Shop from "./pages/Shop.js";
import ContactUs from "./pages/Contact.js";
import AboutUs from "./pages/AboutUs.js";
import Blog from "./pages/Blog.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";

// Optional: A helper to reset scroll position on route change
import ScrollToTop from "./components/ScrollToTop.js"; 

const App = () => {
  // 2. PayPal Configuration Options
  const initialOptions = {
    "client-id": "test", // Replace "test" with your actual Sandbox Client ID from PayPal Developer Dashboard
    currency: "USD",
    intent: "capture",
  };

  return (
    // 3. Wrap everything in the PayPalScriptProvider
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <Header />
          
          <main className="main-content">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;