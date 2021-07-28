import session from "express-session";
import Keycloak from "keycloak-connect";
import winston from "winston";
import * as expressWinston from "express-winston";

import * as logging from "./src/logging/logger.js";
import * as errorHandling from "./src/error-handling/errorHandler.js";

export * as uaa from "./src/uaa/uaa.js";
export * as logging from "./src/logging/logger.js";
export * as errorHandling from "./src/error-handling/errorHandler.js";

// export const middleware = {
//     logging: logger,
//     errorHandling: errorHandler
// };

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

    app.use(expressWinston.logger({
        ...logging.loggerOptions,
        meta: false,
        msg: "HTTP  ",
        expressFormat: true,
        colorize: false,
        ignoreRoute: function (req, res) { return false; }
    }));
}

export function postRouteMiddleware(app) {
    app.use(errorHandling.errorHandler);
}