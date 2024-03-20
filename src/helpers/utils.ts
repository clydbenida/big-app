import { Response } from "express";

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
