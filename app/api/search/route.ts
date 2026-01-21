import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest) {
    const {search} = await req.json()

    const data = await axios.get(`https://geocode.maps.co/search?q=${search}&api_key=${process.env.GEOLOCATION_SEARCH}`)
    return NextResponse.json(data.data,{status:200})
    
}