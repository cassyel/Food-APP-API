import { Product } from '../../database/Product';

export async function listProductsModel() {
  const allProducts = await Product.find();
  return allProducts;
}
