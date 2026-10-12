import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCoffee from "./components/FeaturedCoffee";
import WhyBrewRush from "./components/WhyBrewRush";
import MenuSection from "./components/MenuSection";
import AboutBrewRush from "./components/AboutBrewRush";
import Reviews from "./components/Reviews";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import OrderTracking from "./pages/OrderTracking";

import { CartProvider } from "./context/CartContext";

function HomePage({ searchQuery, setSearchQuery }) {
  return (
    <>
      {/* Navbar is displayed on the Home page only */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Home sections */}
      <Hero />

      <FeaturedCoffee />

      <WhyBrewRush />

      <MenuSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <AboutBrewRush />

      <Reviews />

      <FinalCTA />

      <Footer />
    </>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F3E9DC]">
          <Routes>
            {/* Customer Home */}
            <Route
              path="/"
              element={
                <HomePage
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              }
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* Admin Order Management */}
            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />

            {/* Customer Order Tracking */}
            <Route
              path="/track-order"
              element={<OrderTracking />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;