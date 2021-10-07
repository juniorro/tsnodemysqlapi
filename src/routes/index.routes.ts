import { Router } from "express";
import getIndexRoutes from "../controller/index.controller";

const indexRoutes = Router();

indexRoutes.route('/')
  .get(getIndexRoutes);

export default indexRoutes;