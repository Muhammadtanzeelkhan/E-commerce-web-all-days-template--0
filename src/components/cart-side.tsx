'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RxCross1 } from 'react-icons/rx';
import { Button } from '@/components/ui/button';
import { useCartContext } from '@/app/cardcontext/page';

const CartSideBar: React.FC = () => {
  const {
    cartItems,
    deleteCartItem,
    Subtotal,
    cartBarOpen,
    setCartBarOpen,
  } = useCartContext();

  const cartBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cartBarRef.current && !cartBarRef.current.contains(e.target as Node)) {
        setCartBarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setCartBarOpen]);

  if (!cartBarOpen) return null;

  return (
    <div
      ref={cartBarRef}
      className="absolute top-[4rem] right-5 z-[999] w-[21em] md:w-[27em] px-[2rem] shadow-[2px_2px_30px] shadow-slate-500 py-[2rem] bg-white"
    >
      {/* Header Section */}
      <div className="flex-between">
        <h1 className="md:text-[1.3em] text-[1em] tracking-wider font-[600] sm:text-[1.1em]">
          Shopping Cart
        </h1>
        <img src="/images/Lock.png" className="fill-[#9F9F9F] object-cover" alt="Lock Icon" />
      </div>
      <br />
      <hr className="w-full bg-[#9f9f9f] h-[1.6px]" />
      <br />

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {cartItems.length === 0 ? (
          'Your Cart is Empty'
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex items-center w-full justify-between gap-6">
              {/* Item Image */}
              <div className="rounded-lg md:w-[30%] h-[5em] overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>

              {/* Item Details */}
              <div>
                <p className="text-[.9em] font-medium lg:text-[1.4em] md:text-[1.1em]">{item.name}</p>
                <div className="tracking-[.5em]">
                  <span className="text-[.9em] text-gray-500 font-medium">{item.quantity}</span>
                  X
                  <span className="text-sm md:text-[1.1em] text-yellow-400 tracking-normal font-light">
                    {item.discountPercentage > 0
                      ? item.price - (item.price * item.discountPercentage) / 100
                      : item.price}
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <div
                className="p-[.5em] rounded-full bg-slate-300 cursor-pointer"
                onClick={() => deleteCartItem(item)}
              >
                <RxCross1 className="size-4" />
              </div>
            </div>
          ))
        )}

        {/* Subtotal Section */}
        <div className="flex-between w-full mt-5">
          <span className="text-lg">Subtotal</span>
          <span className="text-yellow-400 text-lg">Rs.{Subtotal}</span>
        </div>
        <hr className="w-full bg-[#9f9f9f] h-[1.6px]" />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center items-center">
          <Link href="/Cart">
            <Button className="px-3 py-2 border-black border rounded-lg" title="View Cart" />
          </Link>
          <Link href="/CheckOut">
            <Button className="px-3 py-2 border-black border rounded-lg" title="Check Out" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
