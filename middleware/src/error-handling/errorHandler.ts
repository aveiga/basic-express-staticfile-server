export class ForbiddenError extends Error {
  statusCode: number;
  message: string;
  category: string;
  username: string;
  timestamp: number

  constructor(req, username, message = "Access Forbidden") {
    super();
    this.statusCode = 403;
    this.message = message;
    this.category = "access_control";
    this.username = req.kauth.grant.access_token.content.preferred_username;
    this.timestamp = new Date().getTime();
  }
}

export function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.statusCode).send(err);
}