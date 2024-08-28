import { Router } from "express";

import billRouter from "@/modules/bills/routes/bills.routes";

const routes = Router();

routes.use("/bill", billRouter);
