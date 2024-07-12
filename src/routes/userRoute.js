import { Router } from "express";
import { registerUser, findUser } from "../controllers/usersController.js";

const routesUser = Router();

routesUser.post("/", registerUser);
routesUser.get("/:phone_number/:password", findUser);

export default routesUser;