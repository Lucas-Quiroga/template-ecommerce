"use client";
import React from "react";
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
import type { AdminLogin } from "@/types/types";
import { loginAdminSchema } from "@/schema/adminSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAdmin } from "@/services/authService";
import type { SubmitHandler } from "react-hook-form";
import {
  getAuth,
  inMemoryPersistence,
  type Auth,
  type User,
} from "firebase/auth";
import app from "@/firebase/client";

const LoginAdmin = (): JSX.Element => {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const auth: Auth = getAuth(app);

  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<AdminLogin>({
    resolver: zodResolver(loginAdminSchema),
  });

  const onSubmit: SubmitHandler<AdminLogin> = async (data: AdminLogin) => {
    const { email, password } = data;
    try {
      const response: User = await loginAdmin(email, password);
      setSuccess("Admin logged in successfully!");
      if (response) {
        const idToken: string = await response.getIdToken();
        const response2: Response = await fetch("/api/auth/signin", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response2.redirected) {
          window.location.assign(response2.url);
        }
      }
    } catch (error) {
      setError("Error logging in admin. Please try again.");
    }
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // Esto evitará que el navegador almacene los datos de sesión
  React.useEffect(() => {
    auth.setPersistence(inMemoryPersistence);
  }, [auth]);

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-center items-center h-[100vh] gap-8 p-8"
      >
        <Card className="w-full md:w-[400px]">
          {success && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4"
              role="alert"
            >
              <p className="font-bold">Ingreso exitoso</p>
              <p>¡Has iniciado sesión correctamente como administrador!</p>
              <p>Cargando...</p>
            </div>
          )}
          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4"
              role="alert"
            >
              <p className="font-bold">Error de ingreso</p>
              <p>
                Error al iniciar sesión como administrador. Por favor, inténtalo
                de nuevo.
              </p>
            </div>
          )}
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in to your admin account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                {...register("password")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign In</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default LoginAdmin;
