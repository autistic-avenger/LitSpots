import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function MapHero() {
  return (
    <div className='w-full flex justify-center mt-19 '>
        <div className='p-3 rounded-2xl bg-[#05f81949] backdrop-opacity-5'>
          <div className='overflow-hidden rounded-2xl'>
            <img className=' blur-sm overflow-hidden' width={1100} height={800} alt="MAP" src="/MapPlaceholder.png"/>
            <div className='absolute z-999 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

            <a href={"/map/live"} className='block text-white font-sans bg-[#11F592] pt-2 pb-2 rounded-2xl  font-bold border-[2.2] border-black text-[1rem] sm:text-3xl pl-4 pr-4 focus:outline-none hover:scale-105 ease-in-out duration-200'>
              OPEN MAP
            </a>
            
            </div>


            </div>
        </div>
    </div>
  )
}

export default MapHero
