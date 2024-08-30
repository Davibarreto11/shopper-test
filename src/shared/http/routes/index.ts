import { Router } from "express";

import measureRouter from "@/modules/measures/routes/measures.routes";

const routes = Router();

routes.use("/", measureRouter);

export default routes;
