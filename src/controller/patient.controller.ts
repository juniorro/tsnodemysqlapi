import { Request, Response } from 'express';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql';
import { connection } from '../config/mysql.config';
import { Patient } from '../interface/patient';
import QUERY from '../query/patient.query';

type RestultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.SELECT_PATIENTS);
  return res.status(200).json(result[0]);
};

export const createPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
  let patient: Patient = { id: null, created_at: new Date(), ...req.body };
  console.info(patient);
  const pool = await connection();
  const result: RestultSet = await pool.query(QUERY.CREATE_PATIENT, [patient]);
  console.info(result);
  patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
  return res.status(200).json(patient);
};
