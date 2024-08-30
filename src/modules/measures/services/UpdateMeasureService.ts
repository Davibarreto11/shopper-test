import { injectable, inject } from "tsyringe";
import type { UpdateMeasureDTO } from "../dtos/MeasureDTOS";
import type IMeasureRepository from "../repositories/IMeasureRepository";
import AppError from "@/shared/errors/AppError";

@injectable()
class UpdateMeasureSerivce {
  constructor(
    @inject("MeasureRepository")
    private readonly measureRepository: IMeasureRepository
  ) {}

  public async execute({
    measure_id,
    has_confirmed,
  }: UpdateMeasureDTO): Promise<unknown> {
    const measureExists = await this.measureRepository.findById(measure_id);
    if (!measureExists) {
      return new AppError("Measure not found!", 404);
    }

    if (measureExists.hasConfirmed === true) {
      return new AppError("Confirmation duplicate!", 409);
    }

    const measure = await this.measureRepository.update({
      has_confirmed,
      measure_id,
    });

    return measure;
  }
}

export default UpdateMeasureSerivce;
