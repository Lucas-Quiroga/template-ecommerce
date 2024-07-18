import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getAuth } from "firebase-admin/auth";
import type { Auth } from "firebase-admin/auth";

export const GET: APIRoute = async ({ request, cookies }) => {
  const auth: Auth = getAuth(app);

  /* Obtener el token de las cabeceras de la solicitud */
  const idToken: string | undefined = request.headers
    .get("Authorization")
    ?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(JSON.stringify({ error: "Token no encontrado" }), {
      status: 401,
    });
  }

  /* Verificar la id del token */
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Token invalido" }), {
      status: 401,
    });
  }

  /* Crear y establecer una cookie de sesión */
  const fiveDays: number = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie: string = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set("__session", sessionCookie, {
    path: "/",
  });

  return new Response(JSON.stringify({ url: "/admin/dashboard" }), {
    status: 200,
  });
};
