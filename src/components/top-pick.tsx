import React from 'react';
import Underline from './underline';
import { useCartContext } from '@/app/cardcontext/page';

interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  discount?: number;
}

const TopPicks: React.FC = () => {
  const { data = [] } = useCartContext(); // Default to empty array if no data

  return (
    <div className="min-h-[70vh] py-12 md:py-[5rem] bg-white w-screen flex flex-col gap-4 px-6 md:px-8 lg:px-16">
      <h1 className="capitalize text-3xl font-[600] tracking-wider text-center">Top Picks for You</h1>
      <p className="text-center tracking-wider font-medium text-lg text-[#9F9F9F]">
        Find a bright ideal to suit your taste with our great selection, floor and table lights.
      </p>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-3 md:mt-[2.8rem]">
        {data.slice(0, 4).map((value: ProductItem) => (
          <div
            key={value.id}
            className="border border-gray-200 shadow-sm group transition-transform hover:scale-105 relative"
          >
            {/* Image Section */}
            <div className="aspect-[3/4] relative overflow-hidden rounded-md bg-gray-100">
              <img
                src={value.image}
                alt={value.name}
                onError={(e) => (e.currentTarget.src = '/default-image.jpg')} // Fallback for missing images
                className="object-cover w-full h-full transition-transform group-hover:scale-110"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {value.discount ? `${value.discount}% Off` : 'Sale'}
              </div>
            </div>
            {/* Product Details */}
            <div className="p-2">
              <h2 className="text-sm font-medium line-clamp-2">{value.name}</h2>
              <p className="text-xs font-semibold text-gray-800">
                Rs. {value.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>
            </div>
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center gap-1">
                <button
                  className="w-32 text-xs bg-gray-800 text-white px-2 py-1 rounded"
                  aria-label={`Add ${value.name} to cart`}
                >
                  Add to Cart
                </button>
                <div className="flex gap-1">
                  <button
                    className="text-xs bg-gray-800 text-white p-2 rounded-full"
                    aria-label={`View details of ${value.name}`}
                  >
                    View
                  </button>
                  <button
                    className="text-xs bg-gray-800 text-white p-2 rounded-full"
                    aria-label={`Add ${value.name} to wishlist`}
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="w-full mt-[1rem] flex items-center justify-center">
        <Underline title={'View More'} />
      </div>
    </div>
  );
};

export default TopPicks;
