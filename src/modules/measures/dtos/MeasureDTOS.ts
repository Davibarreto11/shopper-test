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

export const schemaMeasures = z.object({
  id: z.string(),
  measureDatetime: z.string(),
  measureType: z.string(),
  measureValue: z.number(),
  hasConfirmed: z.boolean(),
  imageUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  customerId: z.string(),
});

export const schemaCustomerFindAllMeasures = z.array(schemaMeasures);

export type ResponseMeasure = z.infer<typeof schemaMeasures>;
export type ResponseMeasuresCustomer = z.infer<
  typeof schemaCustomerFindAllMeasures
>;
export type UpdateMeasureDTO = z.infer<typeof IUpdateMeasureDTO>;
export type CreateMeasureSchema = z.infer<typeof ICreateMeasureDTO>;
