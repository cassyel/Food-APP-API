import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { deleteProductService } from '../../service/products/deleteProduct';

export async function deleteProductController(req: Request, res: Response) {
  const { productId: id } = req.params;

  if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid orderId' });

  const { code, content } = await deleteProductService({ id });

  return res.status(code).json(content);
}
