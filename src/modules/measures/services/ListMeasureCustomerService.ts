import { injectable, inject } from "tsyringe";
import type IMeasureRepository from "../repositories/IMeasureRepository";
import AppError from "@/shared/errors/AppError";
import type { CreateCustomerSchema } from "@/modules/customer/dtos/ICreateCustomerDTO";
import type ICustomerRepository from "@/modules/customer/repositories/ICustomerRepository";

@injectable()
class ListMeasureCustomerService {
  constructor(
    @inject("MeasureRepository")
    private readonly measureRepository: IMeasureRepository,

    @inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository
  ) {}

  public async execute({
    customer_code,
    measure_type,
  }: Partial<CreateCustomerSchema>) {
    if (!customer_code) return;

    const customer = await this.customerRepository.findByCustomerCode({
      customer_code,
      measure_type,
    });

    if (!customer) {
      return new AppError("Tipo de medição não permitida");
    }

    const measureExists = await this.measureRepository.findAllCustomer({
      constumer_id: customer.id,
      measure_type,
    });

    if (!measureExists) {
      return new AppError("Nenhuma leitura encontrada.", 404);
    }

    return { customer_code, measureExists };
  }
}

export default ListMeasureCustomerService;
