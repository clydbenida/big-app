import express, { Request, Response } from "express";
import SellerController from "../features/sellers/controller";

const sellerRouter = express.Router();

sellerRouter.get('/', (req: Request, res: Response) => {
  res.send("Successfully connected seller route!")
})

sellerRouter.post('/create', SellerController.createSeller);

export default sellerRouter;
