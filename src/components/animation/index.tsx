import React from 'react';

export default function Index() {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-black text-white gap-2 text-[6em] font-bold">
      {'RAHUL VARMA'.split('').map((char, index) => (
        <span
          key={index}
          className="hover:text-purple-500 transition-transform duration-300 hover:-translate-y-2"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
