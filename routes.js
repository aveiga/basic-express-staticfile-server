import express from "express";
import hasScope from "./hasScope.js";

const router = express.Router();

router.get("/guitars", hasScope("email"), (req, res) => {
  res.send({ model: "Strat", brand: "Fender" });
});

export default router;
