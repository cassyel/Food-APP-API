import { Request, Response } from 'express';
import { listProductsByCategoryService } from '../../service/products/listProductsByCategory';

export async function listProductsByCategoryController(req: Request, res: Response) {
  const { categoryId } = req.params;
  const { code, content } = await listProductsByCategoryService(categoryId);

  res.status(code).json(content);
}
