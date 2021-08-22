import session from "express-session";
import Keycloak from "keycloak-connect";
// import winston from "winston";
import * as expressWinston from "express-winston";

import * as logging from "./logging/logger.js";
import * as errorHandling from "./error-handling/errorHandler.js";

export * as uaa from "./uaa/uaa.js";
export * as logging from "./logging/logger.js";
export * as errorHandling from "./error-handling/errorHandler.js";
export * as data from "./db/connectionFactory.js";
export * as ws from "./ws/connectionFactory.js";
export * as amqp from "./amqp/connectionFactory.js";
export * as validator from "./input-validation/validator.js";

export function preRouteMiddleware(app) {
  const memoryStore = new session.MemoryStore();
  const keycloak = new Keycloak({ store: memoryStore });

  app.use(
    session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  // app.use(keycloak.middleware());
  // app.use(keycloak.protect());

  app.use(
    expressWinston.logger({
      ...logging.loggerOptions,
      meta: false,
      msg: "HTTP  ",
      expressFormat: true,
      colorize: false,
      ignoreRoute: function (req, res) {
        return false;
      },
    })
  );
}

export function postRouteMiddleware(app) {
  app.use(errorHandling.errorHandler);
}
