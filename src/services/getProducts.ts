import { app } from "@/firebase/server";
import {
  getFirestore,
  Query,
  CollectionReference,
} from "firebase-admin/firestore";
import { type Product } from "@/types/types";

/**
 * Obtiene una lista de productos de la base de datos.
 *
 * @param page - Página de resultados a obtener (opcional, por defecto es 1).
 * @param limit - Número máximo de productos a obtener por página (opcional, por defecto es 8).
 * @param showAll - Indica si se deben mostrar todos los productos, incluyendo los no disponibles (opcional, por defecto es false).
 * @returns Una promesa que se resuelve con un array de objetos de tipo Product.
 */
export async function getProducts(
  page: number = 1,
  limit: number = 8,
  showAll: boolean = false
): Promise<Product[]> {
  const db: FirebaseFirestore.Firestore = getFirestore(app);
  const productsRef: CollectionReference = db.collection("products");

  let query: Query = productsRef;
  if (!showAll) {
    query = query.where("avaliable", "==", true);
  }

  const products: Product[] = [];
  const startAt: number = (page - 1) * limit;
  const snapshot = await query.limit(limit).offset(startAt).get();

  snapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    } as Product);
  });

  return products;
}

/**
 * Obtiene los productos por categoría.
 *
 * @param category - La categoría de los productos a obtener.
 * @param page - El número de página a obtener (opcional, por defecto es 1).
 * @param limit - El límite de productos por página (opcional, por defecto es 8).
 * @param showAll - Indica si se deben mostrar todos los productos, incluyendo los no disponibles (opcional, por defecto es false).
 * @returns Una promesa que se resuelve con un array de productos.
 */
export async function getProductsByCategory(
  category: string,
  page: number = 1,
  limit: number = 8,
  showAll: boolean = false
): Promise<Product[]> {
  const db: FirebaseFirestore.Firestore = getFirestore(app);
  const productsRef: CollectionReference = db.collection("products");

  let query: Query = productsRef.where("category", "==", category);
  if (!showAll) {
    query = query.where("avaliable", "==", true);
  }

  const products: Product[] = [];
  const startAt: number = (page - 1) * limit;
  const snapshot = await query.limit(limit).offset(startAt).get();

  snapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    } as Product);
  });

  return products;
}

/**
 * Obtiene el número total de productos.
 *
 * @param showAll Indica si se deben incluir todos los productos, incluso los no disponibles. Por defecto es falso.
 * @returns Una promesa que se resuelve con el número total de productos.
 */
export async function getProductsCount(
  showAll: boolean = false
): Promise<number> {
  const db: FirebaseFirestore.Firestore = getFirestore(app);
  const productsRef: CollectionReference = db.collection("products");

  let query: Query = productsRef;
  if (!showAll) {
    query = query.where("avaliable", "==", true);
  }

  const snapshot = await query.get();
  return snapshot.size;
}

/**
 * Obtiene el número de productos por categoría.
 *
 * @param {string} category - La categoría de los productos.
 * @param {boolean} showAll - Indica si se deben mostrar todos los productos, incluyendo los no disponibles. Por defecto es falso.
 * @returns {Promise<number>} - Una promesa que se resuelve con el número de productos encontrados.
 */
export async function getProductsCountByCategory(
  category: string,
  showAll: boolean = false
): Promise<number> {
  const db: FirebaseFirestore.Firestore = getFirestore(app);
  const productsRef: CollectionReference = db.collection("products");

  let query: Query = productsRef.where("category", "==", category);
  if (!showAll) {
    query = query.where("avaliable", "==", true);
  }

  const snapshot = await query.get();
  return snapshot.size;
}
