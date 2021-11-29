import patientData from "../../data/patients";
import {
  Patient,
  NewPatient /* NonSensitivePatient, NewPatient, NewEntry */,
  NewEntry,
} from "../types";

import { v1 as uuid } from "uuid";

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

const getPatientsData = (): Patient[] => {
  return patientData;
};

const addEntry = (id: string, entry: NewEntry): Patient => {
  const targetIndex = patientData.findIndex((patient) => patient.id === id);
  const entryWithId = { id: uuid(), ...entry };
  const target = patientData[targetIndex];

  target.entries.push(entryWithId);
  console.log(target);

  return target;
};
export default { getPatientsData, addPatient, addEntry };
