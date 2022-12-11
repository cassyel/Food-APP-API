import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { deleteOrderService } from '../../service/orders/deleteOrder';

export async function deleteOrderController(req: Request, res: Response) {
  const { orderId: id } = req.params;

  if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid orderId' });

  const { code, content } = await deleteOrderService({ id });

  return res.status(code).json(content);
}
