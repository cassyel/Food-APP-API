import { Response, Request, NextFunction } from 'express';

export function serverError(_err: Error, _req: Request, res: Response, next: NextFunction) {
  res.status(500).json({ error: 'Server Error' });
  next();
}
