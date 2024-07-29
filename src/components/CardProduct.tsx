"use client";
import React, { useState, useEffect } from "react";
import type { Product } from "@/types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";
import {
  addCartItem,
  updateCartItemQuantity,
  getQuantity,
  cartItems,
} from "@/cartStore";
import { useStore } from "@nanostores/react";
import type { MapStore } from "nanostores";
import type { CartItem } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { analytics } from "@/firebase/client";
import { logEvent } from "firebase/analytics";

type Cart = Record<string, CartItem>;

interface CardProductProps {
  product: Product;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const $cartItems = useStore<MapStore<Cart>>(cartItems);
  const [quantity, setQuantity] = useState<number>(getQuantity(product.id!));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuantity(getQuantity(product.id!));
  }, [$cartItems, product.id]);

  const logProductSelection = () => {
    logEvent(analytics, "product_selected", {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      quantity,
      price: product.price,
    });
  };

  const addProduct = (): void => {
    addCartItem(product);
    setQuantity(getQuantity(product.id!));
    logProductSelection();
  };

  const increaseQuantity = (): void => {
    updateCartItemQuantity(product.id!, quantity + 1);
    setQuantity(quantity + 1);
    logProductSelection();
  };

  const decreaseQuantity = (): void => {
    if (quantity > 0) {
      updateCartItemQuantity(product.id!, quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card
        key={product.id}
        className="product w-full flex flex-col justify-between h-100"
      >
        <CardHeader className="p-2 h-40">
          <img
            src={product.image}
            alt="Product"
            className="h-full w-full object-cover top-10 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setIsOpen(true)}
          />
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          {" "}
          <div className="flex justify-between items-center mb-2">
            {product.category && <Badge>{product.category}</Badge>}

            <span className="text-lg font-semibold ml-auto">
              {isNaN(Number(product.price))
                ? "Precio no disponible"
                : formatter.format(Number(product.price))}
              <span className="text-sm text-gray-600 italic">ARS</span>
            </span>
          </div>
          <h5 className="text-md font-medium mb-2">{product.name}</h5>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-2 flex-shrink-0">
          {" "}
          {quantity === 0 && (
            <Button
              variant="outline"
              onClick={addProduct}
              className="w-full dark:bg-gray-100 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Agregar
            </Button>
          )}
          {quantity > 0 && (
            <div className="flex items-center justify-center mx-auto w-full gap-4">
              <Button
                variant="outline"
                onClick={decreaseQuantity}
                className="w-[30%] dark:bg-gray-100 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white"
              >
                -
              </Button>
              <span className="mx-2 text-lg">{quantity}</span>
              <Button
                variant="outline"
                onClick={increaseQuantity}
                className="w-[30%] dark:bg-gray-100 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white"
              >
                +
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default CardProduct;
