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

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData: FormData = await request.formData();

  const product: Product = transformFormDataToProduct(formData);

  if (!product) {
    return new Response("Faltan datos del formulario", {
      status: 400,
    });
  }

  try {
    const db: FirebaseFirestore.Firestore = getFirestore(app);
    const productsRef: FirebaseFirestore.CollectionReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    > = db.collection("products");
    await productsRef.add({
      ...product,
      createdAt: new Date(),
    });
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }
  return redirect("/admin/dashboard");
};
