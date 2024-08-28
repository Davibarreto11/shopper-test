import { container } from "tsyringe";

import type IBillRepository from "@/modules/bills/repositories/IBillRepository";
import BillRepository from "@/modules/bills/repositories/BillRepository";

container.registerSingleton<IBillRepository>("BillRepository", BillRepository);
