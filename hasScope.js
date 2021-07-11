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
        res.status(403).send();
      }
    } catch (err) {
      next(err);
    }
  };
}
