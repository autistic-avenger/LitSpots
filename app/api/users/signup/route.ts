import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel.js'
import {NextResponse,NextRequest } from 'next/server'
import bcrypt from "bcryptjs";
import { sendMail } from "@/utils/mailer";


connectDB()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {username,email,password} = reqBody
        const user = await User.findOne({email})
        
        if (user){
            if(user.isVerified){
                return NextResponse.json({error:"User Already Exists"},{status:400})
            }else{
                return NextResponse.json({message:"Please Verify Your Email and Log In"},{status:400})
            }
        }
        let salt = await bcrypt.genSalt()
        let encryptedPass = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:encryptedPass,
        })
        const savedUser = await newUser.save()

        await sendMail({email,emailType:'VERIFY' ,userId:savedUser._id})

        const userObject = savedUser.toObject();
        delete userObject.password;

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            userObject
        })
        
        
    } 
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}