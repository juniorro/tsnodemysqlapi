import { Request, Response } from "express";

const getIndexRoutes = (req: Request, res: Response) => res.status(200).json({ message: 'Welcome to the Patients API' });

export default getIndexRoutes;