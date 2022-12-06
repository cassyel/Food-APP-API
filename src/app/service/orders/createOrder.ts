import { createOrderModel, findOrderModel, IOrderProps } from '../../models/orders/createOrder';

export async function createOrderService({ table, products }: IOrderProps) {
  const registeredOrders = await findOrderModel({ table });

  const filteredOrders = registeredOrders.filter(
    (order) => order.products.length === products.length
  );

  if (filteredOrders.length > 0) {
    const existingOrders = filteredOrders.filter((order) =>
      order.products.every(
        (item, index) =>
          String(item.product) === products[index].product &&
          item.quantity === products[index].quantity
      )
    );

    if (existingOrders.length > 0)
      return { content: 'Order already registered', code: 400 };
  }

  const newOrder = await createOrderModel({ table, products });

  return newOrder
    ? { content: newOrder, code: 201 }
    : { content: { error: 'Order not created' }, code: 400 };
}
