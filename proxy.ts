import { NextRequest, NextResponse } from "next/server";;


export default async function middleware(request:NextRequest) {

    //auth checker
    let isLoggedIn;
    const token = request.cookies.get('token')?.value
    if (token==""){
        isLoggedIn = false 
    }else{
        isLoggedIn = true
    }
    const pathname = request.nextUrl.pathname.split('/').filter(Boolean)[0]

    if((pathname=="login" || pathname=="signup") && isLoggedIn){
        let url = request.nextUrl.clone()
        url.pathname = "/map/live"
        return NextResponse.redirect(url)
    }

    if(pathname=="signup" && !isLoggedIn){
        return NextResponse.next()
    }

    if(!(isLoggedIn) ){

        if (pathname!="login" && pathname!="signup"){
            let url = request.nextUrl.clone()
            url.pathname = "/login"
            url.searchParams.set("from","server")
            return NextResponse.redirect(url)
        }else{
            return NextResponse.next()
        }
    }
    else if(isLoggedIn){
        return NextResponse.next()
    }



    
    return NextResponse.next()  
}

export const config= {
    matcher:[
        "/map/:path*",
        "/login",
        "/signup"
    ]
}
