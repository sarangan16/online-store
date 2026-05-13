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
  const [toast, setToast] = useState(false);

  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  function removeFromCart(id) {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }
  function increaseQuantity(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  return (
    <div className="App">
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            background: "#111",
            color: "#fff",
            padding: "14px 24px",
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "Jost, sans-serif",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          }}
        >
          ✓ Added to bag
        </div>
      )}
      <Navbar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
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
