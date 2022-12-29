import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authentication } = req.headers;

  jwt.verify(
    String(authentication),
    String(process.env.SECRET),
    (error, result) => error ? res.status(400).json({ error }) : res.locals.authentication = result);

  next();
}
