import { Response, Request, NextFunction } from "express";

export const ErrorLog = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  next(err);
};

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500);
  res.send({ error: err });
};
