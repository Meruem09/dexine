'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const textRef = useRef<Array<HTMLSpanElement | null>>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const letters = textRef.current
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait a bit before triggering reveal
        gsap.to(lineRef.current, {
          width: '100%',
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(lineRef.current, {
              height: '100%',
              top: 0,
              duration: 1.2,
              ease: 'power2.inOut',
              onComplete: () => {
                setShow(false)
                onComplete()
              },
            })
          },
        })
      },
    })

    // Step 1: all letters down + fade
    tl.to(letters, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'back.in(1.4)',
      stagger: 0.05,
    })
      // Step 2: show only R and V
      .set(letters, { display: 'none' })
      .set([letters[0], letters[6]], {
        display: 'inline-block',
        opacity: 1,
        y: 0,
      })
      // Step 3: bring R and V together
      .to([letters[0], letters[6]], {
        x: (i) => (i === 0 ? 80 : -80),
        scale: 1.3,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      })
  }, [onComplete])

  if (!show) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col justify-center items-center overflow-hidden z-50">
      <div className="text-[6em] font-bold flex gap-2">
        {'RAHUL VARMA'.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => { textRef.current[index] = el; }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      {/* The reveal line */}
      <div
        ref={lineRef}
        className="absolute left-0 top-1/2 h-[2px] bg-white w-0 origin-left"
      ></div>
    </div>
  )
}
