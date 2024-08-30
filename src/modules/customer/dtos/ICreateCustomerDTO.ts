import { z } from "zod";

export const schemaCustomer = z.object({
  id: z.string(),
  customerCode: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResponseCustomer = z.infer<typeof schemaCustomer>;

export const ICreateCustomerDTO = z.object({
  customer_code: z.string(),
  measure_type: z.enum(["WATER", "GAS"]),
});

export type CreateCustomerSchema = z.infer<typeof ICreateCustomerDTO>;
