import mongoose from "mongoose";
export async function connectDB(){
    try{
        mongoose.connect(process.env.MONGOURI!)
        const connection  = mongoose.connection

        connection.on("connected",()=>{
            console.log("MongoDB Connected!");
            process.exit(1)
        })
        connection.on("error",(err)=>{
            console.log("Mongodb connection error!");
            console.log(err);
        })
    }catch(error){
        console.log("Something Went Wrong When Connecting to DB")
        console.log(error);
    }
}