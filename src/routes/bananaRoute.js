import { Router } from "express";
import { registerBanana, findAllByDate } from "../controllers/bananaController.js";

const routesBanana = Router();

routesBanana.post("/", registerBanana);
routesBanana.get("/:date", findAllByDate);

export default routesBanana;