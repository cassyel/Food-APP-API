import { Order } from '../../database/Order';

type orderProduct = {
  product: string;
  quantity: number;
}

export interface ICreateOrderProps {
  table: string;
  products: orderProduct[];
}

export async function createOrderModel({ table, products }: ICreateOrderProps) {
  const newOrder = await Order.create({ table, products });
  return newOrder;
}

export async function findOrderModel({ table }: Partial<ICreateOrderProps>) {
  const status = Order.schema.paths.status.options.default;

  const order = await Order.find({ table, status });
  return order;
}

