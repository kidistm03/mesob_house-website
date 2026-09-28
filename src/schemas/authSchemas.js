import { z } from "zod";

// Ethiopian phone: 0912345678 or +251912345678
const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^(09|\+2519)\d{8}$/,
    "Enter a valid Ethiopian phone (e.g. 0912345678)"
  );

// Optional email: empty string is OK, otherwise must be valid
const optionalEmailSchema = z
  .string()
  .refine(
    (val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    "Enter a valid email"
  );

export const signInSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: phoneSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    phone: phoneSchema,
    email: optionalEmailSchema,
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: phoneSchema,
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Enter a valid email"
    ),
  neighborhood: z.string().min(2, "Neighborhood is required"),
  address: z.string().min(2, "Full address is required"),
});

// Turn Zod issues into { fieldName: "message" }
export function zodErrorsToObject(zodError) {
  const fieldErrors = {};
  zodError.issues.forEach((issue) => {
    const field = issue.path[0];
    if (field != null && fieldErrors[field] == null) {
      fieldErrors[field] = issue.message;
    }
  });
  return fieldErrors;
}
