import { listProductsByCategoryModel } from '../../models/products/listProductsByCategory';

export async function listProductsByCategoryService(categoryId: string) {
  const allProductsByCategory = await listProductsByCategoryModel(categoryId);
  return { content: allProductsByCategory, code: 200 };
}
