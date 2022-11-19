import { listProductsModel } from '../../models/products/listProducts';

export async function listProductsService() {
  const allProducts = await listProductsModel();

  return allProducts.length !== 0
    ? { content: allProducts, code: 200 }
    : { content: { error: 'No products registered' }, code: 400 };
}
