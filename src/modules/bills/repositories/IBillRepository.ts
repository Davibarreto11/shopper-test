import { CreateBillSchema } from "@/modules/bills/dtos/ICreateBillDTO";

export default interface IBillRepository {
  findByDateTime: ({
    measure_datetime,
  }: Partial<CreateBillSchema>) => Promise<any>;
  findById: ({ customer_code }: Partial<CreateBillSchema>) => Promise<any>;
  create: (data: CreateBillSchema) => Promise<any>;
  save: (data: CreateBillSchema) => Promise<any>;
}
