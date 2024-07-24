import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { type Product } from "@/types/types";

function transformFormDataToProduct(formData: FormData): Product {
  const name: string = formData.get("name")?.toString() ?? "";
  const image: string = formData.get("image")?.toString() ?? "";
  const description: string | undefined = formData
    .get("description")
    ?.toString();
  const price: number = Number(formData.get("price"));
  const avaliable: boolean = formData.get("avaliable") === "on";
  const category: string = formData.get("category")?.toString() ?? "";

  return { name, image, description, price, avaliable, category };
}

export const POST: APIRoute = async ({ request }) => {
  const formData: FormData = await request.formData();

  const product: Product = transformFormDataToProduct(formData);

  if (!product) {
    return new Response(
      JSON.stringify({ error: "Faltan datos del formulario" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const db: FirebaseFirestore.Firestore = getFirestore(app);
    const productsRef: FirebaseFirestore.CollectionReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    > = db.collection("products");
    const docRef = await productsRef.add({
      ...product,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Algo salió mal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
