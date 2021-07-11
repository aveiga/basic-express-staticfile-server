import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";
import hasScope from "./hasScope.js";
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
app.use(express.static("public"));
// app.use(errorHandler);

app.get("/guitars", hasScope("email"), (req, res) => {
  console.log(req);
  res.send({ model: "Strat", brand: "Fender" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
