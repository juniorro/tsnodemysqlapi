import express, { Application } from "express";
import indexRoutes from "./routes/index.routes";
import patientRoutes from "./routes/patient.routes";

export class App {
  private app: Application;

  constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
    this.app = express();
    this.middleWare();
    this.routes();
  }

  async listen(): Promise<void> {
    this.app.listen(this.port);
    console.info(`Application is running on port ${this.port}`);
  }

  private middleWare(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/', indexRoutes);
    this.app.use('/patients', patientRoutes);
  }
}
