import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  try {
    if (!authorization?.startsWith('Bearer ')) throw new Error();

    jwt.verify(
      String(authorization?.substring(7, authorization.length)),
      String(process.env.SECRET)
    );
  } catch (err) {
    return res.status(403).json({ error: 'JWT Required' });
  }
  return next();
}
