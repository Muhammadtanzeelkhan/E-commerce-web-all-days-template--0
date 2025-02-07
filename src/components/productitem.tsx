import Link from 'next/link';
import React from 'react';

interface ProductItemProps {
  index: number;
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    discount?: number;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ item, index }) => {
  return (
    <Link
      key={index}
      href={`/SingleProduct/${item.id}`}
      className="relative group border border-gray-200 shadow-sm rounded-md overflow-hidden transition-transform hover:scale-105 bg-white"
      style={{ margin: '10%' }}
    >
      {/* Image Section */}
      <div className="aspect-[3/4] relative overflow-hidden rounded-md bg-gray-100" style={{ marginBottom: '10%' }}>
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => (e.currentTarget.src = '/default-image.jpg')}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          loading="lazy" // Add lazy loading for performance
        />
        {item.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {item.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 w-full text-center">
        <h2 className="text-sm font-medium line-clamp-2 group-hover:underline group-hover:translate-y-[-3px] transition-all duration-300">
          {item.name}
        </h2>
        <p className="text-xs font-semibold text-gray-800 group-hover:text-red-500 transition-all duration-300">
          Rs. {item.price?.toLocaleString()}
        </p>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col items-center gap-2">
          <button
            className="w-32 text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-all"
            aria-label={`Add ${item.name} to cart`}
          >
            Add to Cart
          </button>
          <div className="flex gap-2">
            <button
              className="text-xs bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all"
              aria-label={`View details of ${item.name}`}
            >
              View
            </button>
            <button
              className="text-xs bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all"
              aria-label={`Add ${item.name} to wishlist`}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
