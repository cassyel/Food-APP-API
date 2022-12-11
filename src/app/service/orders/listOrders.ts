import { listOrdersModel } from '../../models/orders/listOrders';

export async function listOrdersService() {
  const allOrders = await listOrdersModel();

  return allOrders.length !== 0
    ? { content: allOrders, code: 200 }
    : { content: { error: 'No orders registered' }, code: 400 };
}
