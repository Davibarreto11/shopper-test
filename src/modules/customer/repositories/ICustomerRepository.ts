import type {
  CreateCustomerSchema,
  ResponseCustomer,
} from "../dtos/ICreateCustomerDTO";

export default interface ICustomerRepository {
  create: (data: CreateCustomerSchema) => Promise<ResponseCustomer>;
  findByCustomerCode: ({
    customer_code,
    measure_type,
  }: CreateCustomerSchema) => Promise<ResponseCustomer | null>;
}
