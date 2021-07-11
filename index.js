import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";
import requestLogger from "./logger.js";
import router from "./routes.js";
import errorHandler from "./errorHandler.js";

const app = express();
const port = 3000;

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
app.use(requestLogger);
app.use(express.static("public"));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
