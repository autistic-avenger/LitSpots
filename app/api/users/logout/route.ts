import { connectDB } from "@/dbConfig/dbConfig";
import {NextResponse,NextRequest } from 'next/server'




connectDB()
export async function GET(req:NextRequest){
    try {
        const response = NextResponse.json({
            message:"Logout Successfully",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)

        })


        
    } catch (error) {
        return NextResponse.json({error:"FAILED TO LOGOUT !"},{status:400})
    }
}