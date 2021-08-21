import express from "express";
import { uaa, logging } from "middleware";
import { getAll, createOne } from "./guitar.service.js";

const router = express.Router();

router.get("/guitars", uaa.hasScope("email"), (req, res) => {
  res.send(getAll());
}); 

router.get("/unsecure-guitars", async (req, res) => {
  logging.logger.info("Fetching all guitars 🎸");
  res.send(await getAll());
});

router.post("/unsecure-guitars", async (req, res) => {
  res.send(await createOne());
});

export default router;
