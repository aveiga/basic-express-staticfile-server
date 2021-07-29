import express from "express";
import { uaa, logging } from "middleware";
import { getAll } from "./guitar.service.js";

const router = express.Router();

// router.get("/guitars", uaa.hasScope("email"), (req, res) => {
//   res.send(getAll());
// }); 

router.get("/guitars", (req, res) => {
  logging.logger.info("Fetching all guitars");
  res.send(getAll());
});

export default router;
