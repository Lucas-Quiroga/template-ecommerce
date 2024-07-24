import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db: FirebaseFirestore.Firestore = getFirestore(app);
const productsRef: FirebaseFirestore.CollectionReference<
  FirebaseFirestore.DocumentData,
  FirebaseFirestore.DocumentData
> = db.collection("products");

// Actualizar producto

export const POST: APIRoute = async ({ params, request }) => {
  const formData: FormData = await request.formData();
  const name: string = formData.get("name")?.toString() || "";
  const image: string = formData.get("image")?.toString() || "";
  const description: string = formData.get("description")?.toString() || "";
  const price: number = Number(formData.get("price")) || 0;
  const category: string = formData.get("category")?.toString() || "";
  const avaliable: boolean = formData.get("avaliable") === "on";

  if (!params.id) {
    return new Response(
      JSON.stringify({ error: "No se puede encontrar el producto" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    await productsRef.doc(params.id).update({
      name,
      image,
      description,
      price,
      category,
      avaliable,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Producto actualizado exitosamente",
        redirectUrl: "/admin/dashboard",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Algo salió mal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// Eliminar producto
export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("No se puede encontrar el producto", {
      status: 404,
    });
  }

  try {
    await productsRef.doc(params.id).delete();
    return redirect("/admin/dashboard");
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }
};
