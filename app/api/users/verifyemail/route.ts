import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/utils/mailer";

connectDB()

export async function POST(res:NextRequest){
    try {
        const token  = await res.nextUrl.searchParams.get('token')
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry: {$gt:Date.now()}})
        
        if (!user){
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()
        return NextResponse.json({message:"Email Verified!"},{status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}