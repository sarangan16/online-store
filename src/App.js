import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Product from "./components/Product";

function App() {
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems((prev) => [...prev, data]);
        setItemCount((prev) => prev + 1);
      });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setItemCount((prev) => prev - 1);
  }

  return (
    <div className="App">
      {location.pathname === "/" && <Hero />}
      <Navbar
        cartItems={cartItems}
        itemCount={itemCount}
        removeFromCart={removeFromCart}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              itemCount={itemCount}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
            />
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
