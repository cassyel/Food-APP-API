import { changeOrderStatusModel, IPropsChangeStatus } from '../../models/orders/changeOrderStatus';

export async function changeOrderStatusService({ id, status }: IPropsChangeStatus) {
  const changedOrder = await changeOrderStatusModel({ id, status });

  return changedOrder
    ? { content: changedOrder, code: 200 }
    : { content: { error: 'No orders changed' }, code: 400 };
}
