"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { updateProduct } from "@/services/updateProduct";
import type { Product } from "@/types/types";

interface AvailableBtnProps {
  product: Product;
}

const AvailableBtn: React.FC<AvailableBtnProps> = ({ product }) => {
  const [productavaliable, setProductAvaliable] = React.useState<
    boolean | undefined
  >(product.avaliable);

  const handleAvailable = async (): Promise<void> => {
    try {
      const response: Response = await updateProduct(product.id!, {
        ...product,
        avaliable: !productavaliable,
      });

      if (!response.ok) {
        throw new Error("Error updating product.");
      }

      setProductAvaliable(!productavaliable);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="m-auto w-16 dark:text-white"
          style={{ backgroundColor: `${productavaliable ? "green" : "red"}` }}
        >
          {productavaliable ? "SI" : "NO"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cambiar la disponibilidad?</AlertDialogTitle>
          <AlertDialogDescription>
            Está acción cambiará la disponibilidad del producto. ¿Estás seguro
            de continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleAvailable}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvailableBtn;
