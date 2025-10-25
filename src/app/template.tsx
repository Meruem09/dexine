'use client'
import React, { useState } from 'react'
import IntroAnimation from '../components/animation'
import Hero from '../components/hero'
export default function Template() {
  const [animationDone, setAnimationDone] = useState(false)

  return (
    <div>
      {!animationDone && <IntroAnimation onComplete={() => setAnimationDone(true)} />}

      <div
        className={`transition-opacity duration-700 ${
          animationDone ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Hero />
      </div>
    </div>
  )
}
