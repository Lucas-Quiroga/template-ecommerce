import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineFileUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAdminSchema } from "@/schema/adminSchema";
import type { SubmitHandler } from "react-hook-form";
import { type AdminUpdate } from "@/types/types";
import { useFetch } from "@/hooks/useFetch";
import { getAuth } from "firebase/auth";
import app from "@/firebase/client";
import { Spinner } from "../ui/spinner";

const SettingsAccount = () => {
  const { execute, isLoading } = useFetch<AdminUpdate>();
  const [success, setSuccess] = React.useState<string | null>(null);
  const auth = getAuth(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminUpdate>({
    resolver: zodResolver(updateAdminSchema),
    shouldUseNativeValidation: false,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<AdminUpdate> = async (data: AdminUpdate) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const idToken = await user.getIdToken(true);

      const result = await execute("/api/admin/updateAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        token: idToken,
      });

      if (result) {
        const { data: responseData, response } = result;
        if (response.ok) {
          console.log("Account updated successfully:", responseData);
          // Mostrar mensaje de éxito al usuario 2 segundos
          setSuccess("Cambios actualizados correctamente");
          setTimeout(() => {
            setSuccess(null);
          }, 2000);

          reset();
        } else {
          console.error("Failed to update account:", responseData);
          // Mostrar mensaje de error al usuario
        }
      } else {
        console.log("Request was aborted or failed");
        // Manejar el caso en que la petición fue abortada o falló
      }
    } catch (error) {
      console.error("Error updating account:", error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <form onSubmit={handleSubmit(onSubmit)}>
        {success && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            <p>Cambios actualizados correctamente</p>
          </div>
        )}
        <Card className="w-full max-w-md p-6 sm:p-8">
          <CardHeader>
            <CardTitle>Ajustes de cuenta</CardTitle>
            <CardDescription>Gestione los datos de su cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="current-password">Contraseña actual</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Ingresa tu contraseña actual"
                {...register("currentPassword")}
              />
            </div>
            <div>
              <Label htmlFor="new-password">Nueva contraseña</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                {...register("newPassword")}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                {...register("repeatNewPassword")}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingresar nombre"
                  {...register("name")}
                />
              </div>
              {/**
               * @todo: Ocultado hasta que se implemente la funcionalidad
               */}
              <div className="hidden">
                <Label htmlFor="profile-image">Agregar imagen</Label>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <MdOutlineFileUpload className="h-5 w-5" />
                  <input id="profile-image" type="file" className="hidden" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size={"medium"} /> : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SettingsAccount;
