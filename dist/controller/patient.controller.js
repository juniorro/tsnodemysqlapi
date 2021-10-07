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
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getPatient = exports.getPatients = void 0;
const mysql_config_1 = require("../config/mysql.config");
const response_1 = require("../domain/response");
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const patient_query_1 = __importDefault(require("../query/patient.query"));
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.SELECT_PATIENTS);
    return res.status(code_enum_1.Code.OK)
        .json(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.SUCCESS, 'Patients retrieved', result[0]));
});
exports.getPatients = getPatients;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.SELECT_PATIENT, [req.params.patientId]);
    if ((result[0]).length > 0) {
        return res.status(code_enum_1.Code.OK)
            .json(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.SUCCESS, 'Patient retrieved', result[0]));
    }
    return res.status(code_enum_1.Code.NOT_FOUND)
        .json(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Patient not found'));
});
exports.getPatient = getPatient;
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = Object.assign({ id: null, created_at: new Date() }, req.body);
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.CREATE_PATIENT, [patient]);
    patient = Object.assign({ id: result[0].insertId }, req.body);
    return res.status(code_enum_1.Code.CREATED)
        .json(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Patients retrieved', patient));
});
exports.createPatient = createPatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = req.body;
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.SELECT_PATIENT, [req.params.patientId]);
    if ((result[0]).length > 0) {
        const result = yield pool.query(patient_query_1.default.UPDATE_PATIENT, [...Object.values(patient), req.params.patientId]);
        return res.status(code_enum_1.Code.OK)
            .json(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patient updated', Object.assign(Object.assign({}, patient), { id: req.params.patientId })));
    }
    return res.status(code_enum_1.Code.NOT_FOUND)
        .json(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Patient not found'));
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, mysql_config_1.connection)();
    const result = yield pool.query(patient_query_1.default.SELECT_PATIENT, [req.params.patientId]);
    if ((result[0]).length > 0) {
        const result = yield pool.query(patient_query_1.default.DELETE_PATIENT, [req.params.patientId]);
        return res.status(code_enum_1.Code.OK)
            .json(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Patient deleted'));
    }
    return res.status(code_enum_1.Code.NOT_FOUND)
        .json(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Patient not found'));
});
exports.deletePatient = deletePatient;
