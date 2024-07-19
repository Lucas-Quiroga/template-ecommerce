import type { APIRoute } from "astro";
import { Auth, getAuth } from "firebase-admin/auth";
import { app } from "@/firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth: Auth = getAuth(app);
  /* Obtener los datos del formulario */
  const formData: FormData = await request.formData();
  const email: string | undefined = formData.get("email")?.toString();
  const password: string | undefined = formData.get("password")?.toString();
  const name: string | undefined = formData.get("name")?.toString();

  if (!email || !password || !name) {
    return new Response("Faltan datos del formulario", { status: 400 });
  }

  /* Crear un usuario */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: any) {
    return new Response("Algo salió mal", { status: 400 });
  }
  return new Response(JSON.stringify({ url: "/admin/signin" }), {
    status: 200,
  });
};
