import { createOrderModel, findOrderModel, ICreateOrderProps } from '../../models/orders/createOrder';
import { listProductById } from '../../models/products/listProductById';
import { isValidObjectId } from 'mongoose';

export async function createOrderService({ table, products }: ICreateOrderProps) {
  if (!products.every((item) => isValidObjectId(item.product)))
    return { content: { error: 'Invalid productID' }, code: 400 };

  const findProductsByID = await listProductById({ productsIds: products.map(item => item.product) });

  if(findProductsByID.length === 0 || findProductsByID.length !== products.length)
    return { content: { error: 'Some product informed not exists or is duplicatted' }, code: 400 };

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
