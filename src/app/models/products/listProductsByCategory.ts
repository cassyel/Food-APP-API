import { Product } from '../../database/Product';

export async function listProductsByCategoryModel(categoryId: string) {
  const allProducts = await Product.find().where('category').equals(categoryId);
  return allProducts;
}
