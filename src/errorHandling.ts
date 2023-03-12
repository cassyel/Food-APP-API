import { Response, Request, NextFunction } from 'express';

export function serverError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  res.status(500).json({ error: err.message });
}
