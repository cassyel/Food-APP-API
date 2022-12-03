import { Request, Response } from 'express';
import { listOrdersService } from '../../service/orders/listOrders';

export async function listOrdersController(req: Request, res: Response) {
  const { code, content } = await listOrdersService();

  res.status(code).json(content);
}
