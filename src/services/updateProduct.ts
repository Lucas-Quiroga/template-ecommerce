import { type Product } from "@/types/types";

/**
 * Actualiza un producto en el servidor.
 *
 * @param {string} id - El ID del producto a actualizar.
 * @param {Product} data - Los datos actualizados del producto.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} - Si ocurre un error al actualizar el producto.
 */
export const updateProduct = async (
  id: string,
  data: Product
): Promise<Response> => {
  const formData: FormData = new FormData();
  formData.append("name", data.name || "");
  formData.append("image", data.image || "");
  formData.append("description", data.description || "");
  formData.append("price", data.price ? data.price.toString() : "");
  formData.append("category", data.category || "");
  formData.append("avaliable", data.avaliable ? "on" : "off");

  try {
    const response: Response = await fetch(`/api/products/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating product: ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error(`Error updating product with ID: ${id}`, error);
    throw new Error("Error updating product. Please try again.");
  }
};
