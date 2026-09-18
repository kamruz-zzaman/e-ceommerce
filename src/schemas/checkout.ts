import { z } from "zod";

export const COUNTRIES = [
  "Australia",
  "Bangladesh",
  "Canada",
  "France",
  "Germany",
  "India",
  "Japan",
  "Netherlands",
  "United Kingdom",
  "United States",
] as const;

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(80, "Keep the name under 80 characters."),
  email: z.string().trim().toLowerCase().max(254, "Keep the email under 254 characters.").email("Enter a valid email address."),
  address: z.string().trim().min(4, "Enter a delivery address.").max(120, "Keep the address under 120 characters."),
  city: z.string().trim().min(1, "Enter a city.").max(80, "Keep the city under 80 characters."),
  postalCode: z.string().trim().min(2, "Enter a postal code.").max(16, "Keep the postal code under 16 characters."),
  country: z.enum(COUNTRIES, { error: "Select a country." }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
