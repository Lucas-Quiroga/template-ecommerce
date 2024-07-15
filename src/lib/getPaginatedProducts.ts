import {
  getProducts,
  getProductsByCategory,
  getProductsCount,
  getProductsCountByCategory,
} from "@/services/getProducts";
import type { PaginatedProductsResult } from "@/types/types";
import type { Product } from "@/types/types";

/**
 * Obtiene una lista paginada de productos según los parámetros de búsqueda.
 *
 * @param searchParams Los parámetros de búsqueda en forma de URLSearchParams.
 * @returns Una promesa que se resuelve en un objeto PaginatedProductsResult que contiene la lista de productos paginada, el número total de productos, la página actual, el límite de productos por página y la categoría de búsqueda.
 */
export async function getPaginatedProducts(
  searchParams: URLSearchParams,
  showAll: boolean = false
): Promise<PaginatedProductsResult> {
  const limit = 8;
  const category: string = searchParams.get("category") || "";
  const requestedPage: number = Number(searchParams.get("page")) || 1;

  try {
    const productsCount: number = category
      ? await getProductsCountByCategory(category, showAll)
      : await getProductsCount(showAll);

    const totalPages: number = Math.ceil(productsCount / limit);
    const page: number = Math.min(requestedPage, totalPages);

    const products: Product[] = category
      ? await getProductsByCategory(category, page, limit, showAll)
      : await getProducts(page, limit, showAll);

    return { products, productsCount, page, limit, category };
  } catch (error) {
    return { products: [], productsCount: 0, page: 1, limit, category };
  }
}
