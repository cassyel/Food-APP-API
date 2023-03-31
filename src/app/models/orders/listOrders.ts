import { Order } from '../../database/Order';

export async function listOrdersModel() {
  const allOrders = await Order
    .find()
    .sort({ createdAt: 'asc' })
    .populate('products.product');
  return allOrders;
}
