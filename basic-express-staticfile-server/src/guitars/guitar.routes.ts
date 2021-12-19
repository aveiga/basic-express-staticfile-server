import express from "express";
import { body } from "express-validator";
import { uaa, logging, validator, rateLimiting } from "middleware";
import { getAll, createOne } from "./guitar.service.js";

const router = express.Router();

router.get("/guitars", uaa.hasScope("email"), (req, res) => {
  res.send(getAll());
});

router.get("/unsecure-guitars", async (req, res) => {
  logging.logger.info("Fetching all guitars 🎸");
  res.send(await getAll());
});

router.post(
  "/unsecure-guitars",
  body("brand").not().isEmpty().trim().escape(),
  validator.validationErrorHandler,
  async (req, res) => {
    res.send(await createOne());
  }
);

router.post(
  "/rate-limited",
  rateLimiting.generateRateLimiter(1, 1),
  async (req, res) => {
    res.send(await createOne());
  }
);

export default router;
