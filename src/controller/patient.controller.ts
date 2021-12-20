import { Request, Response } from 'express';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql';
import { connection } from '../config/mysql.config';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { Patient } from '../interface/patient';
import { QUERY } from '../query/patient.query';

type RestultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.SELECT_PATIENTS);
  return res.status(Code.OK)
    .send(new HttpResponse(Code.OK, Status.OK, 'Patients retrieved', result[0]));
};

export const getPatient = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
  if (((result[0]) as Array<any>).length > 0) {
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Patient retrieved', result[0]));
  }
  return res.status(Code.NOT_FOUND)
    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Patient not found'));
};

export const createPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  let patient: Patient = { id: null, created_at: new Date(), ...req.body };
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.CREATE_PATIENT, [patient]);
  patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
  return res.status(Code.CREATED)
    .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Patient created', patient));
};

export const updatePatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  let patient: Patient = req.body;
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
  if (((result[0]) as Array<any>).length > 0) {
    const result: RestultSet = await pool.query(QUERY.UPDATE_PATIENT, [...Object.values(patient), req.params.patientId]);
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Patient updated', { ...patient, id: req.params.patientId }));
  }
  return res.status(Code.NOT_FOUND)
    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Patient not found'));
};

export const deletePatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
  if (((result[0]) as Array<any>).length > 0) {
    const result: RestultSet = await pool.query(QUERY.DELETE_PATIENT, [req.params.patientId]);
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Patient deleted'));
  }
  return res.status(Code.NOT_FOUND)
    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Patient not found'));
};
