"use client";
import React, { useEffect } from "react";
import type { Product } from "@/types/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/productSchema";
import { updateProduct } from "@/services/updateProduct";
import type { SubmitHandler } from "react-hook-form";
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

interface EditProductProps {
  product: Product;
}

const EditProduct: React.FC<EditProductProps> = ({ product }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);

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
    // Set default values after Astro has rendered in the client
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("image", product.image);
    setValue("price", product.price);
    setValue("avaliable", product.avaliable);
    setValue("category", product.category);
  }, [product, setValue]);

  const onSubmit: SubmitHandler<Product> = async (data: Product) => {
    try {
      let imageUrl: string = "";
      if (file) {
        imageUrl = await uploadImage(file);
        data.image = imageUrl;
      }

      const response: Response = await updateProduct(product.id!, data);
      if (!response.ok) {
        throw new Error("Error updating product.");
      }
      setSuccess("Producto actualizado exitoso");
      response.redirected && window.location.replace(response.url);
    } catch (error) {
      console.error(error);
      setError("Error al actualizar el producto");
    }
  };

  return (
    <section className="flex flex-col gap-6 p-4 md:p-6 justify-center items-center h-[100vh]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Actualizar Producto</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center max-w-md m-0 p-0 gap-4"
      >
        {success && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4"
            role="alert"
          >
            <p className="font-bold">Producto actualizado exitoso</p>
            <p>¡El producto se actualizó correctamente!</p>
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
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            placeholder="Ingresa el nombre del producto"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Imagen Actual</Label>
          <img
            src={product.image}
            alt="product"
            className="w-1/2 object-contain mx-auto"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Cambiar imagen</Label>
          <Input type="file" onChange={(e) => setFile(e.target.files![0])} />

          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="product"
              className="w-1/2 object-contain mx-auto"
            />
          )}
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Descripción</Label>
          <Input
            id="description"
            type="text"
            placeholder="Ingresa la descripción del producto"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            type="price"
            placeholder="Ingresa el precio del producto"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="avaliable">Disponible</Label>
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
        </div>

        <Controller
          name="category"
          control={control}
          defaultValue={product.category}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona la categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorías</SelectLabel>
                  {DATA_TIENDA.categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <div className="col-span-2 lg:col-span-1 flex items-end">
          <Button type="submit" className="w-full">
            Actualizar Producto
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;
