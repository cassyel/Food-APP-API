import { Request, Response } from 'express';
import { listProductsService } from '../../service/products/listProducts';

export async function listProductsController(req: Request, res: Response) {
  const { code, content } = await listProductsService();

  return res.status(code).json(content);
}
