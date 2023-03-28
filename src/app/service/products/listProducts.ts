import { listProductsModel } from '../../models/products/listProducts';

export async function listProductsService() {
  const allProducts = await listProductsModel();

  return { content: allProducts, code: 200 };
}
