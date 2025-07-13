import { z } from "zod";

const loginValidation = z.object({
  body: z
    .object({
      email: z.string().email({ message: "Invalid email address" }).optional(),
      phone: z.string().optional(),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone number is required",
      path: ["email", "phone"],
    }),
});

export default loginValidation;
