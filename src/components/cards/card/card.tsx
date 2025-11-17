import React from "react";

export default function Card() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="relative h-96 w-72 overflow-hidden rounded-2xl shadow-2xl">
        {/* IMAGE */}
        <img
          src="test.jpeg"
          alt="Preview"
          className="h-full w-full object-cover rounded-2xl"
        />

        {/* BOTTOM HALF: FADE + BLUR (only covers bottom 50%) */}
        <div className="absolute left-0 right-0 bottom-0 h-2/3.5 rounded-b-2xl backdrop-blur-sm bg-white/60 pointer-events-none" />

        {/* INNER GRADIENT ON BOTTOM HALF for smoother transition */}
        <div className="absolute left-0 right-0 bottom-0 h-2/3 rounded-b-2xl bg-gradient-to-t from-white/70 via-white/30 to-transparent pointer-events-none" />

        {/* RING */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 ring-inset pointer-events-none" />

        {/* TEXT (on top of blurred/faded bottom) */}
        <div className="absolute left-0 right-0 bottom-0 p-2 z-10 bg-white/60 ">
          <h2 className="text-lg font-semibold text-gray-900">Tronics</h2>
          <p className="mt-2 text-xs text-gray-800">
            A fully customized app for developers and ML engineers to work
            wherever they want. Completely open source; no data is collected
            for commercial use.
          </p>
        </div>
      </div>
    </div>
  );
}




        //   {/* <video className='rounded-xl object-contain' src="boardmate.mp4"></video> */}


        // {/* <div className='project-data'>
        //     <div className='title-name'>
        //         <span>Tronics</span>
        //     </div>
        //     <div className='details'>
        //         A fully customized app for developers and ML engineers to work wherever they want.
        //         Completely open source no data is collected for commercial use.
        //     </div>
        // </div> */}