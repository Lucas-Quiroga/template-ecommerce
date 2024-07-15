import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  image: z.string().nullable().optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(210, { message: "Description must be at most 210 characters" })
    .nullable()
    .optional(),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  category: z.string().nullable().optional(),
  avaliable: z.boolean().nullable().optional(),
});
