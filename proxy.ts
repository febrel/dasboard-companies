import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Definimos qué rutas son públicas (no requieren inicio de sesión)
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Si la ruta NO es pública, obligamos a que se autentique
  if (!isPublicRoute(req)) {
    const authObject = await auth();

    if (!authObject.userId) {
      return authObject.redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: [
    // Ignorar archivos estáticos y rutas internas de Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Ejecutar siempre para rutas de API
    "/(api|trpc)(.*)",
    // Ejecutar siempre para las rutas internas de Clerk
    "/__clerk/(.*)",
  ],
};
