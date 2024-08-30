import { Base64 } from "js-base64";
import { z } from "zod";

export const schemaMeasure = z.object({
  image_url: z.string().refine(Base64.isValid, {
    message: "Imagem não esta na base64",
  }),
  customer_code: z.string(),
  measure_datetime: z.string(),
  measure_type: z.enum(["WATER", "GAS"]),
  measure_value: z.number(),
});

export const schemaMeasureUpdate = z.object({
  measure_id: z.string({
    required_error: "Inválid Id",
  }),
  has_confirmed: z.boolean(),
});

export const schemaCustomerCode = z.object({
  customer_code: z.string(),
});

export const schemaMeasureType = z.object({
  measure_type: z.enum(["WATER", "GAS"]).optional(),
});

export const ICreateMeasureDTO = z.object({
  image_url: z.string().refine(Base64.isValid),
  constumer_id: z.string(),
  customer_code: z.string(),
  measure_datetime: z.string(),
  measure_type: z.enum(["WATER", "GAS"]),
  measure_value: z.number(),
});

export const IUpdateMeasureDTO = z.object({
  measure_id: z.string(),
  has_confirmed: z.boolean(),
});
export type UpdateMeasureDTO = z.infer<typeof IUpdateMeasureDTO>;
export type CreateMeasureSchema = z.infer<typeof ICreateMeasureDTO>;
