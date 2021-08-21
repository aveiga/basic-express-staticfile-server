import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

import { preRouteMiddleware, postRouteMiddleware, data, ws } from "middleware";
import guitarRouter from "./guitars/guitar.routes.js";
import { Guitar } from "./guitars/guitar.model.js";

dotenv.config();

await data.setupDBConnection(createConnection, [Guitar]);
// const wsserver = ws.setupWSServer((socket) => {
//   socket.send("hi, you");
// });

const app = express();
const port = process.env.PORT || 3000;

preRouteMiddleware(app);

app.use(express.static("public"));
app.use(guitarRouter);

postRouteMiddleware(app);

export const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
