import { inject, injectable } from "tsyringe";
import type ICustomerRepository from "../repositories/ICustomerRepository";
import AppError from "@/shared/errors/AppError";
import type {
  CreateCustomerSchema,
  ResponseCustomer,
} from "../dtos/ICreateCustomerDTO";

@injectable()
class CreateCustomerService {
  constructor(
    @inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository
  ) {}

  public async execute({
    customer_code,
    measure_type,
  }: CreateCustomerSchema): Promise<ResponseCustomer> {
    const checkCustomerExists =
      await this.customerRepository.findByCustomerCode({
        customer_code,
        measure_type,
      });

    if (checkCustomerExists) {
      return checkCustomerExists;
    }

    const customer = await this.customerRepository.create({
      customer_code,
      measure_type,
    });

    return customer;
  }
}

export default CreateCustomerService;
