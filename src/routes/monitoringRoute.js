import { Router } from "express";
import { registerMonitoring, findAllByDate } from "../controllers/monitoringController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const routesMonitoring = Router();

routesMonitoring.post("/", verifyJWT, registerMonitoring);
routesMonitoring.get("/:date", verifyJWT, findAllByDate);

export default routesMonitoring;