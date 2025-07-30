import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Category from "./components/Category";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Product from "./components/Product";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      {location.pathname === "/" && <Hero />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
