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

type Cart = Record<string, CartItem>;

interface CardProductProps {
  product: Product;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const $cartItems = useStore<MapStore<Cart>>(cartItems);
  const [quantity, setQuantity] = useState<number>(getQuantity(product.id!));

  useEffect(() => {
    setQuantity(getQuantity(product.id!));
  }, [$cartItems, product.id]);

  const addProduct = (): void => {
    addCartItem(product);
    setQuantity(getQuantity(product.id!));
  };

  const increaseQuantity = (): void => {
    updateCartItemQuantity(product.id!, quantity + 1);
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (): void => {
    if (quantity > 0) {
      updateCartItemQuantity(product.id!, quantity - 1);
      setQuantity(quantity - 1);
    }
  };
  return (
    <Card
      key={product.id}
      className="product w-full flex flex-col justify-between h-100"
    >
      <CardHeader className="p-2 h-40">
        <img
          src={product.image}
          alt="Product"
          className="h-full w-full object-cover top-10"
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {" "}
        <div className="flex justify-between items-center mb-2">
          {product.category && <Badge>{product.category}</Badge>}

          <span className="text-lg font-semibold ml-auto">
            {formatter.format(product.price)}{" "}
            <span className="text-sm text-gray-600 italic">ARS</span>
          </span>
        </div>
        <h5 className="text-md font-medium mb-2">{product.name}</h5>
        <p className="text-sm text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="p-2 flex-shrink-0">
        {" "}
        {quantity === 0 && (
          <Button variant="outline" onClick={addProduct} className="w-full">
            Agregar
          </Button>
        )}
        {quantity > 0 && (
          <div className="flex items-center justify-center mx-auto w-full gap-4">
            <Button
              variant="outline"
              onClick={decreaseQuantity}
              className="w-[30%]"
            >
              -
            </Button>
            <span className="mx-2 text-lg">{quantity}</span>
            <Button
              variant="outline"
              onClick={increaseQuantity}
              className="w-[30%]"
            >
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
