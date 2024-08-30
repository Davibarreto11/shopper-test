import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateMeasureSerivce from "@/modules/measures/services/CreateMeasureSerivce";
import CreateCustomerService from "@/modules/customer/services/CreateCustomerService";
import UpdateMeasureSerivce from "@/modules/measures/services/UpdateMeasureService";
import ListMeasureCustomerService from "@/modules/measures/services/ListMeasureCustomerService";

class MeasureController {
  public async create(request: Request, reponse: Response): Promise<Response> {
    const {
      image_url,
      measure_value,
      customer_code,
      measure_datetime,
      measure_type,
    } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);
    const createMeasure = container.resolve(CreateMeasureSerivce);

    const customer = await createCustomer.execute({
      customer_code,
      measure_type,
    });

    const measure = await createMeasure.execute({
      image_url,
      constumer_id: customer.id,
      measure_datetime,
      measure_type,
      measure_value,
      customer_code,
    });

    return reponse.status(201).json(measure);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { measure_id, has_confirmed } = request.body;

    const updateMeasure = container.resolve(UpdateMeasureSerivce);

    const measure = await updateMeasure.execute({
      has_confirmed,
      measure_id,
    });

    return response.status(200).json(measure);
  }

  public async show(request: Request, response: Response): Promise<any> {
    const customer_code = request.params.customer_code;
    const { query } = request;

    // schemaCustomerCode.safeParse(customer_code);
    // schemaMeasureType.safeParse(query.measure_type);

    const listMeasureCustomers = container.resolve(ListMeasureCustomerService);
    const measures = await listMeasureCustomers.execute({
      customer_code,
      measure_type: query.measure_type as "WATER" | "GAS",
    });

    return response.status(200).json(measures);
  }
}

export default new MeasureController();
