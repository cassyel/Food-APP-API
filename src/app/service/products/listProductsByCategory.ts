import { listProductsByCategoryModel } from '../../models/products/listProductsByCategory';

export async function listProductsByCategoryService(categoryId: string) {
  const allProductsByCategory = await listProductsByCategoryModel(categoryId);

  return allProductsByCategory.length !== 0
    ? { content: allProductsByCategory, code: 200 }
    : { content: { error: 'No products registered' }, code: 400 };
}
