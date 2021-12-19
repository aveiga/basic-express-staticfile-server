import { validationResult } from "express-validator";
import { UnprocessableEntity } from "../error-handling/errorHandler.js";

export function validationErrorHandler(req, res, next) {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new UnprocessableEntity(req, undefined, errors.array());
  } else {
    next();
  }
}
