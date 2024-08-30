import { Router } from "express";

import MeasureController from "../controller/MeasureController";
import { validateSchema } from "@/shared/validate/validate";
import {
  schemaMeasure,
  schemaMeasureType,
  schemaCustomerCode,
  schemaMeasureUpdate,
} from "@/modules/measures/dtos/MeasureDTOS";
import { container } from "tsyringe";
import UploadUserAvatarService from "@/modules/customer/services/UploadFileService";

const measureRouter = Router();

measureRouter.post("/file", async (request, response) => {
  const updateUserAvatar = container.resolve(UploadUserAvatarService);

  await updateUserAvatar.execute(request.file?.filename);

  return response.json();
});

measureRouter.post(
  "/upload",
  validateSchema(schemaMeasure, "body"),
  MeasureController.create
);

measureRouter.put(
  "/confirm",
  validateSchema(schemaMeasureUpdate, "body"),
  MeasureController.update
);

measureRouter.get(
  "/:customer_code/list",
  validateSchema(schemaCustomerCode, "params"),
  validateSchema(schemaMeasureType, "query"),
  MeasureController.show
);

export default measureRouter;
