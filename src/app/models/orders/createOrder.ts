import { Order } from '../../database/Order';
import { IProductProps } from '../products/createProduct';

export interface IOrderProps {
  table: string;
  products: IProductProps;
}

export async function createOrderModel({ table, products }: IOrderProps) {
  const newOrder = await Order.create({ table, products });
  return newOrder;
}
