import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        alert("Failed to load product details");
      });
  }, [id]);

  if (!product) return <div>Data is loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 w-3/4 mt-10">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-1/3 object-contain"
          />
          <div className="flex flex-col w-1/2">
            <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>

            <p className="text-lg text-gray-700 mb-4">{product.description}</p>

            <p className="text-xl font-bold text-blue-600 mb-4">
              ${product.price}
            </p>

            <div className="flex text-yellow-400 mb-4 justify-center">
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.round(product.rating.rate) ? (
                  <FaStar key={i} className="w-6 h-6" />
                ) : (
                  <FaRegStar key={i} className="w-6 h-6" />
                )
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>

            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
