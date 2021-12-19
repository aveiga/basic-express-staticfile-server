import { logger } from "../logging/logger.js";

export const ErrorCategories = {
  BUSINESS_ERROR: "BUSINESS_ERROR",
  ACCESS_CONTROL: "ACCESS_CONTROL",
};

export class CustomError extends Error {
  statusCode: number;
  message: string;
  category: string;
  username: string;
  timestamp: number;
  error: any;

  constructor(req, message: string = "Business Error", error?) {
    super();
    this.statusCode = 500;
    this.message = message;
    this.category = ErrorCategories.BUSINESS_ERROR;
    this.username =
      req?.kauth?.grant?.access_token?.content?.preferred_username;
    this.timestamp = new Date().getTime();
    this.error = error;
  }
}

export class ForbiddenError extends CustomError {
  constructor(req, message = "Access Forbidden") {
    super(req);
    this.statusCode = 403;
    this.message = message;
    this.category = ErrorCategories.ACCESS_CONTROL;
  }
}

export class UnprocessableEntity extends CustomError {
  constructor(req, message = "Unprocessable Entity", error) {
    super(req);
    this.statusCode = 422;
    this.message = message;
    this.category = ErrorCategories.BUSINESS_ERROR;
    this.error = error;
  }
}

export class TooManyRequestsError extends CustomError {
  constructor(req, message = "Too Many Requests") {
    super(req);
    this.statusCode = 429;
    this.message = message;
    this.category = ErrorCategories.ACCESS_CONTROL;
  }
}

export function errorHandler(err, req, res, next) {
  logger.error(err.error);
  res.status(err?.statusCode || 500).send(err);
}
