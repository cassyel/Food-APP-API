import bcrypt from 'bcryptjs';
import { IUserProps, loginModel } from '../../models/users/login';
import jwt from 'jsonwebtoken';


export async function loginService({ name, email, password }: IUserProps) {
  const user = await loginModel({ name, email });

  return user && bcrypt.compareSync(password,  user.password)
    ? { content: { token: jwt.sign({ name, email, password }, String(process.env.SECRET)) }, code: 200 }
    : { content: { error: 'Login Error' }, code: 400 };
}
