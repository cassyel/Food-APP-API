import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authentication } = req.headers;

  try {
    jwt.verify(String(authentication),String(process.env.SECRET));
  } catch {
    return res.status(403).json({ error: 'JWT Required' });
  }
  return next();
}
