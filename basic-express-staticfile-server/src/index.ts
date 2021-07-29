import express from "express";
import { preRouteMiddleware, postRouteMiddleware } from "middleware";
import guitarRouter from "./guitars/guitar.routes.js";

const app = express();
const port = process.env.PORT || 3000;

preRouteMiddleware(app);

app.use(express.static("public"));
app.use(guitarRouter);

postRouteMiddleware(app);

export const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});