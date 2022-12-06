import { Order } from '../../database/Order';

export async function listOrdersModel() {
  const allOrders = await Order.find().populate('products.product');
  return allOrders;
}
