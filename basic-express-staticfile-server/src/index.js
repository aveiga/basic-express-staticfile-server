import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

import {
  preRouteMiddleware,
  postRouteMiddleware,
  data,
  ws,
  amqp,
} from "middleware";
import guitarRouter from "./guitars/guitar.routes.js";
import { GuitarEntitySchema } from "./guitars/guitar.model.js";

dotenv.config();

export var server = null;
export var wsserver = null;
export var amqpChannel = null;
// export const

await data
  .setupDBConnection(createConnection, [GuitarEntitySchema])
  .then((connection) => {
    const app = express();
    const port = process.env.PORT || 3000;

    preRouteMiddleware(app);

    app.use(express.static("public"));
    app.use(guitarRouter);

    postRouteMiddleware(app);

    server = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });

    wsserver = ws.setupWSServer(
      server,
      (wss) => {
        console.log("connected to the wss");
      },
      (wss, m) => {
        console.log(m);
        wss.send("hi back");
      }
    );

    amqp.setupAQMPConnection().then((ch) => {
      amqpChannel = ch;
      amqpChannel.assertQueue("task").then(function (ok) {
        return amqpChannel.sendToQueue("task", Buffer.from("something to do"));
      });

      ch.assertQueue("task").then(function (ok) {
        return ch.consume("task", function (msg) {
          if (msg !== null) {
            ch.ack(msg);
          }
        });
      });
    });
  });
