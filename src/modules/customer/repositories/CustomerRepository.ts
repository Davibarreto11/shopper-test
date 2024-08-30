import { prisma } from "@/shared/lib/prisma";
import type ICustomerRepository from "./ICustomerRepository";
import type { CreateCustomerSchema } from "../dtos/ICreateCustomerDTO";

class CustomerRepository implements ICustomerRepository {
  async create({ customer_code }: CreateCustomerSchema) {
    const customer = await prisma.customer.create({
      data: {
        customerCode: customer_code,
      },
    });

    return customer;
  }

  findByCustomerCode({ customer_code }: CreateCustomerSchema) {
    return prisma.customer.findFirst({
      where: {
        customerCode: customer_code,
      },
    });
  }
}

export default CustomerRepository;
