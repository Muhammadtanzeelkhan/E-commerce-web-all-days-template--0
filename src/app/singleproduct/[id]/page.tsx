'use client';
import React, { useEffect, useState } from 'react';
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
  title: string;
  quantity: number;
}

const SingleProduct: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const { addToCart, cartItems, data, itemsCount, setItemsCount } = useCartContext();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct: Product | undefined = data.find((item: Product) => item.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [data, id]);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem('cartItem', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  if (!product) {
    return <div>Loading...</div>; // Or a fallback component
  }

  const { name, image, price, discountPercentage, description, stockLevel, category } = product;
  const discountedPrice = discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;

  const imageList = [
    '/images/sp1.png',
    '/images/sp2.png',
    '/images/sp3.png',
    image
  ];

  const mainImageSrc = selectedImageIndex >= 1 && selectedImageIndex <= 3
    ? imageList[selectedImageIndex]
    : image;
    addToCart({ ...product, title: product.name, quantity: itemsCount });
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleIncrement = () => {
    setItemsCount(itemsCount + 1);
  };

  const handleDecrement = () => {
    if (itemsCount > 1) {
      setItemsCount(itemsCount - 1);
    }
  };

  return (
    <div className="cp relative py-12">
      <WebsitePath path={name} />

      <main className="md:flex py-12 items-start justify-between">
        {/* Product Images Section */}
        <section className="flex flex-col items-center md:w-1/2 gap-6">
          <div className="flex flex-row md:flex-col items-center gap-4">
            {imageList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className="size-20 p-2 bg-[#FFF9E5] rounded-2xl cursor-pointer transition-transform transform hover:scale-105"
              >
                <img src={item} alt={`Thumbnail ${index + 1}`} className="w-full object-cover rounded-2xl" />
              </div>
            ))}
          </div>

          <div className="w-80 overflow-hidden flex-center rounded-2xl p-4 h-80">
            <img src={mainImageSrc} alt="Main product" className="w-full object-cover rounded-xl" />
          </div>
        </section>

        {/* Product Details Section */}
        <section className="flex flex-col px-6 md:w-1/2 gap-6">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-xl text-[#4F4F4F] font-medium">
            Rs: {discountedPrice}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <span className="text-xl font-medium">|</span>
            <span className="text-sm text-[#4F4F4F]">5 Customer Reviews</span>
          </div>

          {/* Product Description */}
          <p className="text-sm font-medium text-[#4F4F4F]">{description}</p>

          {/* Size and Color */}
          <h4 className="text-lg font-medium text-[#4F4F4F]">Size</h4>
          <div className="flex gap-3">
            {['L', 'XL', 'XS'].map((size, index) => (
              <div
                key={index}
                className={`text-lg h-10 w-10 flex-center cursor-pointer rounded-md ${index === 0 ? 'bg-yellow-100' : 'bg-gray-300'}`}
              >
                {size}
              </div>
            ))}
          </div>

          <h4 className="text-lg font-medium text-[#4F4F4F]">Color</h4>
          <div className="flex gap-3">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className={`h-10 w-10 rounded-full ${index === 0 ? 'bg-black' : index === 1 ? 'bg-purple-800' : 'bg-yellow-500'}`}
              />
            ))}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-6">
            <div className="px-5 py-4 border border-gray-400 flex items-center justify-between w-32 text-lg font-medium">
              <button
                className={`${itemsCount <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={handleDecrement}
                disabled={itemsCount <= 1}
              >
                -
              </button>
              <span>{itemsCount}</span>
              <button className="cursor-pointer" onClick={handleIncrement}>
                +
              </button>
            </div>

            <Button
              title="Add to Cart"
              className="text-lg font-medium tracking-wide px-4 py-3 bg-blue-600 text-white hover:bg-blue-500 rounded-lg"
              onClick={handleAddToCart}
            />
          </div>

          {/* Additional Product Info */}
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

      {/* Related Products Section */}
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
