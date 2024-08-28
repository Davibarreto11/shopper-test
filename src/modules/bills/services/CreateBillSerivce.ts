import { injectable, inject } from "tsyringe";
import type { CreateBillSchema } from "../dtos/ICreateBillDTO";
import type IBillRepository from "../repositories/IBillRepository";
import { Base64 } from "js-base64";
import AppError from "@/shared/errors/AppError";

@injectable()
class CreateBillSerivce {
  constructor(
    @inject("BillRepository")
    private readonly billRepository: IBillRepository
  ) {}

  public async execute({
    customer_code,
    image_url,
    measure_datetime,
    measure_type,
  }: CreateBillSchema) {
    const isBase64 = Base64.isValid(image_url);

    if (!isBase64) {
      throw new AppError(
        "Os dados fornecidos no corpo da requisição são inválidos",
        400
      );
    }

    const checkDateTimeExists = await this.billRepository.findByDateTime({
      measure_datetime,
    });

    if (checkDateTimeExists) {
      throw new AppError("Leitura do mês atual já realizada", 409);
    }

    const bill = this.billRepository.create({
      customer_code,
      image_url,
      measure_datetime,
      measure_type,
    });

    return bill;
  }
}

export default CreateBillSerivce;
