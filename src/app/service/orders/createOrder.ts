import { createOrderModel, findOrderModel, IOrderProps } from '../../models/orders/createOrder';

export async function createOrderService({ table, products }: IOrderProps) {
  const order = await findOrderModel({ table });
  const existsOrder = order.filter(item => item.products.every((item, index) => String(item.product) === products[index].product && item.quantity === products[index].quantity));


  if (existsOrder.length > 0) return { content: { error: 'Order already exists' }, code: 400 };

  const newOrder = await createOrderModel({ table, products });

  return newOrder
    ? { content: newOrder, code: 201 }
    : { content: { error: 'Order not created' }, code: 400 };
}
