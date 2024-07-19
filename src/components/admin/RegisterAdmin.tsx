import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema } from "../../schema/adminSchema";
import type { AdminRegister } from "../../types/types";
import { useFetch } from "@/hooks/useFetch";
import { Spinner } from "../ui/spinner";

const RegisterAdmin: React.FC = () => {
  const {
    register,
    formState: { errors },
    formState,
    handleSubmit,
    reset,
  } = useForm<AdminRegister>({
    resolver: zodResolver(adminSchema),
  });

  const {
    execute: executeRegister,
    isLoading,
    error,
    isSuccess,
    data,
  } = useFetch<{ message: string }>();

  const onSubmit: SubmitHandler<AdminRegister> = async (
    data: AdminRegister
  ) => {
    try {
      const result = await executeRegister("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: data.name,
          email: data.email,
          password: data.password,
        }).toString(),
      });

      if (isSuccess) {
        reset();
      }
      if (result && result.data && result.data.url) {
        window.location.assign(result.data.url);
      }
    } catch (error) {
      console.error("Error registering admin:", error);
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-center items-center gap-8 p-8 h-[100vh]"
      >
        <Card className="w-full md:w-[400px]">
          {isSuccess && data && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
              role="alert"
            >
              <p>Registrado correctamente </p>
            </div>
          )}
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>
              Crear una nueva cuenta de administrador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Admin"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{errors?.name.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors?.email.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="********"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input
                id="repeatPassword"
                type="password"
                {...register("repeatPassword")}
                placeholder="********"
              />
              {errors.repeatPassword && (
                <span className="text-red-500">
                  {errors.repeatPassword.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretKey">Clave secreta</Label>
              <Input
                id="secret-key"
                type="password"
                {...register("secretKey")}
                placeholder="********"
              />
              {errors.secretKey && (
                <span className="text-red-500">{errors.secretKey.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Spinner size="medium" /> : "Registrar"}
            </Button>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <a href="/admin/signin" className="text-blue-600">
                Iniciar sesión
              </a>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default RegisterAdmin;
