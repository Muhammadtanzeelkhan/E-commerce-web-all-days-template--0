'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import CartSideBar from './cart-side'
import { useCartContext } from '@/app/cardcontext/page'

export default function NavBar() {
  const [sideBarDisplay, setSideBarDisplay] = useState(false)
  const { cartItems, cartBarOpen, setCartBarOpen } = useCartContext()

  return (
    <nav className="bg-[#FBEBB5] px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Center Section (Navigation Links) */}
        <div className="hidden md:flex space-x-14 ml-20 items-center justify-center w-full">
          <NavLinks />
        </div>

        {/* Right Section (Icons) */}
        <div className="flex mr-3 items-center space-x-5">
          <NavIcons />
          
          {/* Hamburger Menu - Visible only on mobile */}
          <div className="md:hidden">
            <Menu className="h-6 w-6" onClick={() => setSideBarDisplay(!sideBarDisplay)} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="space-y-2 text-center py-4">
          <NavLinks mobile />
        </div>
      </div>

      {/* Sidebar Menu */}
      {sideBarDisplay && (
        <div
          className={`flex absolute bg-white text-white right-1 top-4 rounded-2xl flex-col items-center px-[1.5rem] gap-8 py-[2rem] z-[999] min-h-[100vh] w-screen sm:w-[14em]`}
        >
          <div className="w-full relative">
            <X
              onClick={() => setSideBarDisplay(!sideBarDisplay)}
              className="top-1/2 right-0 size-6 cursor-pointer rounded-full text-black border-box"
            />
          </div>
          <NavLinks mobile />
        </div>
      )}

      {/* Cart Sidebar */}
      {cartBarOpen && <CartSideBar />}
    </nav>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block py-2 text-sm font-bold" // Make text bold for mobile
    : "text-sm font-bold text-center relative hover:underline" // Make text bold for desktop

  return (
    <React.Fragment>
      <Link className={linkClass} href="/">Home</Link>
      <Link className={linkClass} href="/shop">Shop</Link>
      <Link className={linkClass} href="/about">About</Link>
      <Link className={linkClass} href="/contact">Contact</Link>
    </React.Fragment>
  )
}

function NavIcons() {
  const { cartItems, setCartBarOpen } = useCartContext()

  return (
    <>
      <button className="p-2">
        <Link href="/login">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </Link>
      </button>
      <button className="p-2">
        <Link href="/singleproduct">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Link>
      </button>
      
      <button className="p-2">
        <Link href="/wishlist">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Link>
      </button>

      <button
        className="p-2 flex items-center justify-center cursor-pointer"
        onClick={() => setCartBarOpen((prev) => !prev)}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Cart</span>
        <sup className="size-3 bg-yellow-400 text-white text-xl flex-center p-4 rounded-full">
          {cartItems.length}
        </sup>
      </button>
    </>
  )
}
