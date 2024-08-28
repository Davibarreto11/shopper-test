import { Base64 } from "js-base64";
import { z } from "zod";

export const ICreateBillDTO = z.object({
  image_url: z.string().refine(Base64.isValid),
  customer_code: z.string(),
  measure_datetime: z.date(),
  measure_type: z.enum(["WATER", "GAS"]),
});

export type CreateBillSchema = z.infer<typeof ICreateBillDTO>;
