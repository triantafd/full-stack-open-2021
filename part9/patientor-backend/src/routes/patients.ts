import express from "express";

import patientService from "../services/patient";
import { Patient } from "../types";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: Array<Patient> = patientService.getPatientsData();
  res.json(data);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.send(addedPatient);
  /* try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  } */
});

router.post("/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  const newEntry = toNewEntry(req.body);

  const updatedPatient = patientService.addEntry(req.params.id, newEntry);

  res.json(updatedPatient);
});

export default router;
