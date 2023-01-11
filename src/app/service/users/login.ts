import { IUserProps, loginModel } from '../../models/users/login';
import jwt from 'jsonwebtoken';

export async function loginService({ name, email, password }: IUserProps) {
  const user = await loginModel({ name, email, password });

  return user
    ? {
      content: {
        token: jwt.sign(
          { name, email, password },
          String(process.env.SECRET),
          { expiresIn: '30d' }
        ),
      },
      code: 200,
    }
    : { content: { error: 'Login Error' }, code: 400 };
}
