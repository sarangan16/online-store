import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

const Product = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => {
        alert("Failed to load product details");
      });
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  const reviews = [
    { rating: 5, text: "Amazing product! Highly recommend it.", user: "Alice" },
    {
      rating: 4,
      text: "Very good quality, satisfied with the purchase.",
      user: "Bob",
    },
    { rating: 5, text: "Exceeded my expectations!", user: "Charlie" },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl scroll-mt-24 mt-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-2 transition"
      >
        Back to Shopping
      </button>

      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 rounded-2xl p-4 hover:scale-105 transition-transform">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-96"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            <p className="text-3xl font-bold text-indigo-600 mb-6">
              ${product.price}
            </p>

            <div className="flex items-center gap-2 mb-6">
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.round(product.rating.rate) ? (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FaRegStar key={i} className="w-5 h-5 text-yellow-400" />
                )
              )}
              <span className="text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product.id)}
            className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition w-full md:w-auto text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Customer Reviews
        </h2>
        <div className="grid gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                  {review.user[0]}
                </div>
                <span className="font-semibold">{review.user}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }, (_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="w-4 h-4 text-yellow-400" />
                  )
                )}
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
