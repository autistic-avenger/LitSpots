'use client'
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Roboto } from "next/font/google"
import Link from "next/link"


const roboto = Roboto({
    subsets:['latin'],
    weight:'800'
})
interface User{
    username:string,
    password:string
}




export default function LoginPage() {

      const router = useRouter()
    
    const [user,setUser] = useState<User>({
        username:"",
        password:""
        
    })
    const [loading,setLoading] = useState<boolean>(false)
    const [ShowPassword,setShowPassword] = useState<boolean>(false)
    const [lastSubmit, setLastSubmit] = useState<number>(0)


    
    const onLogin = async ()=>{
        let timeElapsed = (Date.now()-lastSubmit)
        //ADD THROTTLING TO SAVE DB FROM GETTING FUCKED :)
        if(timeElapsed>2000){
            setLastSubmit(Date.now())
            try {
                if(user.username ==""){
                    toast.error("Username is required!")
                }else if(user.password==""){
                    toast.error("Password is required!")
                }else{
                    setLoading(true)
                    await axios.post("/api/users/login",user)
                    toast.success("Successfully logged in!")  

                    setTimeout(()=>{
                        router.push("/map/live")
                    },1500)
                    
                }
            }catch (err:any) {
              toast.error(err.response?.data?.error || "Something went wrong")

              if (err.response?.data?.error == "Username not Found!"){
                setUser((user)=>{
                return {...user,username:""}
                })
              }else if((err.response?.data?.error == "Password incorrect!")){
                setUser((user)=>{
                  return {...user,password:""}
                })
              }else{
                setUser((user)=>{
                  return {username:"",password:""}
                })
              }
            }finally{

              setLoading(false)
            }
        }
    }


  return (
    <div className="h-screen w-full flex justify-center items-center">
        <div className="h-130 w-100 rounded-2xl bg-[#131d13] flex flex-col items-center shadow-green-500 shadow-[0px_0px_12px_rgba(0,0,0,0.25)]">
            <div className="font-bold h-25 w-full  flex justify-center items-center text-5xl mt-6">
                <h1 className="bg-linear-to-r from-[#52eeaa] via-[#35e90d] to-[#42f307] inline-block text-transparent bg-clip-text p-1">Login</h1>
            </div>


            <input 
                className="h-20 w-[80%]  rounded-[5px] focus:outline-0 border-b border-[#35e90d] pt-10 text-xl placeholder-white palceholder select-none" 
                id="username" 
                type="text"  
                value={user.username}
                placeholder="Username"
                autoComplete="off"
                onChange={(e)=>{
                    setUser((user)=>{
                        return {...user,username:e.target.value}
                    })
                }}
                />

            <div className="relative h-20 w-full flex justify-center">
                <button
                    type="button"
                    onClick={()=> setShowPassword(!ShowPassword)}
                    className=" absolute top-12 right-10 flex items-center cursor-pointer">
                    <img
                    alt="eyeIcon"
                    src={ShowPassword ? "/eye.svg" : "/eye-off.svg"}
                    width={25}
                    height={30}
                    />
                </button>

                <input 
                    className="h-20 w-[80%] rounded-[5px] focus:outline-0 border-b border-[#35e90d] pt-10 text-xl placeholder-white palceholder " 
                    id="password" 
                    type={ShowPassword?"text":"password"}  
                    placeholder="Password"
                    autoComplete="off"
                    value={user.password}
                    onChange={(e)=>{
                    setUser((user)=>{
                        return {...user,password:e.target.value}
                    })
                }}/>
            </div>

            <div className="w-full h-20 mt-13 justify-center flex items-center ">
                    <button 
                    onClick={onLogin} className={`border w-[83%] h-[80%] rounded-2xl text-3xl ${roboto.className} text-shadow-2xs shadow-black cursor-pointer active:scale-[99%] border-white antialiased flex justify-center items-center ${loading?"opacity-20 scale-[98%] bg-green-950 pointer-events-none":"bg-green-400"}`}>
                        {loading?<Image alt="loader" className="animate-spin" width={50} height={50} src="/loading.svg" />:"SUBMIT"}
                    </button>
            </div>


            <div className="mt-2">
                <p>Don't have an account?  
                    <Link className="text-green-400" href="/signup"> Signup</Link>
                </p>
            </div>

        </div>
    </div>
  )
}
