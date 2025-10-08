import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/protected')) {
    middlewareHandle();
  }
}

function middlewareHandle(){

}

   