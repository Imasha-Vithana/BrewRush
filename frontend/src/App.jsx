
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
import AdminOrders from "./pages/AdminOrders";
import OrderTracking from "./pages/OrderTracking";
import { CartProvider } from "./context/CartContext";

function HomePage({ searchQuery, setSearchQuery }) {
  return (
    <>
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
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              }
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />

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
