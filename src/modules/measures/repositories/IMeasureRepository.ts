import {
  CreateMeasureSchema,
  type ResponseMeasure,
  type ResponseMeasuresCustomer,
  type UpdateMeasureDTO,
} from "@/modules/measures/dtos/MeasureDTOS";

export default interface IMeasureRepository {
  findByDateTime: ({
    measure_datetime,
    constumer_id,
    measure_type,
    customer_code,
    image_url,
    measure_value,
  }: Partial<CreateMeasureSchema>) => Promise<ResponseMeasure | null>;
  findById: (id: string) => Promise<ResponseMeasure | null>;
  create: (data: CreateMeasureSchema) => Promise<ResponseMeasure>;
  update: (data: UpdateMeasureDTO) => Promise<ResponseMeasure>;
  findAllCustomer: ({
    constumer_id,
    measure_datetime,
    measure_type,
  }: Partial<CreateMeasureSchema>) => Promise<ResponseMeasuresCustomer | null>;
}
