"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import type { Product } from "@/types/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/productSchema";
import { uploadImage } from "@/firebase/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DATA_TIENDA } from "@/constants/const";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { Spinner } from "@/components/ui/spinner";

interface EditProductProps {
  product: Product;
}

const EditProduct: React.FC<EditProductProps> = ({ product }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { execute, isLoading } = useFetch<Product>();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product,
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    Object.entries(product).forEach(([key, value]) => {
      setValue(key as keyof Product, value);
    });
  }, [product, setValue]);

  const onSubmit = useCallback(
    async (data: Product) => {
      try {
        if (file) {
          data.image = await uploadImage(file);
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "avaliable") {
            formData.append(key, value ? "on" : "off");
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });

        const result = await execute(`/api/products/${product.id}`, {
          method: "POST",
          body: formData,
        });

        if (result?.data.error) {
          throw new Error(
            result.data.error.message || "Error updating product"
          );
        }

        if (result?.data) {
          setSuccess(result.data.message);
          result.data.redirectUrl &&
            window.location.replace(result.data.redirectUrl);
        }
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error
            ? error.message
            : "Error al actualizar el producto"
        );
      }
    },
    [execute, file, product.id]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.files && setFile(e.target.files[0]);
    },
    []
  );

  const renderField = useCallback(
    (label: string, id: keyof Product, component: React.ReactNode) => (
      <div className="grid gap-2">
        <Label htmlFor={id} className="dark:text-white">
          {label}
        </Label>
        {component}
        {errors[id] && (
          <span className="text-red-500">{errors[id]?.message}</span>
        )}
      </div>
    ),
    [errors]
  );

  const categories = useMemo(() => DATA_TIENDA.categories, []);

  return (
    <section className="flex flex-col gap-6 p-4 md:p-6 justify-center items-center h-[100vh]">
      <h1 className="text-2xl font-bold dark:text-white">
        Actualizar Producto
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center max-w-md m-0 p-0 gap-4"
      >
        {success && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4"
            role="alert"
          >
            <p className="font-bold">Producto actualizado exitosamente</p>
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4"
            role="alert"
          >
            <p className="font-bold">Error al actualizar el producto</p>
            <p>{error}</p>
          </div>
        )}
        {renderField(
          "Nombre",
          "name",
          <Input
            id="name"
            type="text"
            placeholder="Ingresa el nombre del producto"
            {...register("name")}
            className="dark:text-white"
          />
        )}
        {renderField(
          "Imagen Actual",
          "image",
          <img
            src={product.image}
            alt="product"
            className="w-1/2 object-contain mx-auto dark:text-white"
          />
        )}
        {renderField(
          "Cambiar imagen",
          "image",
          <Input
            type="file"
            onChange={handleFileChange}
            className="dark:text-white"
          />
        )}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="product"
            className="w-1/2 object-contain mx-auto dark:text-white"
          />
        )}
        {renderField(
          "Descripción",
          "description",
          <Textarea
            id="description"
            placeholder="Ingresa la descripción del producto"
            {...register("description")}
            maxLength={210}
            className="dark:text-white"
          />
        )}
        {renderField(
          "Precio",
          "price",
          <Input
            id="price"
            type="number"
            placeholder="Ingresa el precio del producto"
            {...register("price")}
            className="dark:text-white"
          />
        )}
        {renderField(
          "Disponible",
          "avaliable",
          <Controller
            name="avaliable"
            control={control}
            defaultValue={product.avaliable}
            render={({ field }) => (
              <Checkbox
                id="avaliable"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            )}
          />
        )}
        {renderField(
          "Categoría",
          "category",
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full dark:text-white">
                  <SelectValue placeholder="Selecciona la categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorías</SelectLabel>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        )}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner size="medium" /> : "Actualizar Producto"}
        </Button>
      </form>
    </section>
  );
};

export default EditProduct;
