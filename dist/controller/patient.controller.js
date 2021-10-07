"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatient = exports.getPatients = void 0;
const mysql_config_1 = require("../config/mysql.config");
const patient_query_1 = __importDefault(require("../query/patient.query"));
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.SELECT_PATIENTS);
    console.info(result);
    return res.status(200).json(result[0]);
});
exports.getPatients = getPatients;
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = Object.assign({ id: null, created_at: new Date() }, req.body);
    console.info(patient);
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.CREATE_PATIENT, [patient]);
    console.info(result);
    patient = Object.assign({ id: result[0].insertId }, req.body);
    return res.status(200).json(patient);
});
exports.createPatient = createPatient;
