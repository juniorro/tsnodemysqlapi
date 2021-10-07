"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("../controller/patient.controller");
const patientRoutes = (0, express_1.Router)();
patientRoutes.route('/')
    .get(patient_controller_1.getPatients)
    .post(patient_controller_1.createPatient);
exports.default = patientRoutes;
