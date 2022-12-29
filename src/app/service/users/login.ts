import bcrypt from 'bcryptjs';
import { IUserProps, loginModel } from '../../models/users/login';
import jwt from 'jsonwebtoken';


export async function loginService({ name, email, password }: IUserProps) {
  const user = await loginModel({ name, email });

  if(!user) return  { content: { error: 'Not foud user' }, code: 400 };

  return user && bcrypt.compareSync(password,  user.password)
    ? { content: { token: jwt.sign({ name, email, password }, String(process.env.SECRET)) }, code: 200 }
    : { content: { error: 'Invalid Password' }, code: 400 };
}
