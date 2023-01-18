import { listProductsByCategoryModel } from '../../models/products/listProductsByCategory';

export async function listProductsByCategoryService(categoryId: string) {
  const allProductsByCategory = await listProductsByCategoryModel(categoryId);

  return allProductsByCategory.length !== 0
    ? { content: allProductsByCategory, code: 200 }
    : { content: { error: `Not find products with categoryId: ${categoryId}` }, code: 404 };
}
