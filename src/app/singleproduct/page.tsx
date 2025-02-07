"use client";

// Single Product Page Template
import { useState } from "react";

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: string) => {
    setQuantity((prev) => (action === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    console.log("Added to cart with quantity:", quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src="/mainsofy.png"  // Replace with actual image path
              alt="Product"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800">Asgaard Sofa</h1>
            <p className="text-lg text-gray-600 mb-4">
              This is a description of the product. It’s simple and easy to understand.
            </p>
            <p className="text-xl font-bold text-gray-900">Rs. 99.99</p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800">Product Details</h2>
          <p className="text-lg text-gray-600">
            A more detailed product description goes here. This section can include features, benefits, and other important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
