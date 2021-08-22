import { validationResult } from "express-validator";
import { CustomError } from "../error-handling/errorHandler.js";

export function validationErrorHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(req, undefined, errors.array());
  } else {
    next();
  }
}
