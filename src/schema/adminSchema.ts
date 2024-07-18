import { z } from "zod";

export const adminSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
    repeatPassword: z
      .string()
      .min(6, { message: "Repeat Password must be at least 6 characters" })
      .max(30, { message: "Repeat Password must be less than 30 characters" }),
    secretKey: z
      .string()
      .min(6, { message: "Secret Key must be at least 6 characters" })
      .max(30, { message: "Secret Key must be less than 30 characters" })
      .refine((secretKey) => secretKey === import.meta.env.PUBLIC_SECRET_KEY, {
        message: "Invalid secret key",
      }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export const loginAdminSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
