import type { CreateCustomerSchema } from "../dtos/ICreateCustomerDTO";

export default interface ICustomerRepository {
  create: (data: CreateCustomerSchema) => Promise<any>;
  findByCustomerCode: (data: CreateCustomerSchema) => Promise<any>;
}
