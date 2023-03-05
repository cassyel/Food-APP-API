import { Request, Response } from 'express';
import { listCategoriesService } from '../../service/categories/listCategories';

export async function listCategoriesController(req: Request, res: Response) {
  const { code, content } = await listCategoriesService();

  return res.status(code).json(content);
}
