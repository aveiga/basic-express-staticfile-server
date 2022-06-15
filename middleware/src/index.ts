import session from "express-session";
import Keycloak, { KeycloakConfig } from "keycloak-connect";
// import winston from "winston";
import * as expressWinston from "express-winston";

import * as logging from "./logging/logger.js";
import * as errorHandling from "./error-handling/errorHandler.js";
import * as monitoring from "./monitoring/monitor.js";

export * as uaa from "./uaa/uaa.js";
export * as logging from "./logging/logger.js";
export * as errorHandling from "./error-handling/errorHandler.js";
export * as data from "./db/connectionFactory.js";
export * as ws from "./ws/connectionFactory.js";
export * as amqp from "./amqp/connectionFactory.js";
export * as validator from "./input-validation/validator.js";
export * as rateLimiting from "./rate-limiting/rateLimiterFactory.js";

export function preRouteMiddleware(app) {
  let kcConfig: KeycloakConfig = {
    // @ts-ignore
    clientId: process.env.OAUTH_CLIENT,
    credentials: {
      secret: process.env.OAUTH_CLIENT_SECRET,
    },
    "auth-server-url": process.env.OAUTH_SERVER_URL,
    realm: process.env.OAUTH_REALM,
    resource: process.env.OAUTH_RESOURCE,
    "ssl-required": process.env.OAUTH_SSL_REQUIRED,
    "confidential-port": process.env.OAUTH_CONFIDENTIAL_PORT,
  };

  const memoryStore = new session.MemoryStore();
  const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

  app.use(
    session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  app.use(keycloak.middleware());
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

  monitoring.setupMonitoring(app);
}

export function postRouteMiddleware(app) {
  app.use(errorHandling.errorHandler);
}
