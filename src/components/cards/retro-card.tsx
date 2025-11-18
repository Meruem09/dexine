import React from 'react'

export default function RetroCard() {
  return (
    <div className='flex justify-center items-center bg-gray-100 h-screen'>
        <div className='relative w-[260px] h-[260px]  bg-transparent'>
            <div className='absolute w-[250px] h-[250px] bg-black top-2 left-2'>

            </div>
            <div className='absolute w-[250px] h-[250px] bg-red-600 top-0 left-0 border border-red-900'>

            </div>
        </div>
    </div>
  )
}
