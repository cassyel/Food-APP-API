import { Order } from '../../database/Order';

export async function listOrdersModel() {
  const allOrders = await Order.find().sort({ createdAt: -1 }).populate('products.product');
  return allOrders;
}
