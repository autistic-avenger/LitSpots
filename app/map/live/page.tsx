"use client"
import {useState,useRef} from 'react';
import {Map, Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Image from 'next/image';
import { MapRef } from 'react-map-gl/maplibre';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapLayerMouseEvent, MapMouseEvent } from 'maplibre-gl';

type eventType = "Food"|"Study"|"Music"|"Sutta"|"General"|"Gaming"

const arrayOfEvents:eventType[] = ["Food","Study","Music","Sutta","General","Gaming"]

interface FormData{
    name:string
    description:string
    eventType:eventType

}

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
    const [isOpen,setMenu] = useState<boolean>(false)
    const [mapEnabled,setMapEnabled]  = useState<boolean>(true)
    const [dropDownActive,setDropDownActive] = useState<boolean>(false)
    const [formData,setFormData] = useState<FormData>({name:"",description:"",eventType:"General"})
    const [durationHours,setDurationHours] = useState<any>("")
    const [durationMins,setDurationMins] = useState<any>("")


    
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
        setMenu(true)
        setMapEnabled(false)
        setPin((pins)=>{
            return [...pins,{lat:e.lngLat.lat,lon:e.lngLat.lng}]
        })
        mapRef.current?.flyTo({
            center:[e.lngLat.lng,e.lngLat.lat-0.0046],
            zoom:15,
            duration:500
        })
        
        

    }

    const handleSubmit= async ()=>{
            if (formData.name==""){
                toast.error("Party name can't be empty!",{duration:900})
                return
            }
            if(formData.description==""){
                toast.error("Description can't be empty!",{duration:900})
                return
            }
            let durationInMs = (3600000*durationHours) + (60000*durationMins)
            if (durationInMs == 0){
                durationInMs = 1800000
            }
            let payload = {...formData,duration:durationInMs}

            try {
                // const response = await axios.get("/") 
                setSubmitting("NOT")
                setMenu(false)
                setMapEnabled(true)
                setFormData({name:"",description:"",eventType:"General"})
                setDurationHours("")
                setDurationMins("")
            } catch (error:any) {
                toast.error(error.response.data.error)
                setSubmitting("NOT")
                setMenu(false)
                setMapEnabled(true)
                setFormData({name:"",description:"",eventType:"General"})
                setDurationHours("")
                setDurationMins("")
            }

            


            
            
            
    }

    const handleHostPartyClick = ()=>{
        if (submitting == "MENU"){
            handleSubmit()
            return
        }
        setSubmitting("PIN")
    }
    
  return (
    <div className='relative w-full h-screen overflow-hidden'>
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
          dragPan = {mapEnabled}
          boxZoom = {mapEnabled}
          scrollZoom ={mapEnabled}
        >
            {pins.map((pins)=>{
                if (pins.lat==0 && pins.lon == 0) return ;
                return (<Marker key={pins.lat} longitude={pins.lon} latitude={pins.lat} anchor="bottom" >
                <img src="/map.svg"  className='h-10 cursor-pointer w-10' />
                </Marker>)
            })}
        </Map>

        {/*Footer Elementsss*/}
        
        <div className='h-14 w-full absolute z-1 bottom-0 pointer-events-none flex justify-center items-center'>

            <div className="absolute bottom-0 overflow left-0 right-0 flex justify-center  ">
                <div className={`
                    min-w-60 w-full max-w-140 ml-2 mr-2 h-120 mb-9 transition-all duration-500 ease-in-out rounded-t-3xl pointer-events-auto 
                    ${isOpen? "bg-[#11F592]/40 backdrop-blur-[1px] translate-y-2 border border-black": "translate-y-full opacity-65 "
                }`}>
                    <div className='h-16 w-full pr-3 pl-3'>
                        <input type="text" placeholder='Party name' className={`relative h-16 mt-6 pl-4 rounded-2xl outline-2 outline-black  w-full bg-white text-xl text-gray-800 
                        ${isOpen?"":"hidden"}
                        ` }
                        onChange={(e)=>{
                            setFormData((Data)=>{
                                return {...Data,name:e.target.value}
                            })
                        }}
                        value={formData.name}
                        />
                    </div>
                    
                    <div className='h-42 mt-12  w-full pr-3 mb-3 pl-3'>
                        <textarea name="description" placeholder='Description' 
                        className={`bg-white w-full h-full rounded-2xl pr-3 pl-3 pt-2 pb-1 outline-2 outline-black text-xl text-gray-800 resize-none
                        ${isOpen?"":"hidden"}
                        `}
                        onChange={(e)=>{
                            setFormData((Data)=>{
                                return {...Data,description:e.target.value}
                            })
                        }}
                        value={formData.description}
                        >
                        </textarea>
                    </div>

                    <div className='relative h-15 w-full pr-3 pl-3'>
                        <div className={`w-full flex justify-center select-none items-center h-16 rounded-xl  border-2 border-black bg-white text-black text-2xl z-99
                        ${isOpen?"":"hidden"}
                        `}
                            onClick={()=>{
                                setDropDownActive(!dropDownActive)
                            }}

                            >
                            <h1>Party Type</h1>
                            <Image alt='dropdown' src='/dropdown_Arrow.svg' width={25} height={25}
                            className={`ml-2 transition-transform ${dropDownActive==true?"rotate-0":"rotate-180"}`}/>
                        </div>

                
                    <div className='relative h-15 w-full pr-3 pl-3'>  
                              
                        <div className={`absolute rounded-t-xl border-l-2 border-r-2 border-t-2 border-black bottom-[190%] w-full left-0 p-2 space-y-2 bg-white transition-transform duration-700 ${dropDownActive?"":"hidden"}`}>



                            {arrayOfEvents.map((event)=>{
                                return  <div key={event}
                                        className={`relative h-16 w-full rounded-xl flex items-center justify-center text-2xl cursor-pointer font-bold text-white bg-cover bg-center overflow-hidden`}
                                        style={{ backgroundImage: `url(/${event}.png)` }}
                                        onClick={()=>{
                                            setFormData((Data)=>{
                                                return {...Data,eventType:event}
                                            })
                                            setDropDownActive(false)
                                        }}
                                        >
                                            <div className="absolute w-full h-full bg-black/50 cursor-pointer" /> 
                                            <span className="relative z-10 select-none">
                                                {event}
                                            </span>
                                        </div>
                            })}

                        </div>
                    </div>
                    </div>
                    
                    <div className='relative h-16 px-3'>
                        <div className='relative flex flex-row border-2 justify-start items-center h-full w-full bg-white mt-5 rounded-xl text-black text-xl'>
                            <div className='relative pl-5'>
                                <h1>Duration :</h1>
                            </div>


                            <div className='relative'>
                                <input min={0} max={24} type="number" name="hours" id="hours" className='h-10 w-12  select-none text-center ml-8 mr-5 bg-gray-300 p-2' placeholder='hr' 
                                value={durationHours}
                                onChange={(E)=>{
                                    setDurationHours(Number(E.target.value))
                                }}
                                />
                            </div>
                            
                            <div>
                                <h1>Hours</h1>        
                            </div>
                            
                            <div className='relative'>
                                <input min={0} max={60} type="number" name="hours" id="hours" className='h-10 w-12  select-none text-center ml-5 mr-5 bg-gray-300 p-2' placeholder='min' 
                                value={durationMins}
                                onChange={(E)=>{
                                    setDurationMins(Number(E.target.value))
                                }}
                                />
                            </div>
                            <div>
                                <h1>Minutes</h1>        
                            </div>

                        </div>
                    </div>




                </div>
            </div>
                

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