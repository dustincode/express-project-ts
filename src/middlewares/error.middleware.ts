import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function catchErrors(fn: (req: Request, res: Response, next: NextFunction) => any) {
  return async (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
      return await fn(request, response, nextFunction);
    } catch (error) {
      nextFunction(error);
    }
  };
}
