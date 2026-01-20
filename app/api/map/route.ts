import Event from "@/models/eventsModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";

let cachedData:any = null;
let lastFetch = 0;
const duration = 6 * 1000; 

export async function GET() {
  
  if (!cachedData || Date.now() - lastFetch > duration) {
    connectDB()
    cachedData = await Event.find();
    lastFetch = Date.now();
  }

  return NextResponse.json(cachedData, { status: 200 });
}