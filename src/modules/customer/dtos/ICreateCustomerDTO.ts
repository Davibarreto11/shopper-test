import { z } from "zod";

export const ICreateCustomerDTO = z.object({
  customer_code: z.string(),
  measure_type: z.enum(["WATER", "GAS"]),
});

export type CreateCustomerSchema = z.infer<typeof ICreateCustomerDTO>;
