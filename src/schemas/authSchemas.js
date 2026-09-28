import { z } from "zod";

// Ethiopian phone: starts with 09 or +2519, 10 digits after 0
const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^(09|\+2519)\d{8}$/, "Enter a valid Ethiopian phone (e.g. 0912345678)");

export const signInSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    phone: phoneSchema,
    email: z.string().email("Enter a valid email").or(z.literal("")), // optional email
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // show error under confirmPassword field
  });

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: phoneSchema,
  email: z.string().email("Enter a valid email").or(z.literal("")),
  neighborhood: z.string().min(2, "Neighborhood is required"),
  address: z.string().min(5, "Full address is required"),
});