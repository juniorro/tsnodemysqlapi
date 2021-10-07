import { Router } from "express";
import { createPatient, getPatients } from "../controller/patient.controller";

const patientRoutes = Router();

patientRoutes.route('/')
  .get(getPatients)
  .post(createPatient);

export default patientRoutes;