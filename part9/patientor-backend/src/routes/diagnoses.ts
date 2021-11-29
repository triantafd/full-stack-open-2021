import express from "express";

import diagnosesService from "../services/diagnoses";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: Array<Diagnosis> = diagnosesService.getDiagData();
  res.json(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
