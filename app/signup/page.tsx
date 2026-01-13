'use client'
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

interface User{
    username:string,
    email:string,
    password:string
}

export default function SignupPage() {
    const router = useRouter()
    const [user,setUser] = useState<User>({
        username:"",
        email:"",
        password:""
        
    })

    const [loading,setLoading] = useState<boolean>(false)
    const [buttonDisabled,setButtonDisabled] = useState<boolean>(true)

    const onSignup = async ()=>{
        try {
            setLoading(true)
            const response  = await axios.post("/api/users/signup",user)
            toast.success("Please Verify Your Email!")
            setLoading(false)

            setTimeout(()=>{
                router.push("/login")

            },500)
            
        } catch (error:any) {
            toast.error(error.message)
        }
    }
  return (
    <div>
      
    </div>
  )
}


