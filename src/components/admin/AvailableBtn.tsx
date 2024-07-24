"use client";
import React, { useState, useCallback, useMemo } from "react";
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
  const [productAvailable, setProductAvailable] = useState<boolean>(
    product.avaliable ?? false
  );

  const handleAvailable = useCallback(async (): Promise<void> => {
    try {
      const response = await updateProduct(product.id!, {
        ...product,
        avaliable: !productAvailable,
      });

      if (!response.ok) {
        throw new Error("Error updating product.");
      }

      setProductAvailable(!productAvailable);
    } catch (error) {
      console.error("Error updating product", error);
      // Aquí puedes agregar una notificación de error al usuario si lo deseas
    }
  }, [product, productAvailable]);

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: productAvailable ? "green" : "red",
    }),
    [productAvailable]
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="m-auto w-16 dark:text-white" style={buttonStyle}>
          {productAvailable ? "SI" : "NO"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cambiar la disponibilidad?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción cambiará la disponibilidad del producto. ¿Estás seguro
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
