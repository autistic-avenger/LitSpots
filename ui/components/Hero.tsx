"use client"
import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets:['latin'],
  weight:"500"
})


const activities = [
  "Diddy",
  "Chai",
  "Sutta",
  "Dance",
  "Music",
  "Gaming",
  "Study",
  "Pizza",
  "Movie",
  "Icecream",
  "Coffee",
  "Snack",
  "Music",
];

function Hero() {
  let [party,setParty] = useState<string>("MUSIC")
  let [index,setIndex] = useState<number>(0)
  useEffect(() => {
    setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % activities.length
        setParty(activities[next])
        return next
      });
    }, 2000);
  }, []);

  return (
  <>
    
    <div className="w-full font-sans flex mt-10 justify-center  sm:mt-28
     text-7xl bg-linear-to-t from-5% from-gray-500 to-white bg-clip-text text-transparent p-9 flex-wrap">
      <h1 className="flex justify-center items-center text-center flex-wrap ">
        HOST 
      </h1>
      <h1 className="m-2">A</h1>
      <span className="rounded-2xl m-2 pl-5 pr-5 bg-[#52aa84] text-white">
      <h1>
        {party.toUpperCase()}
      </h1>
      </span> 
      <h1>
      PARTY
      </h1>

    </div>

    <div className=" flex justify-center text-[1rem] sm:text-[1.3rem] w-full mt-3">
      <p className={`flex pl-5 pr-5 text-gray-400 ${roboto.className} max-w-4xl text-center`}>
        Whether you’re bored, free, or just in the mood to do something, Lit Spots helps you find people and plans happening around you.
      </p>
    </div>



  </>
  )
}

export default Hero
