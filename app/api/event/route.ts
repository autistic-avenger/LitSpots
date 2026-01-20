import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Event from "@/models/eventsModel.js"





connectDB()

export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const { name,description ,eventType,duration,lat,lon} = body

        let token = req.cookies.get("token")
        let userData;
        try {
            jwt.verify(token?.value!, process.env.JWT_SECRET!)
            userData = jwt.decode(token?.value!) as any;
            var host = userData?.username
                        
        } catch (err:any) {
            const response = NextResponse.json({error:"Invalid Login Token"},{status:401}); 
            response.cookies.set("token","",{
                httpOnly:true,
                path:"/"
            })
            return response;
        }
        
        const newParty = new Event({
            name:name,
            description:description,
            host:host,
            type:eventType,
            latitude:lat,
            longitude:lon,
            timeUpto: Date.now()+duration
        })
        await newParty.save()

        return NextResponse.json({message:"Party Created!!"},{status:200})
        
    }catch(err:any){
        return NextResponse.json({error:err?.message},{status:400})
    }
}