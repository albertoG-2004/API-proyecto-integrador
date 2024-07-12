import { Router } from "express";
import { registerMonitoring, findAllByDate } from "../controllers/monitoringController.js";

const routesMonitoring = Router();

routesMonitoring.post("/", registerMonitoring);
routesMonitoring.get("/:date", findAllByDate);

export default routesMonitoring;