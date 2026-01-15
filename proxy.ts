import { NextRequest, NextResponse } from "next/server";;


export default async function middleware(request:NextRequest) {

    //auth checker
    const isLoggedIn = request.cookies.get('token')?.value

    if(!(isLoggedIn) ){
        let url = request.nextUrl.clone()
        url.pathname = "/login"
        url.searchParams.set("from","server")

        return NextResponse.redirect(url)
    }
    else if(isLoggedIn){
        return NextResponse.next()
    }
    
    return NextResponse.next()  
}

export const config= {
    matcher:[
        '/map/live'
    ]
}
