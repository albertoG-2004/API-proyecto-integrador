import { Router } from "express";
import { registerBanana, findAllClassification } from "../controllers/bananaController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const routesBanana = Router();

routesBanana.post("/", verifyJWT, registerBanana);
routesBanana.get("/", verifyJWT, findAllClassification);

export default routesBanana;