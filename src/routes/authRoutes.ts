import express from "express";
import AuthController from "../features/auth/controller";

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.registerUser);
authRoutes.post("/login", AuthController.loginUser);

export default authRoutes;
