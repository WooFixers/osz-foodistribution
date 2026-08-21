import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Temporarily disable B2C and client account routes — 307 Temporary Redirect for SEO preservation
  if (pathname.startsWith("/particuliers") || pathname.startsWith("/compte")) {
    return NextResponse.redirect(new URL("/professionnels", request.url), 307);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin sub-routes (not the login page itself)
  const isAdminSubRoute =
    pathname.startsWith("/woofixers/") &&
    !pathname.startsWith("/woofixers/api");

  if (isAdminSubRoute && !user) {
    return NextResponse.redirect(new URL("/woofixers", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/particuliers/:path*",
    "/compte/:path*",
    "/woofixers/:path+",
  ],
};

