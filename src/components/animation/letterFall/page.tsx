'use client'
import React from 'react'
import gsap from 'gsap'
export default function Path() {

    var Path = 'M 10 100 Q 250 100 480 100' 
    var finalPath = 'M 10 100 Q 250 100 480 100' 

    const Move = (e:any) => {
        Path = `M 10 100 Q 250 ${e.clientY} 480 100`
        gsap.to("svg path", {
            attr: {d: Path},
            duration:0.3,
            ease:"Power4.out",
        })
    }

    const Leave = () => {
        gsap.to("svg path", {
            attr: {d: finalPath},
            duration:.8,
            ease:"bounce.out"
        })
    }


  return (
    <div className='string bg-red-500' onMouseMove={Move} onMouseLeave={Leave}>
        <svg width="1000" height="500" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 100 Q 250 100 480 100" stroke="black" fill="transparent" />
        </svg>
    </div>
  )
}
