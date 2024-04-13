import { Request, Response } from "express";

type sendTemplateParams<T> = {
  message: string;
  data?: T;
  code: 200 | 400 | 500;
};

export function sendTemplate<T>(res: Response, body: sendTemplateParams<T>) {
  res.status(body.code).json({
    message: body.message,
    data: body.data,
  });
}

export function extractAccessToken(req: Request): string {
  try {
  const accessToken: string = req.headers['authorization']!.split('Bearer ')[1];
  return accessToken;
  } catch (err) {
    console.log(err)
    throw new Error('Missing or invalid access token');
  }
}
