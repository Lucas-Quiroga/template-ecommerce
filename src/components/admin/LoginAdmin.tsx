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
  setPersistence,
  browserSessionPersistence,
  type Auth,
  type User,
} from "firebase/auth";
import app from "@/firebase/client";
import { Spinner } from "../ui/spinner";
import { useFetch } from "@/hooks/useFetch";

interface SignInResponse {
  url: string;
}

const LoginAdmin = (): JSX.Element => {
  const auth: Auth = getAuth(app);
  const [hasError, setHasError] = React.useState(false);
  const { execute: executeSignIn, isLoading } = useFetch<SignInResponse>();

  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<AdminLogin>({
    resolver: zodResolver(loginAdminSchema),
  });

  const onSubmit: SubmitHandler<AdminLogin> = async (data: AdminLogin) => {
    setHasError(false);
    try {
      await auth.setPersistence(browserSessionPersistence);
      const user = await loginAdmin(data.email, data.password);
      const idToken = await user.getIdToken();

      const result = await executeSignIn("/api/auth/signin", {
        method: "GET",
        token: idToken,
      });

      if (result && result.data && result.data.url) {
        window.location.assign(result.data.url);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error("Error logging in admin:", error);
      setHasError(true);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-center items-center h-[100vh] gap-8 p-8"
      >
        <Card className="w-full md:w-[400px]">
          {hasError && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
              role="alert"
            >
              <p>
                Error al iniciar sesión como administrador. Por favor, inténtalo
                de nuevo.
              </p>
            </div>
          )}
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Acceda a su cuenta de administrador
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                {...register("password")}
                placeholder="********"
              />
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
              {isLoading ? <Spinner size="medium" /> : "Ingresar"}
            </Button>
            <p>
              ¿No tienes una cuenta?{""}
              <a href="/admin/register" className="text-blue-600">
                {" "}
                Registrate
              </a>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default LoginAdmin;
