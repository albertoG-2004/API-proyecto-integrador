import { Router } from "express";
import { registerBanana, findAllByDate } from "../controllers/bananaController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const routesBanana = Router();

routesBanana.post("/", verifyJWT, registerBanana);
routesBanana.get("/:date", verifyJWT, findAllByDate);

export default routesBanana;