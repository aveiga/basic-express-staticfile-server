import session from "express-session";
import Keycloak from "keycloak-connect";

import * as logger from "./src/logging/logger.js";
import * as errorHandler from "./src/error-handling/errorHandler.js";

export * as uaa from "./src/uaa/uaa.js";

export const middleware = {
    logging: logger,
    errorHandling: errorHandler
};

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

    app.use(keycloak.middleware());
    app.use(keycloak.protect());
    app.use(middleware.logging.requestLogger);
}

export function postRouteMiddleware(app) {
    app.use(middleware.errorHandling.errorHandler);
}