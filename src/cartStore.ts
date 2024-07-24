import { map, type MapStore } from "nanostores";
import type { Product } from "@/types/types";
import { LOCAL_STORAGE_KEY } from "./constants/const";
import type { CartItem } from "@/types/types";

export type Cart = Record<string, CartItem>;

/**
 *   Guarda el carrito en el local storage
 *  * @param cart  - El carrito a guardar
 */
export const saveCartToLocalStorage = (cart: Cart): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }
};

/**
 * Obtiene el carrito del local storage
 * @returns El carrito guardado en el local storage
 */
export const loadCartFromLocalStorage = (): Cart => {
  if (typeof window !== "undefined") {
    const storedCart: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : {};
  }
  return {};
};

// inicializa el carrito con los productos guardados en el local storage
export const cartItems: MapStore<Cart> = map(loadCartFromLocalStorage());

// suscribe el carrito al local storage para que se actualice automaticamente
cartItems.subscribe((cart: Cart) => saveCartToLocalStorage(cart));

/**
 * Agrega un producto al carrito
 * @param product - El producto a añadir al carrito
 */
export function addCartItem(product: Product): void {
  if (product.id === undefined) {
    console.error("Intento de añadir un producto sin ID al carrito");
    return;
  }

  const { id, name, image, price } = product;
  const imageUrl: string = image ?? "";
  const numericPrice: number =
    typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    console.error(`Precio inválido para el producto ${id}: ${price}`);
    return;
  }

  const existingEntry: CartItem = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(id, {
      id,
      name,
      image: imageUrl,
      price: numericPrice,
      quantity: 1,
    });
  }
}

/**
 * Elimina o reduce la cantidad de un producto del carrito
 * @param id - El ID del producto a eliminar o reducir
 */
export function removeCartItem(id: string): void {
  const item: CartItem = cartItems.get()[id];
  if (!item) return;
  if (item.quantity > 1) {
    updateCartItemQuantity(id, item.quantity - 1);
  } else {
    const cartItemsCopy: {
      [x: string]: CartItem;
    } = { ...cartItems.get() };
    delete cartItemsCopy[id];
    cartItems.set(cartItemsCopy);
  }
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param id - El ID del producto a actualizar
 * @param quantity - La nueva cantidad del producto
 */
export function updateCartItemQuantity(id: string, quantity: number): void {
  const cartItemsCopy = { ...cartItems.get() };
  cartItemsCopy[id].quantity = quantity;
  cartItems.set(cartItemsCopy);
}

/**
 * Obtiene la cantidad de un producto en el carrito
 * @param id - El ID del producto
 * @returns La cantidad del producto en el carrito
 */
export function getQuantity(id: string): number {
  const item: CartItem = cartItems.get()[id];
  return item ? item.quantity : 0;
}

/**
 * Suma la cantidad de productos en el carrito
 * @returns La cantidad total de productos en el carrito
 */
export function getTotalQuantity(): number {
  return Object.values(cartItems.get()).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
}

/**
 * Obtiene el precio total de los productos en el carrito
 * @returns El precio total de los productos en el carrito
 */
export function getTotalPrice(): number {
  return Object.values(cartItems.get()).reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
}

/**
 * Limpia el carrito
 */
export function clearCart(): void {
  cartItems.set({});
}
