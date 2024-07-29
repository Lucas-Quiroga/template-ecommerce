"use client";
import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Product } from "@/types/types";
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
import { DATA_TIENDA } from "@/constants/const";
import app from "@/firebase/client";
import { getAuth } from "firebase/auth";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { Spinner } from "@/components/ui/spinner";

export default function AddProduct() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { execute, isLoading } = useFetch<Product>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  // Cambia los valores undefined por null en un objeto
  const changedNull = useCallback((data: Product): Product => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === undefined ? null : value,
      ])
    ) as Product;
  }, []);

  const onSubmit = useCallback(
    async (data: Product) => {
      data = changedNull(data);
      try {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) return;

        await user.getIdToken(true);

        let imageUrl = "";
        if (file) {
          imageUrl = await uploadImage(file);
          data.image = imageUrl;
        }

        data.avaliable = !!data.avaliable;

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null) {
            formData.append(
              key,
              key === "avaliable" ? (value ? "on" : "off") : value.toString()
            );
          }
        });

        const response = await execute("/api/products", {
          method: "POST",
          body: formData,
        });

        if (response) {
          setSuccess("Producto cargado exitosamente");
          reset({
            name: "",
            image: "",
            description: "",
            price: 0,
            category: "",
            avaliable: false,
          });
          setFile(null);
          setTimeout(() => setSuccess(null), 2000);
        } else {
          setError("Error al cargar el producto");
          setTimeout(() => setError(null), 2000);
        }
      } catch (error) {
        console.error("Error completo:", error);
        setError(
          error instanceof Error
            ? `Error adding product: ${error.message}`
            : "An unknown error occurred"
        );
      }
    },
    [changedNull, execute, file, reset]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setFile(e.target.files[0]);
    },
    []
  );

  return (
    <section className="flex flex-col gap-6 p-4 md:p-6 justify-center items-center h-[100vh]">
      <h1 className="text-2xl font-bold dark:text-white">
        Agregar Nuevo Producto
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
            <p className="font-bold">Producto cargado exitosamente</p>
            <p>¡El producto se cargó correctamente!</p>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4"
            role="alert"
          >
            <p className="font-bold">Error al cargar el producto</p>
            <p>{error}</p>
          </div>
        )}
        <FormField
          label="Nombre"
          id="name"
          type="text"
          placeholder="Ingresa el nombre del producto"
          register={register}
          errors={errors}
        />
        <FormField
          label="Imagen"
          id="image"
          type="file"
          onChange={handleFileChange}
        />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="product"
            className="w-1/2 object-contain mx-auto"
          />
        )}
        <FormField
          label="Descripción"
          id="description"
          as={Textarea}
          placeholder="La descripción"
          register={register}
          errors={errors}
          maxLength={210}
        />
        <FormField
          label="Precio"
          id="price"
          type="number"
          placeholder="Ingresa el precio del producto"
          register={register}
          errors={errors}
        />
        <FormField
          label="Disponible"
          id="avaliable"
          as={Checkbox}
          control={control}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full dark:text-white">
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner size="medium" /> : "Agregar Producto"}
        </Button>
      </form>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  register?: any;
  errors?: any;
  as?: React.ComponentType<any>;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  errors,
  as: Component = Input,
  maxLength,
  onChange,
  control,
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id} className="dark:text-white">
      {label}
    </Label>
    {control && Component === Checkbox ? (
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Checkbox
            id={id}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
    ) : (
      <Component
        id={id}
        type={type}
        placeholder={placeholder}
        {...(register ? register(id) : {})}
        onChange={onChange}
        maxLength={maxLength}
        className="dark:text-white"
      />
    )}
    {maxLength && (
      <p className="text-sm text-muted-foreground dark:text-gray-50">
        Máximo {maxLength} caracteres.
      </p>
    )}
    {errors && errors[id] && (
      <span className="text-red-500">{errors[id].message}</span>
    )}
  </div>
);
