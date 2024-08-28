import { prisma } from "@/shared/lib/prisma";
import type IBillRepository from "./IBillRepository";
import type { CreateBillSchema } from "../dtos/ICreateBillDTO";

class BillRepository implements IBillRepository {
  async create({
    customer_code,
    image_url,
    measure_datetime,
    measure_type,
  }: CreateBillSchema) {
    const bill = await prisma.bill.create({
      data: {
        customer_code,
        image_url,
        measure_datetime,
        measure_type,
      },
    });

    return bill;
  }

  async findByDateTime({ measure_datetime }: Partial<CreateBillSchema>) {
    const bill = await prisma.bill.findByUnique({
      where: { measure_datetime },
    });

    return bill;
  }

  async findById({ customer_code }: Partial<CreateBillSchema>) {
    const bill = await prisma.bill.findOneBy({ customer_code });

    return bill;
  }

  public async save(data: CreateBillSchema) {
    return await prisma.bill.save(data);
  }
}

export default BillRepository;
