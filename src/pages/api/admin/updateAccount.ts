import type { APIRoute } from "astro";
import { Auth, getAuth } from "firebase-admin/auth";
import { app } from "@/firebase/server";

// actualizamos la cuenta de un admin
export const POST: APIRoute = async ({ request }) => {
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
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    /* Obtener los datos del cuerpo JSON */
    const data = await request.json();
    const { currentPassword, newPassword, repeatNewPassword, name } = data;

    /* Actualizar la contraseña si se proporciona */
    if (newPassword) {
      try {
        await auth.updateUser(uid, {
          password: newPassword,
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Error al actualizar la contraseña" }),
          {
            status: 400,
          }
        );
      }
    }

    /* Actualizar el nombre si se proporciona */
    if (name) {
      try {
        await auth.updateUser(uid, {
          displayName: name,
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Error al actualizar el nombre" }),
          {
            status: 400,
          }
        );
      }
    }

    return new Response(JSON.stringify({ message: "Cuenta actualizada" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 401,
    });
  }
};
