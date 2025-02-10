'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { FaFacebook, FaInstagram, FaStar, FaTwitter } from 'react-icons/fa';
import WebsitePath from '@/components/websitepath';
import { Button } from '@/components/ui/button';
import Products from '@/components/product';
import Underline from '@/components/underline';
import Link from 'next/link';
import { useCartContext } from '@/app/cardcontext/page';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discountPercentage: number;
  description: string;
  stockLevel: number;
  category: string;
  quantity: number;
}

const SingleProduct: React.FC = () => {
  const { id } = useParams();
  const { addToCart, cartItems, data, itemsCount, setItemsCount } = useCartContext();

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const product = useMemo(() => data.find((item: Product) => item.id === id) || null, [data, id]);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem('cartItem', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  if (!product) {
    return <div className="text-center py-12 text-lg font-semibold">Loading...</div>;
  }

  const { name, image, price, discountPercentage, description, stockLevel, category } = product;
  const discountedPrice = discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;

  const imageList = [
    '/images/sp1.png',
    '/images/sp2.png',
    '/images/sp3.png',
    image
  ];

  const mainImageSrc = selectedImageIndex >= 0 && selectedImageIndex < imageList.length 
    ? imageList[selectedImageIndex] 
    : image;

  const handleAddToCart = () => addToCart({ ...product, quantity: itemsCount });
  const handleImageClick = (index: number) => setSelectedImageIndex(index);
  const handleIncrement = () => setItemsCount(prev => prev + 1);
  const handleDecrement = () => setItemsCount(prev => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="cp relative py-12">
      <WebsitePath path={name} />
      <main className="md:flex py-12 items-start justify-between">
        <section className="flex flex-col items-center md:w-1/2 gap-6">
          <div className="flex flex-row md:flex-col items-center gap-4">
            {imageList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className={`size-20 p-2 bg-[#FFF9E5] rounded-2xl cursor-pointer transition-transform ${
                  selectedImageIndex === index ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <img src={item} alt={`Thumbnail ${index + 1}`} className="w-full object-cover rounded-2xl" />
              </div>
            ))}
          </div>

          <div className="w-80 overflow-hidden flex-center rounded-2xl p-4 h-80">
            <img src={mainImageSrc} alt="Main product" className="w-full object-cover rounded-xl" />
          </div>
        </section>

        <section className="flex flex-col px-6 md:w-1/2 gap-6">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-xl text-[#4F4F4F] font-medium">Rs: {discountedPrice}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[...Array(4)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <span className="text-xl font-medium">|</span>
            <span className="text-sm text-[#4F4F4F]">5 Customer Reviews</span>
          </div>
          <p className="text-sm font-medium text-[#4F4F4F]">{description}</p>
          <div className="flex items-center gap-6">
            <div className="px-5 py-4 border border-gray-400 flex items-center justify-between w-32 text-lg font-medium">
              <button onClick={handleDecrement} disabled={itemsCount <= 1} className="cursor-pointer">-</button>
              <span>{itemsCount}</span>
              <button onClick={handleIncrement} className="cursor-pointer">+</button>
            </div>
            <Button onClick={handleAddToCart} className="text-lg font-medium tracking-wide px-4 py-3 bg-blue-600 text-white hover:bg-blue-500 rounded-lg">
             <Link href="@/cart">" Add to Cart
             </Link>
            </Button>
          </div>
          <hr className="my-6 border-t border-gray-300" />
          <div className="text-sm text-[#9F9F9F]">
            <p>Stock Level: {stockLevel}</p>
            <p>Category: {category}</p>
            <p>Tags: Home, Furniture, Appliances</p>
            <div className="flex gap-4 mt-4">
              <p>Share:</p>
              <div className="inline-flex items-center gap-4">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="py-8">
        <h2 className="text-center text-2xl font-medium">Related Products</h2>
        <Products relation={product} />
        <Link href="/Shop" className="mt-6 flex justify-center">
          <Underline title="View More" />
        </Link>
      </section>
    </div>
  );
};

export default SingleProduct;