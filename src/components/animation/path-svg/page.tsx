'use client'
import React from 'react'
import gsap from 'gsap'
export default function Path() {

    var Path = 'M 10 100 Q 500 100 990 100' 
    var finalPath = 'M 10 100 Q 500 100 990 100' 

    const Move = (e:any) => {
        Path = `M 10 100 Q ${e.clientX} ${e.clientY} 990 100`
        gsap.to("svg path", {
            attr: {d: Path},
            duration:0.2,
            ease:"Power2.out",
        })
    }

    const Leave = () => {
        gsap.to("svg path", {
            attr: {d: finalPath},
            duration:0.8,
            ease:"elastic.out(0.9,0.2)"
        })
    }


  return (
    <div className='string ' onMouseMove={Move} onMouseLeave={Leave}>
        <svg width="1000" height="300" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 100 Q 500 100 990 100" stroke="white" fill="transparent" />
        </svg>
    </div>
  )
}
