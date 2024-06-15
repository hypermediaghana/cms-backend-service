import Router from "express";
import * as dotenv from "dotenv";
import { userController } from "../controllers/usersController";
import { Permissions } from "../middlewares/authorization";

const usersController = new userController();
const permissions = new Permissions();
const protect = permissions.protect;
dotenv.config();

export const userRoutes = Router();

userRoutes.get("/list-users", [protect], usersController.ListUsers);
userRoutes.post("/login", usersController.login);
userRoutes.post("/register", usersController.createUser);
userRoutes.patch("/update-user", [protect], usersController.updateUser);
userRoutes.delete("/delete-user", [protect], usersController.deleteUser);
