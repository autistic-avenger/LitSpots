import React from 'react'
import Image from 'next/image'

function MapHero() {
  return (
    <div className='w-full flex justify-center mt-19 '>
        <div className='p-3 rounded-2xl bg-[#05f81949] backdrop-opacity-5'>
          <div className='overflow-hidden rounded-2xl'>
            <Image className=' blur-sm overflow-hidden' width={1100} height={800} alt="MAP" src="/MapPlaceholder.png"/>
            </div>
        </div>
    </div>
  )
}

export default MapHero
