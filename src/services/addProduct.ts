import { type Product } from "@/types/types";

export const addProduct = async (data: Product): Promise<Response> => {
  try {
    const formData: FormData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image ?? "");
    formData.append("description", data.description ?? "");
    formData.append("price", data.price.toString());
    formData.append(
      "avaliable",
      data.avaliable?.toString() == "true" ? "on" : "off"
    );
    formData.append("category", data.category ?? "");

    const response: Response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error adding product.");
    }

    return response;
  } catch (error) {
    throw new Error("Error adding product. Please try again.");
  }
};
