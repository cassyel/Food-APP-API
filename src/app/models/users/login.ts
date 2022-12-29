import { User } from '../../database/User';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
}

export async function loginModel({ name, email }: Partial<IUserProps>) {
  const user = await User.findOne({ name, email });
  return user;
}
