import express from "express";
import { uaa } from "middleware";
import { getAll } from "./guitar.service.js";

const router = express.Router();

router.get("/guitars", uaa.hasScope("email"), (req, res) => {
  res.send(getAll());
});

export default router;
