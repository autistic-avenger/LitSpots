import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import eventType from "@/types/eventType";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";


interface DBevents{
    name:string
    description:string
    eventType:eventType
    duration:number
}


connectDB()

export async function POST(req:NextRequest){
    try{
        const body:DBevents = await req.json()
        const { name,description ,eventType,duration} = body

        let token = req.cookies.get("token")
        console.log(token);

        let userData;
        try {
            userData = jwt.verify(token?.value!, process.env.JWT_SECRET!);
        } catch (err:any) {
            const response = NextResponse.json({error:"Invalid Login Token"},{status:401}); 
            response.cookies.set("token","",{
                httpOnly:true,
                path:"/"
            })
            return response;
        }
        
    
        return NextResponse.json({message:"Party Created!"},{status:200})
        
    }catch(err:any){
        return NextResponse.json({error:err?.message},{status:400})
    }
}