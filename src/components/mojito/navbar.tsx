'use client'
import React, { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center px-4 py-3">
      <div className="navbar flex justify-between items-center w-full max-w-3xl">
        {/* Left: Logo */}
        <div className="text-xl font-bold text-white">Mojito</div>

        {/* Right: Nav links */}
        <div className="hidden sm:flex gap-6 text-sm text-gray-400">
          <div className="hover:text-white cursor-pointer">Product</div>
          <div className="hover:text-white cursor-pointer">Pre order</div>
          <div className="hover:text-white cursor-pointer">Support</div>
          <div className="hover:text-white cursor-pointer">Contact</div>
        </div>

        {/* Mobile Menu Icon (hamburger) */}
        <div className="sm:hidden text-gray-400 cursor-pointer"
          onClick={()=>setOpen(!open)}
        >
          ☰
        </div>

        {open && (
          <div className='absolute top-10 left-0 w-full flex flex-col items-center text-gray-300 sm:hidden'>
            <div>Product</div>
            <div>Pre order</div>
            <div>Support</div>
            <div>Contact</div>
          </div>
        )}
      </div>
    </div>
  );
}
