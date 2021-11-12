import express, { Application } from "express";
import cors from 'cors';
import indexRoutes from "./routes/index.routes";
import patientRoutes from "./routes/patient.routes";

export class App {
  private app: Application;
  private readonly APPLICATION_RUNNING = 'application is running on port:';

  constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
    this.app = express();
    this.middleWare();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${this.port}`);
  }

  private middleWare(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/', indexRoutes);
    this.app.use('/patients', patientRoutes);
  }
}
