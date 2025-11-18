import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email format")),
  password: z.string().min(6).max(20),
});

export type loginZodSchemaType = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z
  .object({
    email: z.string().trim().pipe(z.email("Invalid email format")),
    displayName: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type registerZodSchemaType = z.infer<typeof registerZodSchema>;

export const profileZodSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display name must be at most 50 char"),
  photoURL: z.union([z.url("Invalid URL format"), z.literal("")]).optional(),
});

export type profileZodSchemaType = z.infer<typeof profileZodSchema>;

export const taskZodSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 char"),
  description: z
    .string()
    .max(200, "Description must be at most 200 char")
    .optional(),
});

export type taskZodSchemaType = z.infer<typeof taskZodSchema>;
