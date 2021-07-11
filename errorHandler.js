function generateErrorPayload(message, category) {
  return {
    message: message,
    category: category,
  };
}

export default function errorHandler(err, req, res, next) {
  switch (res.status) {
    case "403":
      res.send(generateErrorPayload("forbidden", "access_control"));
  }
}
