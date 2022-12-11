import { Order } from '../../database/Order';

export interface IDeleteOrderProps {
  id: string;
}

export async function deleteOrderModel({ id }: IDeleteOrderProps) {
  const deletedOrder = await Order.findByIdAndDelete(id).sort({ createdAt: -1 }).populate('products.product');
  return deletedOrder;
}
