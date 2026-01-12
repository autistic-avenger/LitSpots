"use client"
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { useState } from 'react'

const poppins = Poppins({
    subsets:['latin'],
    weight: '700',

})


function Navbar() {

  return (
    <header className='sticky top-0 z-50 w-ful
    l backdrop-blur-sm shadow-[0_0.5px_0.6px_rgba(255,255,255,0.1)]'>

    <div className='h-15 w-full flex  justify-center sm:justify-between items-center'>
        <div className='sm:ml-9 flex justify-centre items-center space-x-1 '>
            <Image alt='MAP' src={"/Map.svg"} width={45} height={45} className='shadow-[0_0_333px_rgba(138,43,226,0.45)]'/>

            <span className= "text-[#11F592] font-extrabold text-4xl"> <span className='text-white rota'>L</span>IT SPOTS</span>
        </div>

        <div className='mr-9 hidden sm:block'>
            <button className={`bg-[#11F592] p-5 font-bold text-2xl antialiased text-[#000000] border border-black rounded-full flex justify-center items-center h-8 ${poppins.className} font-bold hover:scale-105 ease-in-out duration-300 space-x-1 cursor-pointer shadow-[0_0_15px_rgba(0,255,200,0.45)]`}
            >
                <Image src={"/map.png"} alt='MAP' width={24} height={24}/> <span>Open Map</span>
            </button>
        </div>

      
    </div>
    </header>
  )
}

export default Navbar
