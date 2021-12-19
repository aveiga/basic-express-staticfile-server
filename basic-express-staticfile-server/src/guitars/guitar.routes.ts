import express from "express";
import { body, check } from "express-validator";
import { uaa, logging, validator, rateLimiting } from "middleware";
import { getAll, createOne, createGuitar } from "./guitar.service.js";

const router = express.Router();

router.get("/guitars", uaa.hasScope("email"), async (req, res) => {
  res.send(await getAll());
});

router.get("/unsecure-guitars", async (req, res) => {
  logging.logger.info("Fetching all guitars 🎸");
  res.send(await getAll());
});

router.post(
  "/guitars",
  uaa.hasScope("email"),
  check("brand").not().isEmpty().trim().escape(),
  check("model").not().isEmpty().trim().escape(),
  validator.validationErrorHandler,
  async (req, res) => {
    res.send(await createGuitar(req.body.brand, req.body.model));
  }
);

router.post(
  "/unsecure-guitars",
  check("brand").not().isEmpty().trim().escape(),
  validator.validationErrorHandler,
  async (req, res) => {
    res.send(await createOne());
  }
);

router.post(
  "/rate-limited",
  // rateLimiting.generateRateLimiter(1, 1),
  async (req, res) => {
    res.send(await createOne());
  }
);

export default router;
