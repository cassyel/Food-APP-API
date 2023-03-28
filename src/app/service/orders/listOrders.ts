import { listOrdersModel } from '../../models/orders/listOrders';

export async function listOrdersService() {
  const allOrders = await listOrdersModel();

  return { content: allOrders, code: 200 };
}
