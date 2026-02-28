import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

  // Protect customer account sub-routes (except connexion)
  const isProtectedCompte =
    pathname.startsWith("/compte/profil") ||
    pathname.startsWith("/compte/commandes");

  if (isProtectedCompte && !user) {
    return NextResponse.redirect(new URL("/compte/connexion", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/woofixers/:path+",
    "/compte/profil/:path*",
    "/compte/commandes/:path*",
  ],
};
