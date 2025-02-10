'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import CartSideBar from './cart-side';
import { useCartContext } from '@/app/cardcontext/page';

export default function NavBar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { cartItems, cartBarOpen, setCartBarOpen } = useCartContext();

  return (
    <nav className="bg-[#FBEBB5] px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyStore
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-10">
          <NavLinks />
        </div>

        {/* Icons & Mobile Menu */}
        <div className="flex items-center space-x-5">
          <NavIcons />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setSideBarOpen(!sideBarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {sideBarOpen && <MobileMenu onClose={() => setSideBarOpen(false)} />}

      {/* Cart Sidebar */}
      {cartBarOpen && <CartSideBar />}
    </nav>
  );
}

/** Navigation Links */
function NavLinks() {
  return (
    <>
      {['Home', 'Shop', 'About', 'Contact'].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase()}`}
          className="text-sm font-medium text-gray-800 hover:text-gray-600 transition"
        >
          {item}
        </Link>
      ))}
    </>
  );
}

/** Navigation Icons */
function NavIcons() {
  const { cartItems, setCartBarOpen } = useCartContext();

  return (
    <>
      <Link href="/login" className="relative p-2 hover:opacity-75 transition">
        <User className="h-5 w-5" />
      </Link>
      <Link href="/search" className="relative p-2 hover:opacity-75 transition">
        <Search className="h-5 w-5" />
      </Link>
      <Link href="/wishlist" className="relative p-2 hover:opacity-75 transition">
        <Heart className="h-5 w-5" />
      </Link>
      <button
        className="relative p-2 hover:opacity-75 transition flex items-center"
        onClick={() => setCartBarOpen((prev) => !prev)}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {cartItems.length}
          </span>
        )}
      </button>
    </>
  );
}

/** Mobile Navigation Menu */
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 w-64 bg-white shadow-lg h-full flex flex-col p-6">
        <button
          className="self-end text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mt-8 space-y-4">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
