import { prisma } from "@/shared/lib/prisma";
import type IMeasureRepository from "./IMeasureRepository";
import type {
  CreateMeasureSchema,
  UpdateMeasureDTO,
} from "../dtos/MeasureDTOS";

class MeasureRepository implements IMeasureRepository {
  async findAllCustomer({
    constumer_id,
    measure_type,
    measure_datetime,
  }: Partial<CreateMeasureSchema>) {
    const measures = await prisma.measure.findMany({
      where: { customerId: constumer_id, measureType: measure_type },
    });

    if (!measures) {
      return null;
    }

    return measures;
  }

  async create({
    constumer_id,
    image_url,
    measure_datetime,
    measure_type,
    measure_value,
  }: CreateMeasureSchema) {
    const measure = await prisma.measure.create({
      data: {
        customerId: constumer_id,
        imageUrl: image_url,
        measureDatetime: measure_datetime,
        measureType: measure_type,
        measureValue: measure_value,
      },
    });

    return measure;
  }

  async findByDateTime({
    measure_datetime,
    constumer_id,
    measure_type,
  }: Partial<CreateMeasureSchema>) {
    const measure = await prisma.measure.findFirst({
      where: {
        customerId: constumer_id,
        measureDatetime: measure_datetime,
        measureType: measure_type,
      },
    });

    if (!measure) {
      return null;
    }

    return measure;
  }

  async findById(id: string) {
    const measure = await prisma.measure.findUnique({
      where: {
        id: id,
      },
    });

    if (!measure) {
      return null;
    }

    return measure;
  }

  async update({ measure_id, has_confirmed }: UpdateMeasureDTO) {
    const measure = await prisma.measure.update({
      where: {
        id: measure_id,
      },
      data: {
        hasConfirmed: has_confirmed,
      },
    });

    return measure;
  }
}

export default MeasureRepository;
