import express from "express";
import authRoutes from "./authRoutes";
import sellerRouter from "./sellerRoutes";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/seller", sellerRouter)

export default rootRouter;
