import { Router } from "express";

import BillController from "../controller/BillController";

const billRouter = Router();

billRouter.post("/upload", BillController.create);

export default billRouter;
