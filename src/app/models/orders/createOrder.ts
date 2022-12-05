import { Order } from '../../database/Order';

type orderProduct = {
  product: string;
  quantity: number;
}

export interface IOrderProps {
  table: string;
  products: orderProduct[];
}

export async function createOrderModel({ table, products }: IOrderProps) {
  const newOrder = await Order.create({ table, products });
  return newOrder;
}

export async function findOrderModel({ table }: Partial<IOrderProps>) {
  const status = Order.schema.paths.status.options.default;

  const order = await Order.find({ table, status });
  return order;
}

