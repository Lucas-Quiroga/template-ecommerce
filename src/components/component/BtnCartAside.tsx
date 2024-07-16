import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { cartItems } from "@/cartStore";
import { FaCartShopping } from "react-icons/fa6";
import { formatter } from "@/lib/utils";
import { removeCartItem } from "@/cartStore";
import { getTotalQuantity, clearCart, getTotalPrice } from "@/cartStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { CartItem } from "@/types/types";
import { API_URL, PHONE_NUMBER } from "@/constants/const";
import { DATA_TIENDA } from "@/constants/const";
import type { MapStore } from "nanostores";

type Cart = Record<string, CartItem>;

const CartButtonAside = (): JSX.Element => {
  const $cartItems = useStore<MapStore<Cart>>(cartItems);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    setTotalQuantity(getTotalQuantity());
  }, [$cartItems]);

  const getItemsCart = (): CartItem[] => {
    return Object.values($cartItems).filter((item) => item.quantity > 0);
  };

  const sendMessageWhatsApp = (): void => {
    const items: CartItem[] = getItemsCart();
    // Formatea cada ítem del carrito
    const messageItems: string = items
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ${formatter.format(
            item.quantity * item.price
          )} ARS`
      )
      .join("\n");

    // Calcula el total del carrito
    const total: string = formatter.format(
      items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );

    // Construye el mensaje de WhatsApp
    const message: string = `¡Hola! Te paso el resumen de mi pedido ☺ \n
    ${messageItems}
    ----------------
    Total: ${total} ARS
    Espero tu respuesta para confirmar mi pedido`;

    // Codifica y construye la URL de WhatsApp
    const url: string = `${DATA_TIENDA.contact.whatsappUrl}?phone=${
      DATA_TIENDA.contact.phone
    }&text=${encodeURIComponent(message)}`;

    // Abre la URL en una nueva pestaña
    window.open(url, "_blank");

    // Limpia el carrito
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <FaCartShopping className="dark:text-white" />
          {totalQuantity > 0 && (
            <span className="text-black ml-2 dark:text-white">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>PRODUCTOS</SheetTitle>
          <SheetDescription className="text-lg">
            {totalQuantity} {totalQuantity === 1 ? "producto" : "productos"} en
            tu carrito
          </SheetDescription>
        </SheetHeader>
        {Object.values($cartItems).length === 0 && (
          <p>¡Tu carrito está vacío!</p>
        )}
        <ul className="flex flex-col gap-y-4 overflow-y-auto flex-grow">
          {Object.values($cartItems as Cart).map((item: CartItem) =>
            item.quantity === 0 ? null : (
              <li key={item.id} className="flex gap-3">
                {/* <div className="hidden sm:flex">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[100px] h-[80px] object-cover rounded-md"
                  />
                </div> */}
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-center ">
                    <p className="text-gray-400 text-sm sm:text-base">Nombre</p>
                    <p className="text-sm dark:text-white">{item.name}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm sm:text-base">
                      Cantidad
                    </p>
                    <p className="dark:text-white">
                      <span className="text-sm text-gray-500 dark:text-white">
                        x
                      </span>{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm sm:text-base">Precio</p>
                    <p className="dark:text-white">
                      {formatter.format(item.quantity * item.price)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size={"sm"}
                  onClick={() => removeCartItem(item.id)}
                >
                  <RiDeleteBin6Line size={20} />
                </Button>
              </li>
            )
          )}
        </ul>

        <SheetFooter
          className="mt-auto "
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            {totalQuantity > 0 && (
              <div className="flex flex-col gap-y-2 ">
                <div className="border border-gray-300 p-2 rounded-md flex justify-between bg-gray-50">
                  <p className="text-md font-medium">Total:</p>
                  <p className="text-md font-medium">
                    {formatter.format(getTotalPrice())}
                  </p>
                </div>
                <Button
                  onClick={sendMessageWhatsApp}
                  className="dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Finalizar compra
                </Button>
              </div>
            )}
          </div>
          <SheetClose className="mt-2">
            <Button variant="outline" className="m-0 dark:text-white">
              Cerrar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartButtonAside;
