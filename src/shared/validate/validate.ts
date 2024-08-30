import { z } from "zod";
import { Request, Response, NextFunction } from "express";

type validateType = "body" | "params" | "query";

export function validateSchema(schema: z.ZodSchema, validate: validateType) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (validate === "body") {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json(result.error.errors);
      }

      req.body = result.data;
    } else if (validate === "params") {
      const result = schema.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json(result.error.errors);
      }

      req.body = result.data;
    } else {
      const result = schema.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json(result.error.errors);
      }

      req.body = result.data;
    }

    next();
  };
}
