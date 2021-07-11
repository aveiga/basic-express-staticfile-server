import { ForbiddenError } from "./errorHandler.js";

export default function hasScope(scope) {
  return function (req, res, next) {
    try {
      if (
        req.kauth.grant.access_token.content.scope
          .split(" ")
          .find((s) => s === scope) != null
      ) {
        next();
      } else {
        throw new ForbiddenError(req, "username");
      }
    } catch (err) {
      next(err);
    }
  };
}
