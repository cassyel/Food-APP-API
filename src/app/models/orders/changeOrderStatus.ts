import { Order } from '../../database/Order';

export interface IPropsChangeStatus {
  id: string;
  status: string
}

export async function changeOrderStatusModel({ id, status }: IPropsChangeStatus) {
  const changedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('products.product');
  return changedOrder;
}
