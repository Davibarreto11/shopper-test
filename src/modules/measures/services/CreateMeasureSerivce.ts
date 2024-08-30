import { injectable, inject } from "tsyringe";
import type { CreateMeasureSchema } from "../dtos/MeasureDTOS";
import type IMeasureRepository from "../repositories/IMeasureRepository";
import { Base64 } from "js-base64";
import AppError from "@/shared/errors/AppError";
import analyzeImage from "@/shared/lib/gemini";

@injectable()
class CreateMeasureSerivce {
  constructor(
    @inject("MeasureRepository")
    private readonly measureRepository: IMeasureRepository
  ) {}

  public async execute({
    constumer_id,
    customer_code,
    image_url,
    measure_datetime,
    measure_type,
    measure_value,
  }: CreateMeasureSchema) {
    const isBase64 = Base64.isValid(image_url);

    if (!isBase64) {
      return new AppError(
        "Os dados fornecidos no corpo da requisição são inválidos",
        400
      );
    }

    const checkDatetimeAndTypeExists =
      await this.measureRepository.findByDateTime({
        constumer_id,
        measure_datetime,
        measure_type,
      });

    if (checkDatetimeAndTypeExists) {
      return new AppError("Leitura do mês atual já realizada", 409);
    }

    // const { image_url_gemini, measure_value_gemini } = await analyzeImage(
    //   image_url
    // );

    const measure = await this.measureRepository.create({
      constumer_id,
      image_url,
      measure_datetime,
      measure_type,
      measure_value,
      customer_code,
    });

    return measure;
  }
}

export default CreateMeasureSerivce;
