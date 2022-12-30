import { User } from '../../database/User';
import bcrypt from 'bcryptjs';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
}

export async function loginModel({ name, email, password }: Partial<IUserProps>) {
  const user = await User.findOne({ name, email });
  return bcrypt.compareSync(String(password), String(user?.password)) ? user : null;
}
