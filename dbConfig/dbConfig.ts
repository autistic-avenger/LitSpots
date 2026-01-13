import mongoose from "mongoose";
export async function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection  = mongoose.connection

        connection.on("connected",()=>{
            console.log("MongoDB Connected!");
        })
        connection.on("error",(err)=>{
            console.log("Mongodb connection error!");
            console.log(err);
            process.exit(1)
        })
    }catch(error){
        console.log("Something Went Wrong When Connecting to DB")
        console.log(error);
    }
}