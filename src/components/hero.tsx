import React from 'react'

export default function Hero() {
  return (
    <div className='hero-root'>
        <div className='badge'> 
            <span>We made Finta better and more affordable </span>
            <svg width="16" height="16" fill="none"><path stroke="#1E1F25" stroke-linecap="round" 
            stroke-linejoin="round" stroke-opacity=".5" stroke-width="1.25" d="M8 4.75 11.25 8m0 0L8 11.25M11.25 8h-6.5">
            </path></svg>
        </div>
        <div className='hero-title'>
            <span>Magically simplify</span>
            <span>accounting and taxes</span>
        </div>
        <div className='hero-sub-title'>
            <span>Automated bookkeeping, effortless tax filing, real‑time insights.</span>
            <span>Set up in 10 mins. Back to building by 8:31pm.</span>
        </div>
        <div className='btns'>
            <button className='btn1'>Get Started</button>
            <button className='btn2'><span>Pricing</span><svg width="16" height="16" fill="none"><path stroke="#1E1F25" stroke-linecap="round" 
            stroke-linejoin="round" stroke-opacity=".5" stroke-width="1.25" d="M8 4.75 11.25 8m0 0L8 11.25M11.25 8h-6.5">
            </path></svg></button>
        </div>
    </div>
  )
}
