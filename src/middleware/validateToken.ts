import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function validateAccessToken (req: Request, res: Response, next: NextFunction) {
  try { 
    const accessToken: string = req.headers['authorization']!.split('Bearer ')[1];
    jwt.verify(accessToken, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Invalid Access Token" })
  }
}
