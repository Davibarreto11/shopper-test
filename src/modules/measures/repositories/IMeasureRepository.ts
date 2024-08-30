import {
  CreateMeasureSchema,
  type UpdateMeasureDTO,
} from "@/modules/measures/dtos/MeasureDTOS";

export default interface IMeasureRepository {
  findByDateTime: ({
    measure_datetime,
  }: Partial<CreateMeasureSchema>) => Promise<any>;
  findById: (id: string) => Promise<any>;
  create: (data: CreateMeasureSchema) => Promise<any>;
  update: (data: UpdateMeasureDTO) => Promise<any>;
  findAllCustomer: ({
    constumer_id,
    measure_datetime,
    measure_type,
  }: Partial<CreateMeasureSchema>) => Promise<any>;
}
