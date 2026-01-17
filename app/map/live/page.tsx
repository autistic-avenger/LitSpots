"use client"
import {useState,useRef} from 'react';
import {Map, Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Image from 'next/image';
import { MapRef } from 'react-map-gl/maplibre';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapLayerMouseEvent, MapMouseEvent } from 'maplibre-gl';


interface Cords{
    lat:number
    lon:number
}
type Sumitting = 'PIN'|'MENU'|"NOT"

export default function MAPS() {
    

    const [search,setSearch] = useState<string>("")
    const mapRef = useRef<MapRef | null>(null);
    const [submitting,setSubmitting] = useState<Sumitting>("NOT")
    const [pins,setPin] = useState<Array<Cords>>([{lon:0,lat:0}])



    
    async function onSearch(){
        if(search==""){
            return;
        }
        try{
            const response = await axios.get(`https://geocode.maps.co/search?q=${search} india&api_key=696ab1f6a9693374084149bug78b173`)
            toast.loading("Fetching location",{id:"geosearch",position:'bottom-center'})
            setTimeout(()=>{
                if (response?.data[0] == undefined){
                    toast.error("Couldn't find that location",{id:"geosearch",position:'bottom-center'})
                }else{
                    toast.success("Location Found",{id:"geosearch",position:'bottom-center'})
                    const longitude = response?.data[0].lon
                    const latitude = response?.data[0].lat
                    mapRef.current?.flyTo({
                         center: [parseFloat(longitude), parseFloat(latitude)],
                         zoom: 15,
                         duration: 4000
                    });

                }
            },500)
            console.log(response?.data[0])


            


        }catch(err){
            toast.error("error")
        }
    }
    function handleEnter(e:any){
        if(e.key=="Enter"&& !e.repeat){
            onSearch()
        }
    }
    const handlePartyPin = async (e:MapLayerMouseEvent)=>{
        setSubmitting("MENU")
        setPin((pins)=>{
            return [...pins,{lat:e.lngLat.lat,lon:e.lngLat.lng}]
        })
        

    }

    const handleSubmit= async ()=>{
            console.log("RUN PARTY SUBMISSION LOGIC");
            setSubmitting("NOT")
    }

    const handleHostPartyClick = ()=>{
        if (submitting == "MENU"){
            handleSubmit()
            return
        }
        setSubmitting("PIN")
    }
    
  return (
    <div className='relative w-full h-screen'>
        <div className='absolute w-full flex justify-center items-center pointer-events-none h-15 z-9'>

            <div className='min-w-60 w-140 flex h-13 bg-white  border-3 rounded-4xl m-2 border-[#11F592] z-9 pl-6 overflow-hidden pointer-events-auto'>

                <input type="text" placeholder='Search' className=' placeholder:text-gray-700 placeholder:mt-1 text-xl h-full w-[80%] outline-none caret-black text-black flex justify-end' 

                onChange={(e)=>{
                    setSearch(e.target.value)
                }}
                value={search}
                onKeyDownCapture={handleEnter}
                />
                <button className=' outline-none w-[20%] h-full flex justify-end items-center'>
                    {
                        (search!="")?<Image alt='close' className='mr-2 sm:mr-7 select-none' src={'/close.svg'} width={25} onClick={()=>{
                            setSearch("")
                        }} height={25}/>:""
                    }
                    
                    <Image alt='search' width={30} height={30} src={'/search.svg'} className='select-none mr-3.5 fill-black'  onClick={onSearch}/>
                </button>

            </div>
        </div>
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 77.5775,
            latitude: 12.9629,
            zoom: 12
          }}
          style={{width: '100%', height: '100%'}}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          cursor='auto'
          attributionControl= {false}
          onClick={submitting=="PIN"? handlePartyPin : undefined}
        >
            {pins.map((pins)=>{
                if (pins.lat==0 && pins.lon == 0) return ;
                return (<Marker key={pins.lat} longitude={pins.lon} latitude={pins.lat} anchor="bottom" >
                <img src="/map.svg" className='h-10 w-10' />
                </Marker>)
            })}
        </Map>

        {/*Footer Element*/}
        
        <div className='h-14 w-full absolute z-1 bottom-0 pointer-events-none flex justify-center items-center'>
                <button className='min-w-60 w-140 z-2 h-12 transition-all duration-300 ease-in-out active:scale-[0.96] active:duration-150 bg-[#11F592] rounded-4xl pointer-events-auto cursor-pointer outline-1 outline-black mt-0.5 mb-0.5 flex justify-center items-center mr-2 ml-2 '
                onClick={handleHostPartyClick}> 
                    <h1 className=' text-white text-3xl font-sans font-medium'>
                        {submitting === "NOT" && "Host a Party"}
                        {submitting === "PIN" && "Click on the spot!"}
                        {submitting === "MENU" && "Submit"}
                    </h1>
                </button>
        </div>
    </div>  
  );
}