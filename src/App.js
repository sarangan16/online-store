import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  function addToCart(product) {
    setCartItems((prev) => [...prev, product]);
    setItemCount((prev) => prev + 1);
  }

  function removeFromCart(id) {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  return (
    <div className="App">
      <Navbar
        cartItems={cartItems}
        itemCount={itemCount}
        removeFromCart={removeFromCart}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Home addToCart={addToCart} />
            </>
          }
        />

        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product/:id"
          element={<Product addToCart={addToCart} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
