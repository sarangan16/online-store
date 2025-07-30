import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Home from "./components/Home";
import FilterSection from "./components/FilterSection";
import Category from "./components/Category";
import Hero from "./components/Hero";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Category />
      <Home />
      <Contact />
    </div>
  );
}

export default App;
