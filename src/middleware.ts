import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest, response: NextResponse) { //eslint-disable-line
  const { nextUrl } = request;
  const requirePath = ['/api']
  const notRequirePath = ['/api/user/login/', '/api/auth/', '/api/menu/']
  const pathname = nextUrl.pathname

  if (requirePath.some((path) => pathname.startsWith(path))) {

    const token = await getToken({ req: request })


    if (pathname.startsWith("/api/auth/signin") && token) {
      const url = request.nextUrl.clone()
      url.pathname = '/'

      return NextResponse.rewrite(url)
    }
    else if (notRequirePath.some((path) => pathname.startsWith(path))) return NextResponse.next()

    const authorizationHeader = request.headers.get("Authorization");
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      console.log("masuk sini")
      const jwtToken = authorizationHeader.slice(7);
      const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
      try {
        const token = await jwtVerify(jwtToken, secretKey)

        if (!token) {
          const url = new URL(`/api/auth/signin12`, request.url);
          url.searchParams.set("callbackUrl", encodeURI(request.url));

          return NextResponse.redirect(url);
        }

        return NextResponse.next()
      } catch (error) {
        console.log(error)

        return new NextResponse("Unauthorized", { status: 401 });
      }
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  }
}
