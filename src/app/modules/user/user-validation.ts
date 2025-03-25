import { z } from "zod";

// Define the schema
const UserValidationSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty({ message: "Name is required" }),
      email: z.string().email({ message: "Invalid email address" }).optional(),
      phone: z.string().optional(),
      password: z.string().nonempty({ message: "Password is required" }),
      address: z.string().optional(),
      image: z.string().optional(), // Image can be optional
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone number is required",
      path: ["email", "phone"],
    }),
});

export default UserValidationSchema;
