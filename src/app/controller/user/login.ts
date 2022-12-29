import { Request, Response } from 'express';
import { loginService } from '../../service/users/login';

export async function loginController(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const { code, content } = await loginService({ email, name, password });

  return res.status(code).json(content);
}
