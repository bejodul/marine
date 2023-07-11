import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const notRequirePath = ['/api/auth']

  const pathname = nextUrl.pathname

  return NextResponse.next()

  // if (notRequirePath.some((path) => pathname.startsWith(path))) {
  //   return NextResponse.next();
  // } else {

  //   const checkTokenFrontend = process.env.CHECK_TOKEN_FRONTEND
  //   let token

  //   if (checkTokenFrontend === "false") {
  //     token = await getToken({ req: request });
  //   } else {
  //     const authorizationHeader = request.headers.get("Authorization");
  //     if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
  //       const jwtToken = authorizationHeader.slice(7);
  //       const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)

  //       try {
  //         token = await jwtVerify(jwtToken, secretKey)

  //         return NextResponse.next()
  //       } catch (error) {
  //         console.log(error)

  //         return new NextResponse("Unauthorized", { status: 401 });
  //       }
  //     } else {
  //       return new NextResponse("Bad Request", { status: 400 });
  //     }
  //   }

  //   if (!token) {
  //     const url = new URL(`/api/auth/signin`, request.url);
  //     url.searchParams.set("callbackUrl", encodeURI(request.url));

  //     return NextResponse.redirect(url);
  //   }

  // }
}
