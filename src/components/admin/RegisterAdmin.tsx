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

const RegisterAdmin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    formState,
    handleSubmit,
    reset,
  } = useForm<AdminRegister>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit: SubmitHandler<AdminRegister> = async (
    data: AdminRegister,
    event: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();

    try {
      const response: Response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error registering admin.");
      }

      setSuccess("Admin registered successfully!");
      reset();
    } catch (error) {
      setError("Error registering admin. Please try again.");
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-center items-center gap-8 p-8 h-[100vh]"
      >
        <Card className="w-full md:w-[400px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a new admin account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="manuel"
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
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors?.email.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="repeatPassword"
                type="password"
                {...register("repeatPassword")}
              />
              {errors.repeatPassword && (
                <span className="text-red-500">
                  {errors.repeatPassword.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input id="secret-key" type="text" {...register("secretKey")} />
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
            <Button className="w-full" type="submit">
              Register
            </Button>
            <p>
              ¿Ya tienes una cuenta? <a href="/admin/signin">Iniciar sesión</a>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default RegisterAdmin;
