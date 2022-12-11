import { deleteOrderModel, IDeleteOrderProps } from '../../models/orders/deleteOrder';

export async function deleteOrderService({ id }: IDeleteOrderProps) {
  const deletedOrder = await deleteOrderModel({ id });

  return deletedOrder
    ? { content: deletedOrder, code: 200 }
    : { content: { error: `Not find order with this id: ${id}` }, code: 400 };
}
