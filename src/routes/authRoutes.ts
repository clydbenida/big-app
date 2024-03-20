import express from "express";
import AuthController from "../features/auth/controller";

const authRoutes = express.Router();

authRoutes.use("/register", AuthController.registerUser);

export default authRoutes;
