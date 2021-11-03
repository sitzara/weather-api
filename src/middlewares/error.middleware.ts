import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status);

    if (error instanceof HttpException) {
      res.json({ message });
    } else {
      res.json({ message: 'Internal server error' });
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
