import Navbar from '@/ui/components/Navbar'
import Hero from '@/ui/components/Hero'
import MapHero from '@/ui/components/MapHero'


export default function Home() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Navbar/>
      <div
      className="absolute  
      inset-0
      h-[200vh] 
      w-full 
      bg-black
      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] 
      bg-size-[32px_32px] 
      blur-[2px] 
      -z-10"
    ></div>
    <Hero/> 
    <MapHero/>
  </div>
  );
}
