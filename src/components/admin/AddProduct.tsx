"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "@/types/types";
import { productSchema } from "@/schema/productSchema";
import { addProduct } from "@/services/addProduct";
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
import { DATA_TIENDA } from "@/constants/const";
import app from "@/firebase/client";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AddProduct() {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  //funcion para detectar si algun campo es undefined y cambiarlo a null
  const changedNull = (data: Product): Product => {
    const newData: Product = { ...data };
    for (const key in newData) {
      if (newData[key as keyof Product] === undefined) {
        newData[key as keyof Product] as any;
        null;
      }
    }
    return newData;
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    data = changedNull(data);
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (!user) {
        return;
      }
      // Verificar y actualizar el token antes de subir
      try {
        await user.getIdToken(true); // Fuerza la actualización del token
      } catch (error) {
        return;
      }

      let imageUrl = "";
      if (file) {
        imageUrl = await uploadImage(file);
        data.image = imageUrl;
      }
      // Convertir avaliable a booleano explícitamente
      data.avaliable = !!data.avaliable;
      const response = await addProduct(data);
      if (!response.ok) {
        throw new Error("Error adding product.");
      }

      setSuccess("Product added successfully!");

      reset({
        name: "",
        image: "",
        description: "",
        price: 0,
        category: "",
        avaliable: false,
      });
      setFile(null);
    } catch (error) {
      console.error("Error completo:", error);
      if (error instanceof Error) {
        setError(`Error adding product: ${error.message}`);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  //funcion que muestra mensaje de error o exito al enviar el formulario pero que dure 2 segundos

  // React.useEffect(() => {
  //   const suscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => suscription.unsubscribe();
  // }, [watch]);

  return (
    <section className="flex flex-col gap-6 p-4 md:p-6 justify-center items-center h-[100vh]">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold">Agregar Nuevo Producto</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  ustify-center max-w-md m-0 p-0  gap-4 "
      >
        {success && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4"
            role="alert"
          >
            <p className="font-bold">Producto cargado exitoso</p>
            <p>¡El producto se cargo correctamente! </p>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4"
            role="alert"
          >
            <p className="font-bold">Error al cargar el producto</p>
            <p> </p>
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
            <span className="text-red-500">{errors?.name.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Imagen URL</Label>
          <Input type="file" onChange={(e) => setFile(e.target.files![0])} />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="product"
              className="w-1/2 object-contain mx-auto"
            />
          )}
          {errors.image && (
            <span className="text-red-500">{errors?.image.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Descripcion</Label>
          <Input
            id="description"
            type="text"
            placeholder="la descripcion"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors?.description.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            type="number"
            placeholder="Ingresa el precio del producto"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-red-500">{errors?.price.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="avaliable">Disponible</Label>
          <Controller
            name="avaliable"
            control={control}
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
            Agregar Producto
          </Button>
        </div>
      </form>
    </section>
  );
}
