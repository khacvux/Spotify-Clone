import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    // Token will exsit if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl

    // Allow the requests if the following is true...
    //   1__ its a request for next-auth session & provider fetching
    //   2__ the token exists

    if (pathname.includes('/api/auth') || token){
        return NextResponse.next();
    }

    // Redirect them to login if they dont have token AND are requesting a protexted route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login')
    }
    

}