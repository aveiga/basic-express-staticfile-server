export const ErrorCategories = {
  BUSINESS_ERROR: "BUSINESS_ERROR",
  ACCESS_CONTROL: "ACCESS_CONTROL",
};

export class CustomError extends Error {
  statusCode;
  message;
  category;
  username;
  timestamp;
  error;

  constructor(req, message = "Business Error", error) {
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

export function errorHandler(err, req, res, next) {
  // console.error(err);
  res.status(err.statusCode).send(err);
}
