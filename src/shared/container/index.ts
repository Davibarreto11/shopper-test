import { container } from "tsyringe";

import type IMeasureRepository from "@/modules/bills/repositories/IMeasureRepository";
import MeasureRepository from "@/modules/bills/repositories/MeasureRepository";

import type ICustomerRepository from "@/modules/customer/repositories/ICustomerRepository";
import CustomerRepository from "@/modules/customer/repositories/CustomerRepository";
import type IStorageProvider from "@/shared/container/providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "@/shared/container/providers/StorageProvider/implementations/DiskStorageProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerSingleton<IMeasureRepository>(
  "MeasureRepository",
  MeasureRepository
);

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);
