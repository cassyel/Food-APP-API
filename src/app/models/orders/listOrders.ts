import { Order } from '../../database/Order';

export async function listOrdersModel() {
  const allOrders = await Order.find();
  return allOrders;
}
