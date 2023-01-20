import { createOrderModel, findOrderModel, ICreateOrderProps } from '../../models/orders/createOrder';
import { isValidObjectId } from 'mongoose';

export async function createOrderService({ table, products }: ICreateOrderProps) {
  if (!products.every((item) => isValidObjectId(item.product)))
    return { content: { error: 'Invalid productID' }, code: 400 };

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
      return { content: { error: 'Order already exists' }, code: 409 };
  }

  const newOrder = await createOrderModel({ table, products });

  return newOrder
    ? { content: newOrder, code: 201 }
    : { content: { error: 'Order not created' }, code: 400 };
}
