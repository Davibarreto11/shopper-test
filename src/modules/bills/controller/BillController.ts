import { Request, Response } from "express";

import CreateBillSerivce from "@/modules/bills/services/CreateBillSerivce";
import { container } from "tsyringe";

class BillController {
  public async create(request: Request, reponse: Response): Promise<Response> {
    const { image_url, customer_code, measure_datetime, measure_type } =
      request.body;

    const createBill = container.resolve(CreateBillSerivce);

    const bill = await createBill.execute({
      image_url,
      customer_code,
      measure_datetime,
      measure_type,
    });

    return reponse.status(201).json(bill);
  }
}

export default new BillController();
