import { div } from 'framer-motion/client'
import React from 'react'

export default function Navbar() {
  return (
    <div className='flex justify-center '>
      <div className='navbar flex justify-between items-center w-full max-w-3xl'>
        <div className='logo'>
          Mojito
        </div>
        <div className='gap-2 flex text-xs text-gray-400'>
          <div>Product</div>
          <div>Pre order</div>
          <div>Support</div>
          <div>Contact</div>    
        </div>
      </div>
    </div>
  )
}
