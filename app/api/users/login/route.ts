import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel.js'
import bcrypt from "bcryptjs";
import {NextResponse,NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'



connectDB()

export async function POST(req:NextRequest){
    try{

        const BODY = await req.json()
        const {username,password} = BODY
        
        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({error:"Username not Found!"},{status:400})

        }
        console.log("USER EXISTS!");

        const validPass = await bcrypt.compare(password,user.password)
        if (!validPass){
            return NextResponse.json({error:"Password incorrect!"},{status:400})
        }

        const tokenData = {
            id:user._id,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!,{expiresIn: '15d'})

        const response  = NextResponse.json({
            message:"Logged In Success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response




    }catch{
        return NextResponse.json({error:"FAILED TO LOGIN !"},{status:400})
    }

}